import { ApiService } from 'app/system/api'

export class MastersRequest {
    static getMastersList = (params: IGetMastersListRequest): Promise<IGetMastersListResponce> => {
        return ApiService.get(
            'http://tbeauteam.appsj.su/api/sbis/masterlist?point_id=170',
            { params }
        )
    }
}