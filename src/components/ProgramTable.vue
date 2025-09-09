<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const schedule = computed(() => store.getters["race/schedule"]);
const horseMap = computed(() => store.getters["horses/horseMap"]);

</script>

<template>
    <div class="max-h-[85vh] overflow-auto">
        <h1 class="programTitle">Race Program</h1>
        <div>
            <div v-for="round in schedule" :key="round.id">
                <h2 class="roundTitle">{{ round.id }}ST Lap - {{ round.distance }}</h2>
                <div class="border border-gray-300 p-4 bg-white">
                    <table class="tableContainer">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="thColumn">Position</th>
                                <th class="thColumn">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(horseId, idx) in round.participants" :key="horseId" class="border-t">
                                <td class="tdColumn">{{ idx + 1 }}</td>
                                <td class="tdColumn">
                                    <span class="font-extrabold"
                                        :style="{ color: horseMap[horseId]?.color || '#000' }">{{
                                            horseMap[horseId]?.name || 'Unknown Horse' }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>