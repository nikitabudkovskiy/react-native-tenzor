import { ApiService } from 'app/system/api'

export class MyNotesRequest {
    static setOrderRating = (data: ISetOderRatingRequest): Promise<ISetOrderRartingResponce> => {
        return ApiService.post(
            'http://localmodx.appsj.su/set-order-rating-v2.json',
            { data }
        )
    }

    static getOrdersHistory = (data: IGetOrdersHistoryRequest): Promise<IGetOrdersHistoryResponce> => {
        return ApiService.post(
            'http://tbeauteam.appsj.su/getordershistory.json', {  }, {
                headers: {
                    Authorization: 'Bearer 2db1160cc53c57b68ff3bc63f67448de',
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}