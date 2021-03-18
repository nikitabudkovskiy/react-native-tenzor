interface ITownsRequest {

}

interface ITownsResponce {
    id: number
    title: string
}

interface IGetOrganisationsRequest {
    id: number
}

interface IGetOrganisationsResponce {
    orgs: IOrganisation[]
}

interface IOrganisation {
    GPS: {
        latitude: string
        longitude: string
    }
    title: string
    id: number
    requisites: string
    deliveryTerminalId: string
    img: string
    address: string
    description: string
    comment: string
    phone: string
    worktime: string
    payments: IOrganisationPayment[]
    deleveries: IOrganisationDeleveries[]
}

interface IOrganisationPayment {
    id: number
    name: string
}

interface IOrganisationDeleveries {
    id: number
    name: string
}

interface ICreateRecordRequest {

}

interface ICreateRecordResponce {

}