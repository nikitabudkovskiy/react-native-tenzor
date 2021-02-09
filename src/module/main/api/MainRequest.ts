import { ApiService } from 'app/system/api'

export class MainRequest {
  
  static getRequestSmsOnNumber = (data: IGetRequestSmsNumberRequest ): Promise<IGetRequestSmsNumberResponce> => {
    return  ApiService.post('https://localmodx.appsj.su/sms.json', 
    {
      phone: data.phone,
    })
  }

  static getCodeVerificationSMS = (data: IGetCodeVerificationRequest ): Promise<IGetRequestSmsNumberResponce> => {
    return  ApiService.post('https://localmodx.appsj.su//authorization.json')
  }

  // Send a POST request

  


}