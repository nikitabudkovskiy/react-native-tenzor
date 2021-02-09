import { ReducerBuilder, reducerWithInitialState } from "typescript-fsa-reducers";
import { IMainState, MainInitialState } from './mainState'
import { MainAsynсActions } from './mainAsyncActions'

const appSettingsStarted = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: true,
    }
}

const appSettingsDone = (state: IMainState, payload: any): IMainState => {
    if (payload.result.status === 1) {
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
    }
}

const getTownsStarted = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: true,
    }
}

const getTownsDone = (state: IMainState, payload: any): IMainState => {
    console.log(payload.result.towns)
    return {
        ...state,
        isLoading: false,
        error: false,
        towns: payload.result.towns,
    }
}

const getTownFailed = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

const appSettingsFailed = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

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
    .case(MainAsynсActions.appSettings.async.started, appSettingsStarted)
    .case(MainAsynсActions.appSettings.async.done, appSettingsDone)
    .case(MainAsynсActions.appSettings.async.failed, appSettingsFailed)

    .case(MainAsynсActions.getTowns.async.started, getTownsStarted)
    .case(MainAsynсActions.getTowns.async.done, getTownsDone)
    .case(MainAsynсActions.getTowns.async.failed, getTownFailed)

    .case(MainAsynсActions.getRequestSmsOnNumber.async.started, getRequestSmsOnNumberStarted)
    .case(MainAsynсActions.getRequestSmsOnNumber.async.done, getRequestSmsOnNumbernDone)
    .case(MainAsynсActions.getRequestSmsOnNumber.async.failed, getRequestSmsOnNumberFailed)

  
