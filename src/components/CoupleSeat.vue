<template>
  <div class="couple-content-seat">
    <div>
      <h3>자리배치</h3>
    </div>
    <div class="couple-content-box">
      <div class="couple-seat-info">
        <h4>분단 시작</h4>
        <div class="radio-input">
          <label>
            <input type="radio" id="value-1" name="seat-type" value="M" checked v-model="gender"/>
            <span>남</span>
          </label>
          <label>
            <input type="radio" id="value-2" name="seat-type" value="W" v-model="gender" />
            <span>여</span>
          </label>
          <span class="selection"></span>
        </div>  
        <div class="couple-seat-info-sub">
          <h4>분단별 인원 수</h4>
          <div>
            <label>남: </label><input type="number" min="1" v-model="boyNum"/>
            <label>여: </label><input type="number" min="1" v-model="girlNum"/>
          </div>
        </div>
        <button type="button" @click="onRandomSeat()">자리정하기</button>
      </div>
      <div class="couple-seat-desk">
        <div>
          <table>
            <tr v-for="row of result">
              <td v-for="col of row">{{col && col.name}}</td>
            </tr>
          </table>
        </div>
        <button type="button">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<script setup>
import { inject, reactive, ref, toRefs } from 'vue'
import { useRandom } from './compositions/random';
import { useFilters } from './compositions/filters'
import { useStorage } from './compositions/stroage';
import KEY from '../enum/storageKey';

const { start, merge } = useRandom()
const { getBoyList, getGirlList } = useFilters()
const { loadDeskInfo, saveDeskInfo } = useStorage()

const students = inject(KEY.CLASS)
const exStudents = inject(KEY.EX)
// const histStudents = inject(KEY.HIST)

const girls = getGirlList(students)
const exGirls = getGirlList(exStudents)

let deskInfo = reactive({})

const initDeskInfo = (info) => {
  deskInfo.gender = info.gender
  deskInfo.boyNum = info.boyNum
  deskInfo.girlNum = info.girlNum
}
loadDeskInfo(initDeskInfo)

const result = ref([])

const onRandomSeat = () => {
  const boys = getBoyList(students)
  const exBoys = getBoyList(exStudents)

  let list = []
  for(const ex of exBoys) {
    let temp = []
    temp.push(ex.info1.id)
    temp.push(ex.info2.id)
    list.push(temp)
    temp = []
  }
  const a = start(boys, boyNum.value, list)
  
  let list2 = []
  for(const ex of exGirls) {
    let temp = []
    temp.push(ex.info1.id)
    temp.push(ex.info2.id)
    list2.push(temp)
    temp = []
  }

  const b = start(girls, girlNum.value, list2)

  let res = []
  for(const row of a) {
    let temp = []
    for(const id of row) {
      for(const std of students.value) {
        if(std.id == id) {
          temp.push(std)
        }
      }
    }
    res.push(temp)
    temp = []
  }

  let res2 = []
  for(const row of b) {
    let temp = []
    for(const id of row) {
      for(const std of students.value) {
        if(std.id == id) {
          temp.push(std)
        }
      }
    }
    res2.push(temp)
    temp = []
  }
  
  saveDeskInfo({
    gender: deskInfo.gender, 
    boyNum: deskInfo.boyNum, 
    girlNum: deskInfo.girlNum
  })
  
  result.value = merge(res, res2, gender.value)

}
const onSaveSeat = () => {
  
}


const { gender, boyNum, girlNum } = toRefs(deskInfo)

</script>