export interface IMasterState {
    isLoading: boolean
    error: boolean
    mastersList: IGetMastersListResponce[]
}

export const MasterInitialState: IMasterState = {
    isLoading: false,
    error: false,
    mastersList: []
}