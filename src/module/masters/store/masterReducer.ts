import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { IMasterState, MasterInitialState } from './masterState'
import { MastersAsyncActions } from './masterAsyncActions'

export const getMastersListStarted = (state: IMasterState): IMasterState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

export const getMastersListDone = (state: IMasterState, { result }: any): IMasterState => {
    console.log('wwwwwwwww', result)
    return {
        ...state,
        isLoading: false,
        error: false,
        mastersList: result
    }
}

export const getMastersListFailed = (state: IMasterState): IMasterState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

export const masterReducer: ReducerBuilder<IMasterState> = reducerWithInitialState(MasterInitialState)
    .case(MastersAsyncActions.getMastersList.async.started, getMastersListStarted)
    .case(MastersAsyncActions.getMastersList.async.done, getMastersListDone)
    .case(MastersAsyncActions.getMastersList.async.failed, getMastersListFailed)