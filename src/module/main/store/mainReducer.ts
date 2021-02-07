import { ReducerBuilder, reducerWithInitialState } from "typescript-fsa-reducers";
import { mainAsyncActions } from './mainAsyncActions'
import { IMainState, mainIntitalState } from './mainState'

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

export const mainReducer: ReducerBuilder<IMainState> = reducerWithInitialState(mainIntitalState)
    .case(mainAsyncActions.appSettings.async.started, appSettingsStarted)
    .case(mainAsyncActions.appSettings.async.done, appSettingsDone)
    .case(mainAsyncActions.appSettings.async.failed, appSettingsFailed)

    .case(mainAsyncActions.getTowns.async.started, getTownsStarted)
    .case(mainAsyncActions.getTowns.async.done, getTownsDone)
    .case(mainAsyncActions.getTowns.async.failed, getTownFailed)
