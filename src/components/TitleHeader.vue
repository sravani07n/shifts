<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <div class="underline"></div>
  </div>
</template>

<script lang="js" setup>
import { defineProps } from 'vue'
defineProps(['msg'])
</script>

<style scoped>
.underline {
  height: 3px;
  width: 35px;
  background-color: #F26680;
}

h3 {
  margin: 0;
  width: fit-content;
}
</style>
