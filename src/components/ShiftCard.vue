<template>
    <div class="wrapper">
      <div class="headerClass">
        <div class="title">
          {{ shift?.title }}
        </div>

      <div class="iconClass" @click="onClickEdit">
        <i class="fa fa-edit" />
      </div>
      </div>
      <p>
        {{ shift?.description }}
      </p>

      <div class="datesContainer">
        <div class="title">Dates</div>

        <v-table fixed-header v-if="shift.shiftDates.length">
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Start time</th>
              <th class="text-left">End time</th>
              <th class="text-left">Type</th>
              <th class="text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="date in shift?.shiftDates" :key="date.date">
              <td>{{ date.date }}</td>
              <td>{{ date.startTime }}</td>
              <td>{{ date.endTime }}</td>
              <td>{{ date.type }}</td>
              <td>€{{ date.price }}</td>
            </tr>
          </tbody>
        </v-table>
        <div v-else>No dates</div>
      </div>
    </div>
</template>

<script lang="js" setup>
import { storeToRefs } from "pinia";
import { defineProps } from 'vue'
import { useShiftsStore } from "../store/shifts/useShiftsStore";

const props = defineProps(['shift'])

const store = useShiftsStore();
const { drawer, shiftIdToEdit } = storeToRefs(store);

const onClickEdit = () => {
  shiftIdToEdit.value = props.shift.id
  drawer.value = true
}

</script>
<style scoped>
.wrapper {
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  margin-bottom: 20px;
}

.headerClass {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.iconClass {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.datesContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-size: 20px;
  font-weight: 500;
}

.v-table {
  width: 100%;
}
.empty-dates {
  text-align: center;
  width: 100%;
}
td {
  text-align: left;
}
</style>
