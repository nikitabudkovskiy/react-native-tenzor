import { asyncActionCreator } from 'app/system/store/actionCreator'
import { MainRequest } from '../api/MainRequest'

export class MainAsynсActions {

  static getRequestSmsOnNumber = asyncActionCreator<IGetRequestSmsNumberRequest, IGetRequestSmsNumberResponce, Error>(
    'MAIN/GET_REQUEST_SMS_ON_NUMBER',
    MainRequest.getRequestSmsOnNumber
  )

  static getCodeVerificationSMS = asyncActionCreator<IGetCodeVerificationRequest, IGetCodeVerificationResponce, Error>(
    'MAIN/GET_CODE_VERIFICATION_SMS',
    MainRequest.getCodeVerificationSMS
  )

}