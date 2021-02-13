import { ILoginState, IMainState } from 'app/module/login/view/main/store/loginState'
import { ISystemState } from 'app/system/store/system'


export interface IApplicationState {
  system: ISystemState
  login: ILoginState
}