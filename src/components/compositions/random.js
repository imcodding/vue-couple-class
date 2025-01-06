export const useRandom = () => {
  const ids = (array) => {
    let list = []
    for(const item of array) {
      list.push(item.id)
    }
    return list
  }
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
    let list = []
    for(let i = 0; i < array.length; i += col) {
      let temp;
      temp = array.slice(i, i+col)
      list.push(temp)
    }
    return list
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

  const checkCouple = (list, exList) => {
    let isCheck = true
    for(const coupleList of list) {
      for(const couple of coupleList) {
        if(!isOk(couple, exList)) isCheck = false
      }
    }
    return isCheck
  }

  const getDuplicateCouple = (list, histList) => {
    let dpList = []
    for(const couple of list) {
      if(!isOk(couple, histList)) {
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

  const start = (list, column, exList, histList) => {
    const idList = ids(list)
    const shuffleList = shuffle(idList)
    const splitCoupleList = splitCouple(shuffleList)
    const splitGroupList = splitGroup(shuffleList, column)
    const splitGroupCoupleList = splitGroupCouple(splitGroupList)
    
    if(!checkCouple(splitGroupCoupleList, exList)) {
      start(list, column, exList)
      return
    }

    // const dpCouple = getDuplicateCouple(splitCoupleList, histList)

    return splitGroupList
    // console.log('splitCoupleList',splitCoupleList)

    // girlList = splitGroupList
    // historyGroupList.push(splitGroupList)
    // historyList = [...historyList,...splitCoupleList]
  }

  const merge = (boyList, girlList, gender) => {
    // merge3(boyList, girlList, gender)
    // let list3 = Array.from(Array(3), () => new Array(3).fill([]))
    // console.log('list',list3)
    const boyTotal = 7
    const boynum = 2
    const girlTotal = 4
    const girlnum = 2
    const boyVal = Math.ceil(boyTotal/boynum)
    const girlVal = Math.ceil(girlTotal/girlnum)
    
    // 먼저 시작하는 성별에 따라
  //   let list = []
    let len = boyList.length + girlList.length
    
    let oddList, evenList;
    let cnt;
    if(gender == 'M') {
      oddList = girlList
      evenList = boyList
      cnt = boyVal > girlVal ? boyVal : (girlVal+girlVal)
    } else {
      oddList = boyList
      evenList = girlList
      cnt = girlVal > boyVal ? (girlVal + (girlVal-1)) : (boyVal+girlVal)
    } 
    // const cnt = boyVal > girlVal ? boyVal : girlVal

    let list = Array.from(Array(cnt), () => new Array(cnt).fill())

    let a = 0
    for(let i = 0; i < girlList.length; i++) {
      let girl = girlList[i]
      for(let j = 0; j < girl.length; j++) {
        list[a][j] = girl[j]
      }
      a += 2
    }
    
    console.log('boyList',boyList)
    for(let i = 0; i < boyList.length; i++) {
      let boy = boyList[i]
      for(let j = 0; j < boy.length; j++) {
        list[a][j] = boy[j]
      }
      a += 2
      if(a > boyList.length) break
    }
    // let i = 0;
    // for(let a = 0; a < evenList.length; a++) {
    //   list[i] = evenList[a]
    //   i += 2
    // }
    // i = 1
    // for(let b = 0; b < oddList.length; b++) {
    //   list[i] = oddList[b]
    //   i += 2
    // }
  // console.log('listv',list)
  // console.log('list',list)

  // for(let i = 0; i < list.length; i++) {
  //   var row = list[i]
  //   for(let j = 0; j < row && row.length; j++) {
  //     [list[i][j], list[j][i]] = [list[j][i], list[i][j]];
  //   }
  // }
  console.log('list',list)
    // return list
    
    // return changeRowCol(list)
    // merge2(boyList,girlList, gender)
  }
  const merge2 = (boyList, girlList, gender) => {
    // 총 분단 개수
    // (남자 수 % 2) + (여자 수 % 2) 해서 올림
    // ex)
    const boynum = 3
    const girlnum = 2
    const cnt = Math.ceil((7/boynum)+(4/girlnum))
    console.log('girlList',girlList)
    let list = Array.from(Array(cnt), () => new Array(cnt).fill([]))
    console.log('list',list)
    let a = 0
    for(let i = 0; i < girlList.length; i++) {
      let girl = girlList[i]
      for(let j = 0; j < girl.length; j++) {
        list[i][j] = girl[j]
      }
      // a += 2
    }
    console.log('list2',list)
    return;
    let b = 1
    for(let i = 0; i < boyList.length; i++) {
      let boy = boyList[i]
      for(let j = 0; j < boy.length; j++) {
        list[i][j] = boy[j]
      }
      // b += 2
    }
  }
  const merge3 = (boyList, girlList, gender) => {
    changeRowCol(boyList)
    changeRowCol(girlList)
    // console.log('boyList',boyList)
    if(gender == 'M') {
      oddList = girlList
      evenList = boyList
    } else {
      oddList = boyList
      evenList = girlList
    } 
    // const cnt = boyVal > girlVal ? boyVal : girlVal

    // let list = Array.from(Array(cnt), () => new Array(cnt).fill({}))
    let list = []

    let i = 0;
    for(let a = 0; a < evenList.length; a++) {
      list[i] = evenList[a]
      i += 2
    }
    i = 1
    for(let b = 0; b < oddList.length; b++) {
      list[i] = oddList[b]
      i += 2
    }
  }
  const changeRowCol = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
    // console.log('matrix',matrix)
    return matrix
  }

  return {
    start,
    merge
  }
}