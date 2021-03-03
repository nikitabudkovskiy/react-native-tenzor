import { combineReducers } from 'redux'
import { systemReducer } from 'app/system/store/system'
import { loginReducer } from 'app/module/login/store/loginReducer'
import { mainReducer } from 'app/module/main/store/mainReducer'
import { masterReducer } from 'app/module/masters/store/masterReducer'
import { myNotesReducer } from 'app/module/myNotes/store/myNotesReducer'

export const rootReducer = combineReducers({
  system: systemReducer,
  login: loginReducer,
  main: mainReducer,
  master: masterReducer,
  myNotes: myNotesReducer,
})