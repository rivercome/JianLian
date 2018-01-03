export default (url) => {
  if (url.split('?')[1] === '' || url.split('?')[1] === void 0) {
    return null
  }
  let queryArr = url.split('?')[1].split('&')
  let query = {}
  let tmp = null
  for (let i of queryArr) {
    tmp = i.split('=')
    query[tmp[0]] = tmp[1]
  }
  return query
}
