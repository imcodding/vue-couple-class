<template>
  <div class="couple-container">
    <div class="couple-content">
      <couple-list />
      <couple-seat />
    </div>
  </div>
</template>

<script>
</script>

<script setup>
import { reactive, ref, toRefs, watch } from 'vue'
import CoupleList from './CoupleList.vue';
import CoupleSeat from './CoupleSeat.vue';

</script>