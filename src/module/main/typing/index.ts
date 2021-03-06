interface ITownsRequest {

}

interface ITownsResponce {
    id: Number
    title: string
}

interface IGetOrganisationsRequest {
    id: Number
}

interface IGetOrganisationsResponce {
    orgs : IOrganisation[]
}

interface IOrganisation {
    title: string
    id: Number
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