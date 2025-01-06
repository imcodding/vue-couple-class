<template>
  <div class="couple-list">
    <h4>학급</h4>
    <div class="couple-list-new">
      <div class="radio-input" >
        <label>
          <input type="radio" id="value-1" name="new-type" v-model="gender" value="M" checked/>
          <span>남</span>
        </label>
        <label>
          <input type="radio" id="value-2" name="new-type" v-model="gender" value="W" />
          <span>여</span>
        </label>
        <span class="selection"></span>
      </div>  
      <input type="text" placeholder="이름을 입력해주세요" v-model="name" @keyup.enter="onSave"/>
      <button type="button" @click="onSave">저장</button>
    </div>
    <div class="couple-list-box">
      <div>
        <span>남</span>
        <ul>
          <li v-for="item of boys">
            {{ item.name }}
            <img 
              src="../assets/images/Delete.svg" width="18" height="18" 
              @click="onRemove(item.id)"
            />
          </li>
        </ul>
      </div>
      <div>
        <span>여</span>
        <ul>
          <li v-for="item of girls">
            {{ item.name }}
            <img 
              src="../assets/images/Delete.svg" width="18" height="18" 
              @click="onRemove(item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
</script> 

<script setup>
import { inject, reactive, toRefs, computed } from 'vue';
import { useStorage } from './compositions/stroage';
import KEY from '../enum/storageKey';
const { getStorageId, saveId } =  useStorage()

const addStudent = inject("addStudent")
const removeStudent = inject("removeStudent")
const students = inject("students")

const boys = computed(() => {
  return students.value
    .filter((item) => item.gender == 'M').slice()
})
const girls = computed(() => {
  return students.value
    .filter((item) => item.gender == 'W').slice()
})

const student = reactive({name:'', gender: 'M'})

const onSave = () => {
  let id = getStorageId();  
  let info = {
    name: student.name,
    gender: student.gender,
    id: ++id
  }
  saveId(id)
  addStudent(KEY.CLASS, info)
  
  student.name = ''
}

const onRemove = (id) => {
  removeStudent(KEY.CLASS, id)
}

const { name, gender } = toRefs(student)

</script>