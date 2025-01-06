<template>
  <div class="couple-content-list">
    <h3>목록관리</h3>
    <couple-class />
    <couple-exclude />
  </div>
</template>

<script>

</script>

<script setup>
import { provide, inject } from 'vue';
import CoupleClass from './CoupleClass.vue';
import CoupleExclude from './CoupleExclude.vue';
import { useStorage } from './compositions/stroage';

const { saveList } =  useStorage()

let list = inject("list")

const addStudent = (key, info) => {
  list[key].value.push(info)

  saveList(key, list[key])
}

const removeStudent = (key, id) => {
  list[key].value.splice(id, 1)
  list[key].value.forEach((student, idx) => {
    student.id = idx
  })
  saveList(key, list[key])
}

const checkName = (name) => {
  let tmp = name.trim();
  if(!tmp || tmp.length == 0) return false;
  return true
}

provide("addStudent", addStudent)
provide("removeStudent", removeStudent)

</script>
