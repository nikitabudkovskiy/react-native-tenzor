import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { IMainState, MainInitialState } from './mainState'
import { MainAsyncActions } from './mainAsyncActions'

export const getTownsListStarted = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

export const getTownsListDone = (state: IMainState, { result }: any): IMainState => {
    return {
        ...state,
        isLoading: false,
        error: false,
        townsList: result.towns
    }
}

export const getTownsListFailed = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

export const getOrganisationsStarted = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

export const getOrganisationsDone = (state: IMainState, { result }: any): IMainState => {
    return {
        ...state,
        isLoading: false,
        error: false,
        organisationsList: result
    }
}

export const getOrganisationsFailed = (state: IMainState): IMainState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

export const mainReducer: ReducerBuilder<IMainState>  = reducerWithInitialState(MainInitialState)
    .case(MainAsyncActions.getTownsList.async.started, getTownsListStarted)
    .case(MainAsyncActions.getTownsList.async.done, getTownsListDone)
    .case(MainAsyncActions.getTownsList.async.failed, getTownsListFailed)

    .case(MainAsyncActions.getOrganisations.async.started, getOrganisationsStarted)
    .case(MainAsyncActions.getOrganisations.async.done, getOrganisationsDone)
    .case(MainAsyncActions.getOrganisations.async.failed, getOrganisationsFailed)