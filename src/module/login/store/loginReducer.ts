import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { LoginInitialState, ILoginState } from './loginState'
import { LoginAsynсActions } from './loginAsyncActions'
import { isEmpty } from 'lodash'

const getRequestSmsOnNumberStarted = (state: ILoginState): ILoginState => {
  return {
    ...state,
    isLoading: true,
    error: false,
  }
}

const getRequestSmsOnNumbernDone =
  (state: ILoginState, { result }: any): ILoginState => {

    return {
      ...state,
      isLoading: false,
      error: false,
      requestSmsInformation: result,

    }
  }

const getRequestSmsOnNumberFailed = (state: ILoginState): ILoginState => {
  return {
    ...state,
    isLoading: false,
    error: true,
  }
}

const getCodeVerificationSMStarted = (state: ILoginState): ILoginState => {
  return {
    ...state,
    isLoading: true,
    error: false,
  }
}

const getCodeVerificationSMSDone =
  (state: ILoginState, { result }: any): ILoginState => {
    
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

const getCodeVerificationSMSrFailed = (state: ILoginState): ILoginState => {
  return {
    ...state,
    isLoading: false,
    error: true,
  }
}

export const loginReducer: ReducerBuilder<ILoginState> = reducerWithInitialState(LoginInitialState)
  .case(LoginAsynсActions.getRequestSmsOnNumber.async.started, getRequestSmsOnNumberStarted)
  .case(LoginAsynсActions.getRequestSmsOnNumber.async.done, getRequestSmsOnNumbernDone)
  .case(LoginAsynсActions.getRequestSmsOnNumber.async.failed, getRequestSmsOnNumberFailed)

  .case(LoginAsynсActions.getCodeVerificationSMS.async.started, getCodeVerificationSMStarted)
  .case(LoginAsynсActions.getCodeVerificationSMS.async.done, getCodeVerificationSMSDone)
  .case(LoginAsynсActions.getCodeVerificationSMS.async.failed, getCodeVerificationSMSrFailed)
