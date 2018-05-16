const rootUrl = 'http://build.sealbaby.cn'

function apiMaker (url) {
  return rootUrl + url
}

const API = {
  getHomeNav: apiMaker('/catalog/show'),
  getHomeList: apiMaker('/article/list/all'),
  getArticle: apiMaker('/article/'),
  getCatalogArticle: apiMaker('/article/list/'),
  getPictures: apiMaker('/pictures/lun/show')
}

export default API
