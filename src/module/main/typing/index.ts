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
    orgs : [
        {
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
            payments: [
                {
                    id: Number
                    name: string
                }
            ]
            deleveries: [
                {
                    id: Number
                    name: string
                }
            ]
        }
    ]
}