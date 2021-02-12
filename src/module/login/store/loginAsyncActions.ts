import { asyncActionCreator } from 'app/system/store/actionCreator'
import { LoginRequest } from '../api/LoginRequest'

export class LoginAsynсActions {

  static getRequestSmsOnNumber = asyncActionCreator<IGetRequestSmsNumberRequest, IGetRequestSmsNumberResponce, Error>(
    'LOGIN/GET_REQUEST_SMS_ON_NUMBER',
    LoginRequest.getRequestSmsOnNumber
  )

  static getCodeVerificationSMS = asyncActionCreator<IGetCodeVerificationRequest, IGetCodeVerificationResponce, Error>(
    'LOGIN/GET_CODE_VERIFICATION_SMS',
    LoginRequest.getCodeVerificationSMS
  )

}