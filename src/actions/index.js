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
