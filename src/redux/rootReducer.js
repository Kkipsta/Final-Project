import { combineReducers } from 'redux'
import ResourcesUseReducer from "./resources/ResourcesUseReducer"


const rootReducer = combineReducers({
  resource:ResourcesUseReducer
})

export default rootReducer