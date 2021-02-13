import { actionCreator } from 'app/system/store/actionCreator'
import { EListLanguage} from 'app/system/helpers'

export class LoginAction {
  static logoutAccount = actionCreator('LOGIN/LOGOUT_ACCOUNT')
}
