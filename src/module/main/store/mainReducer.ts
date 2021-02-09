import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { MainInitialState, IMainState } from './mainState'
import { MainAsynсActions } from './mainAsyncActions'

const getRequestSmsOnNumberStarted = (state: IMainState): IMainState => {
  return {
    ...state,
    isLoading: true,
    error: false,
  }
}

const getRequestSmsOnNumbernDone =
  (state: IMainState, { result }: any): IMainState => {

    console.log('resu', result)
    return {
      ...state,
      isLoading: false,
      error: false,

    }
  }

const getRequestSmsOnNumberFailed = (state: IMainState): IMainState => {
  return {
    ...state,
    isLoading: true,
    error: false,
  }
}

export const mainReducer: ReducerBuilder<IMainState> = reducerWithInitialState(MainInitialState)
  .case(MainAsynсActions.getRequestSmsOnNumber.async.started, getRequestSmsOnNumberStarted)
  .case(MainAsynсActions.getRequestSmsOnNumber.async.done, getRequestSmsOnNumbernDone)
  .case(MainAsynсActions.getRequestSmsOnNumber.async.failed, getRequestSmsOnNumberFailed)
