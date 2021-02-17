import { asyncActionCreator } from 'app/system/store/actionCreator'
import { MainRequest } from '../api/request'

export class MainAsyncActions {
    static getTownsList = asyncActionCreator<ITownsRequest, ITownsResponce, Error>(
        'MAIN/GET_TOWNS_LIST',
        MainRequest.townsRequest
    )
    
    static getOrganisations = asyncActionCreator<IGetOrganisationsRequest, IGetOrganisationsResponce, Error>(
        'MAIN/GET_ORGANISATIONS_LIST',
        MainRequest.getOrganisations
    )

}