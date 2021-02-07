export interface IMainState {
    isLoading: boolean
    error: boolean
    towns: ITown[]
}

export const mainIntitalState: IMainState = {
    isLoading: false,
    error: false,
    towns: []
}


