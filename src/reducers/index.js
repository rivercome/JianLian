const initState = {
  catalog: [],
  picture: {}
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
    default:
      return state
  }
}

export default Reducer
