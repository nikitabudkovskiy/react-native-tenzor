export interface IMyNotesState {
    isLoading: boolean
    error: boolean
    myNotes: IGetOrdersHistoryResponce
}

export const MyNotesInitialState: IMyNotesState = {
    isLoading: false,
    error: false,
    myNotes: {
        orders: [],
    },
}