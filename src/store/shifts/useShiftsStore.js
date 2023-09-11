import { defineStore } from "pinia";

export const useShiftsStore = defineStore("shifts", {
  state: () => ({
    shifts: [
      {
        id: 0,
        title: "Shift 1",
        description: "This is my first shift",
        shiftDates: [
          {
            date: "2023-01-12",
            startTime: "19:30",
            endTime: "22:50",
            type: "Consultation",
            price: "50",
          },
          {
            date: "2023-02-12",
            startTime: "12:00",
            endTime: "14:00",
            type: "Ambulance",
            price: "300",
          },
        ],
      },
      {
        id: 1,
        title: "Shift 2",
        description: "This is my second shift",
        shiftDates: [
          {
            date: "2023-03-12",
            startTime: "15:50",
            endTime: "20:50",
            type: "Consultation",
            price: "40",
          },
        ],
      },
    ],
    drawer: false,
    priceRange: [0, 500],
    shiftIdToEdit: "",
    values: [], // selected dates
  }),
  getters: {
    getShiftById: (state) =>
      state.shifts?.find((shift) => shift?.id === state.shiftIdToEdit),
  },
  actions: {},
});
