export interface IMasterState {
    isLoading: boolean
    error: boolean
    mastersList: IGetMastersListResponce | any
    workingHoursMaster: IGetWorkingHoursMasterResponce | any
    services: IGetServicesResponce | any
}

export const MasterInitialState: IMasterState = {
    isLoading: false,
    error: false,
    mastersList: {},
    workingHoursMaster: {},
    services: {},
}