import { def } from "@vue/shared"

export const useStorage = () => {

  const getStorageId = () => {
    return localStorage.getItem("storageId") || 0
  }

  const saveId = (id) => {
    localStorage.setItem("storageId", id)
  }

  const loadList = (key, initList) => {
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    initList(key, list)
  }

  const saveList = (key, list) => {
    localStorage.setItem(key, JSON.stringify(list.value))
  }

  const loadDeskInfo = (initDeskInfo) => {
    let defaultValue = {gender: 'M', boyNum: 1, girlNum: 1}
    const info = JSON.parse(localStorage.getItem("deskInfo" || defaultValue))
    initDeskInfo(info)
  }

  const saveDeskInfo = (info) => {
    localStorage.setItem("deskInfo", JSON.stringify(info))
  }

  return {
    getStorageId,
    saveId,
    loadList,
    saveList,
    loadDeskInfo,
    saveDeskInfo
  }
}