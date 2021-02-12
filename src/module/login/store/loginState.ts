export interface ILoginState {
  isLoading: boolean
  error: boolean
  requestSmsInformation: IGetRequestSmsNumberResponce | any
  codeVerificationInformation: IGetCodeVerificationResponce | any
}

export const LoginInitialState: ILoginState = {
  isLoading: false,
  error: false,
  requestSmsInformation: {},
  codeVerificationInformation: {},
}