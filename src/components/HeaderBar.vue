<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const status = computed(() => store.getters["race/status"]);

const isRaceStarted = computed(() => {
    return status.value === 'running';
});

const isShowStartButton = computed(() => {
    return status.value !== 'idle';
});

const onGenerate = () => {
    store.dispatch('horses/generateHorses');
    store.dispatch('race/generateRaceSchedule');
}

const onStart = () => {
    if (status.value === 'generated' || status.value === 'finished') {
        store.dispatch('race/startRace');
    }
}
</script>

<template>
    <header class="flex justify-between items-center p-5 border-b border-gray-300 bg-[#f7adad]">
        <h1 class="title">Horse Racing</h1>
        <div class="flex gap-3">
            <button class="button" :disabled="isRaceStarted" @click="onGenerate">GENERATE
                PROGRAM</button>
            <button v-if="isShowStartButton" class="button" :disabled="isRaceStarted" @click="onStart">
                START
            </button>
        </div>
    </header>
</template>