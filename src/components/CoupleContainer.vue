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
import CoupleList from './CoupleList.vue';
import CoupleSeat from './CoupleSeat.vue';
import { provide, ref } from 'vue'
import { useStorage } from './compositions/stroage';
import KEY from '../enum/storageKey';

const { loadList } =  useStorage()

const students = ref([])
const exStudents = ref([])

let list = {}
list[KEY.CLASS] = students
list[KEY.EX] = exStudents

const initStudents = (key, initList) => {
  list[key].value = initList
}

loadList(KEY.CLASS, initStudents)
loadList(KEY.EX, initStudents)

provide("list", list)
provide(KEY.CLASS, students)
provide(KEY.EX, exStudents)

</script>