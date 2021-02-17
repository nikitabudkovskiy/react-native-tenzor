import { combineReducers } from 'redux'
import { systemReducer } from 'app/system/store/system'
import { loginReducer } from 'app/module/login/store/loginReducer'
import { mainReducer } from 'app/module/main/store/mainReducer'

export const rootReducer = combineReducers({
  system: systemReducer,
  login: loginReducer,
  main: mainReducer,
})