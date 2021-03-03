import { asyncActionCreator } from 'app/system/store/actionCreator'
import { MyNotesRequest } from '../api/MyNotesRequest'

export class MyNotesAsyncActions {

    static setOrderRating = asyncActionCreator<ISetOderRatingRequest, ISetOrderRartingResponce, Error>(
        'MY_NOTES/SET_ORDER_RAITING',
        MyNotesRequest.setOrderRating
    )

    static getOrdersHistory = asyncActionCreator<IGetOrdersHistoryRequest, IGetOrdersHistoryResponce, Error>(
        'MY_NOTES/GET_ORDERS_HISTORY',
        MyNotesRequest.getOrdersHistory
    )

}