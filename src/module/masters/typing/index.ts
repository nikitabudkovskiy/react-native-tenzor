interface IGetMastersListRequest {
    point_id: number
}

interface IMasters {
    id: number
    name: string
    role: string
    photo: string  
}

interface IGetMastersListResponce {
    masters: IMasters[]
    outcome: {
        hasMore: boolean
    }
}

interface IGetWorkingHoursMasterRequest {
    point_id: number
    master_id: number
}

interface IGetWorkingHoursMasterResponce {
    dates: any
}

interface IGetServicesRequest {
    point_id: number
}

interface IGetServicesResponce {

}

