import { IMainState } from 'app/module/main/store/mainState'
import { ISystemState } from 'app/system/store/system'


export interface IApplicationState {
  system: ISystemState
  main: IMainState
}