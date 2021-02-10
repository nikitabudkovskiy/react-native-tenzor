export interface IMainState {
  isLoading: boolean
  error: boolean
  requestSmsInformation: IGetRequestSmsNumberResponce | any
  codeVerificationInformation: IGetCodeVerificationResponce | any
}

export const MainInitialState: IMainState = {
  isLoading: false,
  error: false,
  requestSmsInformation: {},
  codeVerificationInformation: {},
}