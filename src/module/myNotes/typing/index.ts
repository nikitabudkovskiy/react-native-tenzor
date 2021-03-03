interface ISetOrderRartingResponce {
    
}

interface ISetOderRatingRequest {
    general_rating: Number
    comment: string
}

interface IHistoryOrder {
    cost: number
    order_id: number
    status_id: number
    status_color: string
    status_name: string
    createdon: string
    street: string
    city: string
}

interface IGetOrdersHistoryRequest {
    order_id?: number
}

interface IGetOrdersHistoryResponce {
    orders: IHistoryOrder[]
}