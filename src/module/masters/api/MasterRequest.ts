import { ApiService } from 'app/system/api'

export class MastersRequest {

    static getMastersList = (params: IGetMastersListRequest): Promise<IGetMastersListResponce> => {
        return ApiService.get(`http://tbeauteam.appsj.su/api/sbis/masterlist?point_id=${170}`)
    }

    static getWorkingHoursMaster = (params: IGetWorkingHoursMasterRequest): Promise<IGetWorkingHoursMasterResponce> => {
        return ApiService.get(`http://tbeauteam.appsj.su/api/sbis/master-calendar?point_id=${170}&master_id=${params.master_id}`)
    }

    static getServices = (params: IGetServicesRequest): Promise<IGetServicesResponce> => {
        return ApiService.get(`http://tbeauteam.appsj.su/api/sbis/nomenclature?point_id=${170}`)
    }

    
}