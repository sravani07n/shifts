<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" location="right" temporary class="container">
        <div class="flex navigation-header">
          <TitleHeader msg="Create/Edit" />
          <div @click="onCloseDrawer" class="close-icon">
            <i class="fa fa-close"></i>
          </div>
        </div>
        <label class="title"> Title </label>
        <input placeholder="Title" class="inputClass" v-model="shiftTitle" maxlength="100" />
        <label class="title"> Description </label>
        <textarea id="w3review" name="w3review" rows="4" cols="50" class="inputClass" maxlength="500"
          v-model="shiftDescription"></textarea>
        <label class="title"> Dates </label>
        <div class="wrapper">
          <div class="flex">
            <input type="text" class="datesInputText" :value="dateString" />
            <input type="date" v-model="selectedDate" @change="addDate" class="dateInput" />
          </div>
          <div class="date-chips">
            <div class="date-chip" v-for="date in dates" :key="date" style="margin-bottom: 10px">
              <div class="flex">
                <p style="font-size: 14px; font-weight: bold">
                  {{ date.date }}
                </p>
                <div class="close-icon" @click="() => onDeleteDate(date.date)">
                  <i class="fa fa-close"></i>
                </div>
              </div>
              <div class="shift-card-settings">
                <div class="flex">
                  <div>
                    <div class="shit-input-label">Start time</div>
                    <input placeholder="hh:mm" class="shift-input without_ampm" type="time" :step="3600"
                      v-model="date.startTime" />
                  </div>
                  <div>
                    <div class="shit-input-label">End time</div>
                    <input placeholder="hh:mm" class="shift-input without_ampm" type="time" :step="3600"
                      v-model="date.endTime" />
                  </div>
                  <div>
                    <p class="shit-input-label">Price</p>
                    <div class="shift-input-container"><input placeholder="" class="shift-input" v-model="date.price" />€
                    </div>
                  </div>
                </div>
                <label class="type-label">Type</label>
                <select class="type-container" v-model="date.type">
                  <option>Consultation</option>
                  <option>Telephone</option>
                  <option>Ambulance</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="flex actions-wrapper">
          <v-btn class="action-btn" color="#404040" size="small" variant="outlined" @click="onDeleteClick">
            {{ String(shiftIdToEdit) ? 'DELETE' : 'CANCEL' }}
          </v-btn>
          <v-btn class="action-btn" color="#404040" size="small" variant="flat" @click="onSaveClick">
            SAVE
          </v-btn>
        </div>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script lang="js" setup>
import { storeToRefs } from "pinia";

import TitleHeader from "./TitleHeader.vue";

import { useShiftsStore } from "../store/shifts/useShiftsStore";
import { ref, watch } from "vue";

const store = useShiftsStore();
const { drawer, shifts, shiftIdToEdit } = storeToRefs(store);
const selectedDate = ref(null)
const dates = ref([])
const newShift = ref([])
const shiftTitle = ref('')
const shiftDescription = ref('')
const error = ref(false)
const dateString = ref('')

watch(() => store.shiftIdToEdit,
() => {
  const shiftDetails = JSON.parse(JSON.stringify(store.getShiftById))
  if (shiftDetails) {
    shiftTitle.value = shiftDetails.title
    shiftDescription.value = shiftDetails.description
    dates.value = shiftDetails.shiftDates
    dateString.value = dates.value.map(date => date.date)
  }
})

const addDate = () => {
  const shiftDates = dates.value.map(date => date.date)
  if (shiftDates.includes(selectedDate.value)) return alert('Cannot select same date!')
  dates.value.push({date: selectedDate.value, startTime: '', endTime: '', price: 0, type: 'Consultation'});
  dateString.value = dates.value.map(date => date.date)
}
const onSaveClick = () => {
  error.value = false
  // Validations
  if (!shiftTitle.value) return alert('Please enter title')
  if (!shiftDescription.value) return alert('Please enter description')
  if (dates.value.length < 1)
    return alert('Please enter at least one date')
  if (dates.value.length > 10)
    return alert('Dates cannot be more than 10!')


  dates.value.map(date => {
    const startTime = Number(date.startTime.split(':').join(''))
    const endTime = Number(date.endTime.split(':').join(''))
    if (!error.value && endTime <= startTime) error.value = true
  })
  if (error.value) {
    return alert('Invalid dates')
  }
  // If editing existing shift
  if (String(shiftIdToEdit.value))
    shifts.value = shifts.value.map(shift => {
      if (shift.id === shiftIdToEdit.value) {
        shift.title =  shiftTitle.value,
        shift.description = shiftDescription.value,
        shift.shiftDates =  [...dates.value]
      }
      return shift
    })
  else { // If its new shift
    newShift.value = {
      id: shifts.value.length + 1,
      title: shiftTitle.value,
      description: shiftDescription.value,
      shiftDates: [...dates.value]
    }
    shifts.value.push(newShift.value)
  }
  drawer.value = false
}

// To delete shift
const onDeleteClick = () => {
  shifts.value = shifts.value.filter(shift => shift.id !== shiftIdToEdit.value)
  drawer.value = false
}

// To delete date card
const onDeleteDate = (dateToDelete) => {
  dates.value = dates.value.filter(date => date.date !== dateToDelete)
}

const onCloseDrawer = () => {
  drawer.value = false
  shiftIdToEdit.value = ''
}
</script>
<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

.wrapper {
  width: 100%;
  max-height: 500px;
  overflow: auto;
}

.v-navigation-drawer {
  width: 300px !important;
}

.container {
  padding: 10px;
  position: relative;
}

.navigation-header {
  margin-bottom: 20px;
}

.inputClass {
  width: 100%;
  border: 1px solid lightgray;
  outline: none;
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
  margin-bottom: 10px;
}

.dateInput {
  width: 28px;
  border: 1px solid lightgray;
  outline: none;
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
  margin-bottom: 10px;
}

.datesInputText {
  width: 90%;
  border: 1px solid lightgray;
  outline: none;
  font-size: 12px;
  padding: 5px;
  border-radius: 3px;
  height: 32px;
}

.title {
  display: flex;
  margin-bottom: 4px;
  color: black;
  font-size: 12px;
}

.type-label {
  display: block;
  width: 100%;
  text-align: left;
  font-size: 12px;
  margin-top: 5px;
}

.type-container {
  background-color: white;
  width: 100%;
  margin: 5px 0;
  border-radius: 3px;
  padding-left: 5px;
  font-size: 12px;
  outline: none;
}

.action-btn {
  width: 48%;
}

.shift-card-settings {
  background-color: rgb(64, 64, 64);
  color: white;
  padding: 5px;
  border-radius: 3px;
}

.shit-input-label {
  font-size: 12px;
  text-align: left;
}

.shift-input-container {
  background-color: white;
  border-radius: 3px;
  font-size: 12px;
  color: black;
  padding-right: 10px;
}

.shift-input {
  background-color: white;
  width: 80px;
  border-radius: 3px;
  font-size: 12px;
  padding: 5px;
  outline: none;
}

.close-icon {
  cursor: pointer;
}

.icon {
  padding: 10px;
  /* color: white; */
  min-width: 50px;
  text-align: center;
}

.without_ampm::-webkit-datetime-edit-ampm-field {
  display: none;
}

input[type="time"]::-webkit-clear-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
  margin: -10px;
}

.actions-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 10px;
}
</style>
