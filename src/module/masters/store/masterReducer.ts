import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { IMasterState, MasterInitialState } from './masterState'
import { MastersAsyncActions } from './masterAsyncActions'
import { isEmpty } from 'lodash'

export const getMastersListStarted = (state: IMasterState): IMasterState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

export const getMastersListDone = (state: IMasterState, { result }: any): IMasterState => {
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

export const getServicesStarted = (state: IMasterState): IMasterState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

export const getServicesDone = (state: IMasterState, { result }: any): IMasterState => {
    return {
        ...state,
        isLoading: false,
        error: false,
        services: result
    }
}

export const getServicesFailed = (state: IMasterState): IMasterState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

export const getWorkingHoursMasterStarted = (state: IMasterState): IMasterState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

export const getWorkingHoursMasterDone = (state: IMasterState, { result }: any): IMasterState => {
    const workingHoursMaster = result.dates.filter(item => !isEmpty(item.masters))
    
    return {
        ...state,
        isLoading: false,
        error: false,
        workingHoursMaster,
    }
}

export const getWorkingHoursMasterFailed = (state: IMasterState): IMasterState => {
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

    .case(MastersAsyncActions.getServices.async.started, getServicesStarted)
    .case(MastersAsyncActions.getServices.async.done, getServicesDone)
    .case(MastersAsyncActions.getServices.async.failed, getServicesFailed)

    .case(MastersAsyncActions.getWorkingHoursMaster.async.started, getWorkingHoursMasterStarted)
    .case(MastersAsyncActions.getWorkingHoursMaster.async.done, getWorkingHoursMasterDone)
    .case(MastersAsyncActions.getWorkingHoursMaster.async.failed, getWorkingHoursMasterFailed)