<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const results = computed(() => store.getters["race/results"]);
const horseMap = computed(() => store.getters["horses/horseMap"]);

</script>

<template>
    <div class="max-h-[85vh] overflow-auto">
        <h1 class="resultsTitle">Results</h1>
        <div>
            <div v-for="result in results" :key="result.roundId">
                <h2 class="roundTitle">{{ result.roundId }}ST Lap - {{ result.roundDistance }}</h2>
                <div class="border border-gray-300 p-4 bg-white">
                    <table class="tableContainer">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="thColumn">Rank</th>
                                <th class="thColumn">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="horse in result.items" :key="horse.id" class="border-t">
                                <td class="tdColumn">{{ horse.rank }}</td>
                                <td class="tdColumn">
                                    <span class="font-extrabold"
                                        :style="{ color: horseMap[horse.horseId]?.color || '#000' }">{{
                                            horseMap[horse.horseId]?.name || 'Unknown Horse' }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>