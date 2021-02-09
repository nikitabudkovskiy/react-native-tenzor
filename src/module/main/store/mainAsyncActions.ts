import { asyncActionCreator } from 'app/system/store/actionCreator'
import { MainRequest } from '../api/MainRequest'
import { appSettingsRequest, townsRequest } from '../api/request'

export class MainAsynсActions {

  static getRequestSmsOnNumber = asyncActionCreator<IGetRequestSmsNumberRequest, IGetRequestSmsNumberResponce, Error>(
    'MAIN/GET_REQUEST_SMS_ON_NUMBER',
    MainRequest.getRequestSmsOnNumber
  )

  static getCodeVerificationSMS = asyncActionCreator<IGetRequestSmsNumberRequest, IGetRequestSmsNumberResponce, Error>(
    'MAIN/GET_CODE_VERIFICATION_SMS',
    MainRequest.getCodeVerificationSMS
  )

  static appSettings = asyncActionCreator<IAppSettingsRequest, ISettingsInformation, Error> (
    'MAIN/APPSETTINGS',
    appSettingsRequest
  )
  static getTowns = asyncActionCreator<ITownsRequest, ITownsResponce, Error> (
    'MAIN/GET_TOWNS',
    townsRequest
  )

}