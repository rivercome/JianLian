const initState = {
  catalog: [],
  picture: {},
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
    default:
      return state
  }
}

export default Reducer
