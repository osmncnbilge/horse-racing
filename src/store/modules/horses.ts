import type { Module } from "vuex";
import type { Horse } from "../../types/models";
import { HORSE_COLORS } from "../../utils/color";

interface HorsesState {
  horses: Horse[];
}

const state: HorsesState = {
  horses: [],
};

const mutations = {
  setHorses(state: HorsesState, horses: Horse[]) {
    state.horses = horses;
  },
};

const actions = {
  generateHorses({ commit }: any) {
    const horses: Horse[] = Array.from({ length: 20 }, (_, i) => ({
      id: `horse-${i + 1}`,
      name: `Horse #${String(i + 1).padStart(2, "0")}`,
      color: HORSE_COLORS[i % HORSE_COLORS.length],
      condition: Math.floor(Math.random() * 100) + 1,
    }));

    commit("setHorses", horses);
  },
};

const getters = {
  allHorses(state: HorsesState): Horse[] {
    return state.horses;
  },
  horseById: (state: HorsesState) => (id: string) =>
    state.horses.find((h) => h.id === id),
  horseMap(state: HorsesState) {
    return Object.fromEntries(state.horses.map((h) => [h.id, h]));
  },
};

const module: Module<HorsesState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default module;
