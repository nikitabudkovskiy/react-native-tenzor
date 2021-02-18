import { ApiService } from 'app/system/api'

export class MastersRequest {
    static getMastersList = (params: IGetMastersListRequest): Promise<IGetMastersListResponce> => {
        return ApiService.get(
            'https://virtserver.swaggerhub.com/SABY/CommonRetailAPI/0.19.510/master/list',
            { params }
        )
    }
}