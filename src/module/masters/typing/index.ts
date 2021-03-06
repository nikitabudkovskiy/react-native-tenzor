interface IGetMastersListRequest {
    point_id: number
}

interface IMasters {
    id: Number
    name: string
    role: string
    image: string  
}

interface IGetMastersListResponce {
    masters: IMasters[]
    outcome: {
        hasMore: boolean
    }
}

