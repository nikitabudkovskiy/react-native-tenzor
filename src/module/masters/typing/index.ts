interface IGetMastersListRequest {
    pointId: Number
}

interface IGetMastersListResponce {
    masters: [
        {
            id: Number
            name: string
            role: string
            image: string
        }
    ],
    outcome: {
        hasMore: boolean
    }
}