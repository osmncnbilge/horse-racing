<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const currentRound = computed(() => store.getters["race/currentRound"]);

const predictedTimes = computed<Record<string, number> | undefined>(
    () => currentRound.value?.predictedTimesMs
);
const horseMap = computed(() => store.getters["horses/horseMap"]);
const runKey = ref(0);

const runnerEls = ref<HTMLElement[]>([]);

onMounted(() => {
    console.log('Mounted Track.vue', runnerEls.value);
});

const resetRunners = () => {
    runnerEls.value.forEach(el => {
        el.style.transition = 'none'
        el.style.transform = 'translateX(0px)'
        void el.offsetWidth
    })
}

watch(() => currentRound.value, async () => {
    if (currentRound.value.id === 1) {
        resetRunners();
        await nextTick();
    }
}
);

watch(
    () => currentRound.value?.predictedTimesMs,
    async (times) => {
        if (!times || currentRound.value?.status !== "running") return;
        resetRunners();
        runKey.value++;
        await nextTick();
        requestAnimationFrame(() => startAnimation());
    }
);


const startAnimation = () => {
    runnerEls.value.forEach(el => {
        const ms = Number(el.dataset.time || '0')
        const lane = el.parentElement
        const laneWidth = lane?.clientWidth ?? 0
        const target = Math.max(0, laneWidth - el.offsetWidth - 32)
        el.style.transition = `transform ${ms}ms linear`
        el.style.transform = `translateX(${target}px)`
    })
}
</script>

<template>
    <div v-if="currentRound" class="trackContainer">
        <h2 class="trackHeader">
            <span>Round {{ currentRound.id }} - {{ currentRound.distance }}m</span>
            <span :class="{
                'text-blue-500': currentRound.status === 'generated',
                'text-green-500': currentRound.status === 'running',
                'text-red-500': currentRound.status === 'finished',
            }" class="font-bold">
                {{ currentRound.status.toUpperCase() }}
            </span>
        </h2>
        <div class="trackField">
            <div v-for="(horseId, idx) in currentRound.participants" :key="horseId" class="trackFieldContainer">
                <div class="trackFieldLineNumber">
                    {{ idx + 1 }}
                </div>
                <div ref="runnerEls" class="absolute left-8" :data-time="predictedTimes?.[horseId]"
                    :key="runKey + horseId">
                    <div class="h-14 w-14 rounded-full flex flex-col justify-center items-center"
                        :style="{ background: horseMap[horseId]?.color || '#888' }">
                        <span class="text-[10px] text-white font-bold">{{ horseMap[horseId].name }}</span>
                        <span>🐎</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>