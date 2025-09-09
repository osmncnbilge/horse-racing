import type { Module, ActionContext } from "vuex";
import type {
  RaceState,
  Round,
  RaceResult,
  RaceResultItem,
} from "../../types/models";
import { ROUND_DISTANCES } from "../../utils/round-distance";

const pickRandomHorses = (horses: any[]): any[] => {
  const shuffled = [...horses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

const BASE_SEC_PER_METER = 0.005;
function calculateFinishTime(distance: number, condition: number): number {
  const condFactor = 1 - 0.25 * (condition / 100);
  const randomFactor = 1 + (Math.random() * 0.1 - 0.05);
  const seconds = distance * BASE_SEC_PER_METER * condFactor * randomFactor;
  return Math.max(1000, Math.round(seconds * 1000));
}

const state: RaceState = {
  status: "idle",
  schedule: [],
  results: [],
  currentRoundIndex: 0,
};

const mutations = {
  setStatus(state: RaceState, status: RaceState["status"]) {
    state.status = status;
  },
  setSchedule(state: RaceState, schedule: Round[]) {
    state.schedule = schedule;
  },
  resetSchedule(state: RaceState) {
    state.schedule = [];
    state.currentRoundIndex = 0;
    state.results = [];
  },
  setCurrentRoundIndex(state: RaceState, index: number) {
    state.currentRoundIndex = index;
  },
  setRoundStatus(
    state: RaceState,
    payload: { roundId: number; status: Round["status"] }
  ) {
    const round = state.schedule.find((r) => r.id === payload.roundId);
    if (round) {
      round.status = payload.status;
    }
  },
  setPredictedTimes(
    state: RaceState,
    payload: { roundId: number; times: Record<string, number> }
  ) {
    const round = state.schedule.find((r) => r.id === payload.roundId);
    if (round) {
      round.predictedTimesMs = payload.times;
    }
  },
  resetResults(state: RaceState) {
    state.results = [];
    state.schedule.forEach((r) => {
      delete r.result;
    });
  },
  pushResult(state: RaceState, result: RaceResult) {
    state.results.push(result);
    const round = state.schedule.find((r) => r.id === result.roundId);
    if (round) {
      round.result = result;
    }
  },
};

const actions = {
  generateRaceSchedule({ commit, rootGetters }: ActionContext<RaceState, any>) {
    const allHorses = rootGetters["horses/allHorses"];
    if (allHorses.length < 10) {
      throw new Error("At least 10 horses are required to generate");
    }

    const rounds: Round[] = ROUND_DISTANCES.map((distance, index) => ({
      id: index + 1,
      distance,
      participants: pickRandomHorses(allHorses).map((h: any) => h.id),
      status: "pending",
    }));

    commit("setSchedule", rounds);
    commit("setCurrentRoundIndex", 0);
    commit("setStatus", "generated");
  },
  async startRace({ state, commit, dispatch }: ActionContext<RaceState, any>) {
    if (!state.schedule.length) return;

    commit("resetResults");
    commit("setStatus", "running");
    commit("setCurrentRoundIndex", 0);

    for (let i = 0; i < state.schedule.length; i++) {
      commit("setCurrentRoundIndex", i);
      await dispatch("runRound", i);
    }

    commit("setStatus", "finished");
  },
  async runRound(
    { state, commit, rootGetters }: ActionContext<RaceState, any>,
    roundIndex: number
  ) {
    const activeRound = state.schedule[roundIndex];
    if (!activeRound) return;

    commit("setRoundStatus", { roundId: activeRound.id, status: "running" });

    const horseMap = rootGetters["horses/horseMap"];
    const times: Record<string, number> = {};

    activeRound.participants.forEach((horseId) => {
      const horse = horseMap[horseId];
      const condition = horse ? horse.condition : 50;
      const finishTime = calculateFinishTime(activeRound.distance, condition);
      times[horseId] = finishTime;
    });

    commit("setPredictedTimes", { roundId: activeRound.id, times });

    const maxMs = Math.max(...Object.values(times));
    await new Promise((res) => setTimeout(res, maxMs + 300));

    const resultItems: RaceResultItem[] = Object.entries(times)
      .map(([horseId, timeMs]) => ({ horseId, timeMs, rank: 0 }))
      .sort((a, b) => a.timeMs - b.timeMs)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    const raceResult: RaceResult = {
      roundId: activeRound.id,
      roundDistance: activeRound.distance,
      items: resultItems,
    };

    commit("pushResult", raceResult);
    commit("setRoundStatus", { roundId: activeRound.id, status: "finished" });
  },
};

const getters = {
  status(state: RaceState) {
    return state.status;
  },
  schedule(state: RaceState) {
    return state.schedule;
  },
  results(state: RaceState) {
    return state.results;
  },
  currentRound(state: RaceState) {
    return state.schedule[state.currentRoundIndex];
  },
};

const module: Module<RaceState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default module;
