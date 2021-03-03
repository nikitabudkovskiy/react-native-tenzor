import { EListLanguage } from 'app/system/helpers'

export interface ISystemState {
  language: EListLanguage
  userCity: ITownsResponce
}

export const SystemInitialState: ISystemState = {
  language: EListLanguage.ru,
  userCity: {
    id: -1,
    title: '',
  }
}