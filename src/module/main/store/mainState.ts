export interface IMainState {
    isLoading: boolean
    error: boolean
    townsList: ITownsResponce[]
    organisationsList: IGetOrganisationsResponce[]
}

export const MainInitialState: IMainState = {
    isLoading: false,
    error: false,
    townsList: [],
    organisationsList: []
} 