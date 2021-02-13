import { ApiService } from 'app/system/api'

export class LoginRequest {

  static getRequestSmsOnNumber = (data: IGetRequestSmsNumberRequest): Promise<IGetRequestSmsNumberResponce> => {
    return ApiService.post(
      'http://testym.appsj.su/sms.json',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  static getCodeVerificationSMS = (data: IGetCodeVerificationRequest): Promise<IGetCodeVerificationResponce> => {
    return ApiService.post(
      'http://testym.appsj.su/authorization.json',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  static changeUserData = (data: IChangeUserDataRequest): Promise<IChangeUserDataResponce> => {
    return ApiService.post(
      'http://testym.appsj.su/user-change.json',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }





}