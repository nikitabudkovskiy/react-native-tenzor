import { ReducerBuilder, reducerWithInitialState } from 'typescript-fsa-reducers'
import { MyNotesInitialState, IMyNotesState } from './myNotesState'
import { MyNotesAsyncActions } from './myNotesAsyncActions'


const setOrderRaitingStarted = (state: IMyNotesState): IMyNotesState => {
    return {
        ...state,
        isLoading: true,
        error: false,
    }
}

const setOrderRaitingDone = (state: IMyNotesState, { result }: any): IMyNotesState => {

    return {
        ...state,
        isLoading: false,
        error: false,
    }
}

const setOrderRaitingFailed = (state: IMyNotesState): IMyNotesState => {
    return {
        ...state,
        isLoading: false,
        error: true,
    }
}

export const myNotesReducer: ReducerBuilder<IMyNotesState> = reducerWithInitialState(MyNotesInitialState)
    .case(MyNotesAsyncActions.setOrderRating.async.started, setOrderRaitingStarted)
    .case(MyNotesAsyncActions.setOrderRating.async.done, setOrderRaitingDone)
    .case(MyNotesAsyncActions.setOrderRating.async.failed, setOrderRaitingFailed)