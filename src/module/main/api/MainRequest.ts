import { ApiService } from 'app/system/api'

export class MainRequest {

  static getRequestSmsOnNumber = (data: IGetRequestSmsNumberRequest): Promise<IGetRequestSmsNumberResponce> => {
    return ApiService.post(
      'https://localmodx.appsj.su/sms.json',
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
      'https://localmodx.appsj.su//authorization.json',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }





}