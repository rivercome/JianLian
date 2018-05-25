export function catalogStore (catalog) {
  return {
    type: 'ADD_CATALOG',
    payload: catalog
  }
}

export function pictureStore (picture) {
  return {
    type: 'ADD_PICTURE',
    payload: picture
  }
}

export function surveyArticleIdsStore (articleId) {
  return {
    type: 'ADD_SURVEY',
    payload: articleId
  }
}
export function SearchAticle (article) {
  return {
    type: 'SEARCH_SURVEY',
    payload: article
  }
}
