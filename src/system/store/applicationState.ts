import { ILoginState } from 'app/module/login/view/main/store/loginState'
import { IMainState } from 'app/module/main/store/mainState'
import { ISystemState } from 'app/system/store/system'
import { IMasterState } from 'app/module/masters/store/masterState'
import { IMyNotesState } from 'app/module/myNotes/store/myNotesState'


export interface IApplicationState {
  system: ISystemState
  login: ILoginState
  main: IMainState
  master: IMasterState
  myNotes: IMyNotesState
}