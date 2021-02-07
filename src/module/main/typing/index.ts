interface IAppSettingsRequest {
    appStateStatus: boolean
    appStateDisableText: string
    appCashBackStatus: boolean
    appPromocodeStatus: boolean
    appReferalStatus: boolean
    appVerApi: string
}

interface ISettingsInformation {

}

interface ITownsRequest {
    
}

interface ITownsResponce {
    towns: ITown[]
}

interface ITown {
    title: string
    id: Number
}

interface ISmsAuthorisationRequest {
    phone: string,
    email: string,
}

interface ISmsAuthorisationResponce {
    requestId: string
}

interface IAuthorisationRequest {
    requestId: string
    code: string
}

interface IAuthorisationResponce {
    data: []
}