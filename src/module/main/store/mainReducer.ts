import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { MainInitialState, IMainState } from './mainState'
import { MainAsynсActions } from './mainAsyncActions'
import { isEmpty } from 'lodash'

const getRequestSmsOnNumberStarted = (state: IMainState): IMainState => {
  return {
    ...state,
    isLoading: true,
    error: false,
  }
}

const getRequestSmsOnNumbernDone =
  (state: IMainState, { result }: any): IMainState => {

    return {
      ...state,
      isLoading: false,
      error: false,
      requestSmsInformation: result,

    }
  }

const getRequestSmsOnNumberFailed = (state: IMainState): IMainState => {
  return {
    ...state,
    isLoading: false,
    error: true,
  }
}

const getCodeVerificationSMStarted = (state: IMainState): IMainState => {
  return {
    ...state,
    isLoading: true,
    error: false,
  }
}

const getCodeVerificationSMSDone =
  (state: IMainState, { result }: any): IMainState => {
    
    if (isEmpty(result)) {
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    }

    return {
      ...state,
      isLoading: false,
      error: false,
      codeVerificationInformation: result,
    }
  }

const getCodeVerificationSMSrFailed = (state: IMainState): IMainState => {
  return {
    ...state,
    isLoading: false,
    error: true,
  }
}

export const mainReducer: ReducerBuilder<IMainState> = reducerWithInitialState(MainInitialState)
  .case(MainAsynсActions.getRequestSmsOnNumber.async.started, getRequestSmsOnNumberStarted)
  .case(MainAsynсActions.getRequestSmsOnNumber.async.done, getRequestSmsOnNumbernDone)
  .case(MainAsynсActions.getRequestSmsOnNumber.async.failed, getRequestSmsOnNumberFailed)

  .case(MainAsynсActions.getCodeVerificationSMS.async.started, getCodeVerificationSMStarted)
  .case(MainAsynсActions.getCodeVerificationSMS.async.done, getCodeVerificationSMSDone)
  .case(MainAsynсActions.getCodeVerificationSMS.async.failed, getCodeVerificationSMSrFailed)
