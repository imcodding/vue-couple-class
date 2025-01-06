<template>
  <div class="couple-list-ex">
    <h4>짝꿍 X</h4>
    <div class="couple-list-ex-new">
      <div class="radio-input" >
        <label>
          <input type="radio" id="value-1" name="ex-new-type" value="M" v-model="gender" checked/>
          <span>남</span>
        </label>
        <label>
          <input type="radio" id="value-2" name="ex-new-type" value="W" v-model="gender"/>
          <span>여</span>
        </label>
        <span class="selection"></span>
      </div>  
      <select v-model="info1">
        <option v-for="item of selectList" :value="item">{{ item.name }}</option>
      </select>
      <select v-model="info2">
        <option v-for="item of selectList" :value="item">{{ item.name }}</option>
      </select>
      <button type="button" @click="onSave">저장</button>
    </div>
    <div class="couple-list-box">
      <div>
        <span>남</span>
        <ul>
          <li v-for="item of boys">
            {{ item.info1.name }}, {{ item.info2.name }}
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
            {{ item.info1.name }}, {{ item.info2.name }}
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
import { inject, reactive, toRefs, computed, watch, ref } from 'vue';
import KEY from '../enum/storageKey';
import { useFilters } from './compositions/filters';

const { getListByGender } = useFilters()

const addStudent = inject("addStudent")
const removeStudent = inject("removeStudent")
const exStudents = inject(KEY.EX)
const students = inject(KEY.CLASS)

const boys = computed(() => {
  return exStudents.value
    .filter((item) => item.gender == 'M').slice()
})

const girls = computed(() => {
  return exStudents.value
    .filter((item) => item.gender == 'W').slice()
})

const student = reactive({info1:{}, info2:{}, gender: 'M'})

const onSave = () => {
  let info = {
    info1: student.info1,
    info2: student.info2,
    gender: student.gender
  }
  addStudent(KEY.EX, info)
}

const onRemove = (id) => {
  removeStudent(KEY.EX, id)
}

const { info1, info2, gender } = toRefs(student)

const selectList = ref([])
watch([students.value, gender], ([new_students, new_gender]) => {
  selectList.value = getListByGender(new_students, new_gender)
},{immediate: true});
</script>