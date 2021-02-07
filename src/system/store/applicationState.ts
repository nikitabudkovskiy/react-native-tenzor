import { ISystemState } from 'app/system/store/system'
import { IMainState } from 'app/module/main/store/mainState'

export interface IApplicationState {
  system: ISystemState
  main: IMainState
}