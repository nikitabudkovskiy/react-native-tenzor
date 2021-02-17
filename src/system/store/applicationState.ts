import { ILoginState } from 'app/module/login/view/main/store/loginState'
import { IMainState } from 'app/module/main/store/mainState'
import { ISystemState } from 'app/system/store/system'


export interface IApplicationState {
  system: ISystemState
  login: ILoginState
  main: IMainState
}