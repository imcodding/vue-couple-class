
export const useFilters = () => {

  const getBoyList = (list) => {
    return list.value
    .filter((item) => item.gender == 'M')
    .slice()
  }
  const getGirlList = (list) => {
    return list.value
    .filter((item) => item.gender == 'W')
    .slice()
  }
  const getListByGender = (list, gender) => {
    return list
    .filter((item) => item.gender == gender)
    .slice()
  }

  return {
    getBoyList,
    getGirlList,
    getListByGender
  }
}