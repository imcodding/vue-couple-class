<template>
  <div style="background-color: #333; width: 100%; height: 100vh;"></div>
</template>

<script>
export default {
  
}

// list 는 1개로 관리
// filter 통해 남, 여 구분

const list1 = ['a','b','c','d','e','f','g','h','i','j']
const list2 = [1,2,3,4,5,6,7,8,9,10,11,12]
const boyColumn = 5
const girlColumn = 4

let boyList = []
let girlList = []

let historyList = []
let historyGroupList = []
let noMatchCoupleList1 = [['a','f'],['h,j']]
let noMatchCoupleList2 = [[1,6],[3,4]]


//배열 섞기
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

//짝꿍 쪼개기
const splitCouple = (array) => {
  let list = []
  let couple = []
  
  for(let i = 1; i <= array.length; i++) {
    couple.push(array[i-1])
    if(i % 2 == 0) {
      list.push(couple)
      couple = []
    }
    if(i == array.length+1) {
      list.push(couple)
    }
  }
  return list
}

//분단 쪼개기 - 한 줄에 앉힐 인원 수 입력받기
const splitGroup = (array, col) => {
  let arr = []
  for(let i = 0; i < array.length; i += col) {
    let temp;
    temp = array.slice(i, i+col)
    arr.push(temp)
  }
  return arr
}

//분단별 앞뒤쪼개기
const splitGroupCouple = (array) => {
  let list = []
  let coupleList = []
  let couple = []
  
  for(let i = 0; i < array.length; i++) {
    let group = array[i]
    for(let j = 0; j < group.length; j++) {
      if(j == group.length-1) break

      couple.push(group[j], group[j+1])
      coupleList.push(couple)

      couple = []
    }
    list.push(coupleList)
    coupleList = []
  }

  return list
}

const checkCouple = (list, noList) => {
  let isCheck = true
  for(const coupleList of list) {
    for(const couple of coupleList) {
      if(!isOk(couple, noList)) isCheck = false
    }
  }
  return isCheck
}
const getDuplicateCouple = (list) => {
  let dpList = []
  for(const couple of list) {
    if(!isOk(couple, historyList)) {
      dpList.push(couple)
    }
  }
  return dpList
}
// 중복, 짝꿍X 모두검사
const isOk = (couple, targetList) => {
  let ok = true
  let temp = [...couple]
  for(const target of targetList) {
    if(JSON.stringify(target.sort()) == JSON.stringify(temp.sort())) {
      ok = false
      break
    }
  }
  return ok
}

const start = () => {
  const shuffleList = shuffle(list2)
  const splitCoupleList = splitCouple(shuffleList)
  const splitGroupList = splitGroup(shuffleList, girlColumn)
  const splitGroupCoupleList = splitGroupCouple(splitGroupList)
  // console.log('shuffleList', shuffleList)
  // console.log('splitCoupleList', splitCoupleList)
  console.log('여 splitGroupList', splitGroupList)
  // console.log('splitGroupCoupleList',splitGroupCoupleList )
  
  if(!checkCouple(splitGroupCoupleList, noMatchCoupleList2)) {
    start()
    return
  }
  const dpCouple = getDuplicateCouple(splitCoupleList)
  girlList = splitGroupList
  // historyGroupList.push(splitGroupList)
  historyList = [...historyList,...splitCoupleList]
}
const start2 = () => {
  const shuffleList = shuffle(list1)
  const splitCoupleList = splitCouple(shuffleList)
  const splitGroupList = splitGroup(shuffleList, boyColumn)
  const splitGroupCoupleList = splitGroupCouple(splitGroupList)
  // console.log('shuffleList', shuffleList)
  // console.log('splitCoupleList', splitCoupleList)
  console.log('남 splitGroupList', splitGroupList)
  // console.log('splitGroupCoupleList',splitGroupCoupleList )
  
  if(!checkCouple(splitGroupCoupleList, noMatchCoupleList1)) {
    start2()
    return
  }
  const dpCouple = getDuplicateCouple(splitCoupleList)
  boyList = splitGroupList
  historyList = [...historyList,...splitCoupleList]
}

console.log('history', historyList)

const mergeGroup = () => {
  // 먼저 시작하는 성별에 따라
  let list = []
  let len = girlList.length + boyList.length

  let a = 0
  let b = 0
  for(let i = 0; i < len; i++) {
    if(i % 2 == 0) {
      list[i] = girlList[a++]
    }
    else {
      list[i] = boyList[b++]
    }
  }
  console.log('merge',list)
  console.log('z',changeRowCol(list))
}

const changeRowCol = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  console.log('matrix',matrix)
}

for(let i = 0; i < 1; i++) {
 start() 
 start2()
 mergeGroup()
}
</script>

