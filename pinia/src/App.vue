<script setup lang="ts">
import OptionView from './components/OptionView.vue'
import SetupView from './components/SetupView.vue'
import Vue2View from './components/Vue2View.vue'
import Vue2SetupView from './components/Vue2SetupView.vue'
</script>

<template>
  <div>
    <div class="container">
      <OptionView />
      <SetupView />
      <!-- <Vue2View /> -->
      <Vue2SetupView />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1250px;
  display: flex;
  gap: 20em;
}
</style>
