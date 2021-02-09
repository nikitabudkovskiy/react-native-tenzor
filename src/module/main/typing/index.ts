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

// interface ISmsAuthorisationRequest {
//     phone: string,
//     email: string,
// }

// interface ISmsAuthorisationResponce {
//     requestId: string
// }

// interface IAuthorisationRequest {
//     requestId: string
//     code: string
// }

// interface IAuthorisationResponce {
//     data: []
// }
interface IGetRequestSmsNumberRequest {
  phone: string
  email?: string
}
interface IGetRequestSmsNumberResponce {
  request_id: string
}

interface IGetCodeVerificationRequest {
    request_id: string
    code: string
}
interface IGetCodeVerificationResponce {
  data: [
      {
        token: string,
        user: {
          name: string
          email: string
          gender: string
          phone: string
          bonus: string
          birthday: string
          referal: {
            code: string
            my_bonus: string
            friend_bonus: string
          }
        }
      }
    ]

}