export interface IMainState {
  isLoading: boolean
  error: boolean
}

export const MainInitialState: IMainState = {
  isLoading: false,
  error: false,
}