import { asyncActionCreator } from 'app/system/store/actionCreator'
import { MastersRequest } from '../api/MasterRequest'

export class MastersAsyncActions {
    
    static getMastersList = asyncActionCreator<IGetMastersListRequest, IGetMastersListResponce, Error>(
        'MASTERS/GET_MASTERS_LIST',
        MastersRequest.getMastersList
    )

    static getWorkingHoursMaster = asyncActionCreator<IGetWorkingHoursMasterRequest, IGetWorkingHoursMasterResponce, Error>(
        'MASTERS/GET_WORKING_HOURCE_MASTER',
        MastersRequest.getWorkingHoursMaster
    )

    static getServices = asyncActionCreator<IGetServicesRequest, IGetServicesResponce, Error>(
        'MASTERS/GET_SERVICES',
        MastersRequest.getServices
    )
}