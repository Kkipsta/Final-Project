import { FETCH_RESOURCES_REQUEST,FETCH_RESOURCES_SUCCESS,FETCH_RESOURCES_FAILURE } from './ResourcesTypes'
  


  const initialState = {
    loading: false,
    resources: [],
    error: ''
  }
  

  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RESOURCES_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_RESOURCES_SUCCESS:
        return {
          loading: false,
          resources: action.payload,
          error: ''
        }
      case FETCH_RESOURCES_FAILURE:
        return {
          loading: false,
          resources: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default reducer