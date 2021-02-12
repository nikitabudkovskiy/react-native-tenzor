import { combineReducers } from 'redux'
import { systemReducer } from 'app/system/store/system'
import { loginReducer } from 'app/module/login/store/loginReducer'

export const rootReducer = combineReducers({
  system: systemReducer,
  login: loginReducer,
})