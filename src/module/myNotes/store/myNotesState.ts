export interface IMyNotesState {
    isLoading: boolean
    error: boolean
}

export const MyNotesInitialState: IMyNotesState = {
    isLoading: false,
    error: false,
}