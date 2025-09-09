<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const horses = computed(() => store.getters["horses/allHorses"]);
</script>

<template>
    <div class="max-h-[85vh] overflow-auto">
        <h1 class="horseListTitle">Horse List 1 - {{ horses.length
            }}
        </h1>

        <div class="border border-gray-300 p-4 ">
            <table class="tableContainer">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="thColumn">Name</th>
                        <th class="thColumn">Condition</th>
                        <th class="thColumn">Color</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="horse in horses" :key="horse.id" class="text-center">
                        <td class="tdColumn">{{ horse.name }}</td>
                        <td class="tdColumn">{{ horse.condition }}</td>
                        <td class="tdColumn">
                            <div :style="{ backgroundColor: horse.color }" class="colorCircle"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>