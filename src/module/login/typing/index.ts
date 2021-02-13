interface IEnterPhoneInfromation {
  request_id: string
  phone: string
}

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
  send_sms?: number
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

interface IChangeUserDataRequest {
  name: string
  email: string,
  bithday: string
  gender: number
}

interface IChangeUserDataResponce {
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