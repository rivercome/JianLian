const rootUrl = 'http://build.sealbaby.cn'

function apiMaker (url) {
  return rootUrl + url
}

const API = {
  getHomeNav: apiMaker('/catalog/show'),
  getHomeList: apiMaker('/article/list/all'),
  getArticle: apiMaker('/article/'),
  getCatalogArticle: apiMaker('/article/list/'),
  getPictures: apiMaker('/pictures/lun/show'),
  getSearch: apiMaker('/article/search/{title}'),
  getLink: apiMaker('/friendurl/show')
}

export default API
