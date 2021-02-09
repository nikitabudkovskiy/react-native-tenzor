export interface IMainState {
  isLoading: boolean
  error: boolean
  towns: ITown[]
}

export const MainInitialState: IMainState = {
  isLoading: false,
  error: false,
  towns: []
}
