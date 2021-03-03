export interface IMasterState {
    isLoading: boolean
    error: boolean
    mastersList: IGetMastersListResponce | any
}

export const MasterInitialState: IMasterState = {
    isLoading: false,
    error: false,
    mastersList: {}
}