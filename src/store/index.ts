import { createStore } from "vuex";
import horses from "./modules/horses";
import race from "./modules/race";

export const store = createStore({
  modules: {
    horses,
    race,
  },
});
