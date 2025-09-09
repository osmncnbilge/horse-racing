<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue';
import HorseTable from './components/HorseTable.vue';
import Track from './components/Track.vue';
import ProgramTable from './components/ProgramTable.vue';
import ResultsTable from './components/ResultsTable.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const status = computed(() => store.getters["race/status"]);
const results = computed(() => store.getters["race/results"]);

const isSchedulePrepared = computed(() => {
  return status.value !== 'idle';
});

const hasResults = computed(() => {
  return results.value && results.value.length > 0;
});

</script>

<template>
  <HeaderBar />
  <div v-if="isSchedulePrepared" class="appContainer">
    <HorseTable />
    <Track />
    <div class="flex gap-1">
      <ProgramTable />
      <ResultsTable v-if="hasResults" />
    </div>
  </div>
  <div v-else class="h-[calc(100vh-112px)] w-full flex justify-center items-center">
    <p class="bg-blue-50 text-blue-700  rounded-lg px-6 py-3 text-center shadow-sm">
      Press the <span class="font-bold">Generate Program</span> button to prepare the race program.
    </p>
  </div>

</template>
