<template>
  <TitleHeader msg="Filter"/>
  <div class="vertical_gap"></div>
  <div class="filter_section">
    Filter on price
    <div class="horizontal_gap"></div>

    <PriceSlider />
  </div>

  <div class="vertical_gap"></div>

  <div class="flex">
    <TitleHeader msg="Shifts" />
    <v-btn
      class="text-none text-subtitle-1"
      color="#404040"
      size="small"
      variant="flat"
      @click="onClickAddShift"
    >
      Add Shift
    </v-btn>
  </div>

  <div class="vertical_gap"></div>

  <template v-for="shift in storeShifts" :key="shift.title">
    <ShiftCard :shift="shift" :drawer="drawer" />
  </template>

  <ShiftDrawer />
</template>

<script lang="js" setup>
import TitleHeader from './components/TitleHeader.vue'
import PriceSlider from './components/PriceSlider.vue'
import ShiftCard from './components/ShiftCard.vue'
import ShiftDrawer from './components/ShiftDrawer.vue'
import { storeToRefs } from "pinia"
import { useShiftsStore } from './store/shifts/useShiftsStore';
import {computed} from 'vue';

const store = useShiftsStore();
const { drawer, shiftIdToEdit, priceRange  } = storeToRefs(store)
const onClickAddShift = () => {
  drawer.value = true
  shiftIdToEdit.value = ''
}

// const newShifts = ref(store.$state.defaultShifts)
const storeShifts = computed(() => {
  const shifts = JSON.parse(JSON.stringify(store.$state.shifts))
  const mappedShifts = shifts.map(shift => {
    shift.shiftDates = shift.shiftDates?.filter(date => {
      if (Number(date.price) <= priceRange.value[1] && Number(date.price) >= priceRange.value[0]) return date
    })
    return shift
  })
  return mappedShifts
})
</script>

<style>
html {
  background-color: #f8f8f8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0 auto;
  width: 720px;
  max-width: 100%;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.filter_section {
  display: flex;
}

.vertical_gap {
  height: 20px;
}

.horizontal_gap {
  width: 20px;
}
</style>
