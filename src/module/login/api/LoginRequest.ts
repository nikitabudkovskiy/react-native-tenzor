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

  static getCodeVerificationSMS = (data: IGetCodeVerificationRequest): Promise<IGetRequestSmsNumberResponce> => {
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





}