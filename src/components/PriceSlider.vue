<template>
  <v-range-slider v-model="priceRange" :ripple="false" min="0" max="500" ticks="always" tick-size="4" thumb-label="always"
    :thumb-size="24" />
</template>

<script lang="js" setup>
import { storeToRefs } from "pinia";
import { useShiftsStore } from "../store/shifts/useShiftsStore";

const store = useShiftsStore();
const { priceRange } = storeToRefs(store);
</script>
<style scoped>
.filterSlider {
  max-width: 300px;
}
</style>
