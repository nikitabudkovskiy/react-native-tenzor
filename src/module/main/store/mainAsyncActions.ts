import { asyncActionCreator } from 'app/system/store/actionCreator'
import { appSettingsRequest,townsRequest, smsRequest, authorisationRequest } from '../api/request'

export class mainAsyncActions {
    static appSettings = asyncActionCreator<IAppSettingsRequest, ISettingsInformation, Error> (
        'MAIN/APPSETTINGS',
        appSettingsRequest
    )
    static getTowns = asyncActionCreator<ITownsRequest, ITownsResponce, Error> (
        'MAIN/GET_TOWNS',
        townsRequest
    )
    static postSms = asyncActionCreator<ISmsAuthorisationRequest, ISmsAuthorisationResponce, Error> (
        'AUTHORISATION/POST_SMS_ON_PHONE',
        smsRequest
    )
    static authorisation = asyncActionCreator<IAuthorisationRequest, IAuthorisationResponce, Error> (
        'AUTHORISATION/AUTHORISATION',
        authorisationRequest
    )
}