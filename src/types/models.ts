// src/types/models.ts
export interface Horse {
  id: string;
  name: string;
  color: string;
  condition: number; // 1..100
}

export interface Round {
  id: number;
  distance: number;
  participants: string[];
  status: "pending" | "running" | "finished";
  // UI'nin canlı animasyon başlatabilmesi için tur başında tahmini süreleri yayınlıyoruz:
  predictedTimesMs?: Record<string, number>; // horseId -> target finish ms
  result?: RaceResult;
}

export interface RaceResultItem {
  horseId: string;
  timeMs: number;
  rank: number;
}

export interface RaceResult {
  roundId: number;
  roundDistance: number;
  items: RaceResultItem[]; // rank'e göre sıralı
}

export interface RaceState {
  status: "idle" | "generated" | "running" | "finished";
  schedule: Round[];
  results: RaceResult[];
  currentRoundIndex: number; // 0..5
}
