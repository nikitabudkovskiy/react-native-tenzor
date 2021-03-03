interface IGetMastersListRequest {
    pointId: Number
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

