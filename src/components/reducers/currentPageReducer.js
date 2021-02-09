/* Redux hooks saves a dispatch to state */
const currentPageReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_PAGE':
    return {page : action.data, location:action.location}
  default:
    return state
  }
}
    
    
export default currentPageReducer