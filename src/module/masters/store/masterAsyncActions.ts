import { asyncActionCreator } from 'app/system/store/actionCreator'
import { MastersRequest } from '../api/MasterRequest'

export class MastersAsyncActions {
    static getMastersList = asyncActionCreator<IGetMastersListRequest, IGetMastersListResponce, Error>(
        'MASTERS/GET_MASTERS_LIST',
        MastersRequest.getMastersList
    )
}