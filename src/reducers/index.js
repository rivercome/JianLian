const initState = {
  catalog: [],
  picture: {},
  article_id: [],
  article_title: [],
  surveyArticleIds: ''
}

function Reducer (state = initState, action) {
  switch (action.type) {
    case 'ADD_CATALOG':
      return {
        ...state,
        catalog: action.payload
      }
    case 'ADD_PICTURE':
      return {
        ...state,
        picture: action.payload
      }
    case 'ADD_SURVEY':
      return {
        ...state,
        surveyArticleIds: [
          ...state.surveyArticleIds,
          action.payload
        ]
      }
    case 'SEARCH_SURVEY' :
      console.log(action.payload)
      return {
        ...state,
        article_id: action.payload,
        article_title: action.payload
      }
    default:
      return state
  }
}

export default Reducer
