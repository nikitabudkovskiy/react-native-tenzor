import { combineReducers } from 'redux'
import { systemReducer } from 'app/system/store/system'
import { mainReducer } from 'app/module/main/store/mainReducer'

export const rootReducer = combineReducers({
  system: systemReducer,
  main: mainReducer,
})