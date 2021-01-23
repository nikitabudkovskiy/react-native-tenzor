import React, { ComponentType } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages  } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
import { MainPage } from 'app/module/main/view/MainPage'
import { RegistrationContacts } from 'app/module/registration/view/RegistrationContacts'
import { Masters } from 'app/module/masters/view/Masters'
import { AppointmentType } from 'app/module/appointments/view/AppointmentType'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabbar } from 'app/system/navigation/CustomTabbar'
import { SelectService } from 'app/module/appointments/view/SelectService'
import { ImageStyle, ImageURISource } from 'react-native'
import { ImageRepository, windowWidth } from '../helpers'

export interface IListTabBar {
  name: string
  component: ComponentType<any>
  routeName: string
}

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const listTabBar: Array<IListTabBar> = [
  {
    name: 'Профиль',
    component: MainPage,
    routeName: 'MainPage',
  },
  {
    name: 'Мастеры',
    component: Masters,
    routeName: 'Masters',
  },
  {
    name: 'Добавить',
    component: AppointmentType,
    routeName: 'Enroll',
  },
  {
    name: 'Мои записи',
    component: RegistrationContacts,
    routeName: 'AppointmentType',
  },
  {
    name: 'Контакты',
    component: EnterPhoneNumberSingIn,
    routeName: 'EnterPhoneNumberSingIn',
  },
]

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      tabBar={props => <CustomTabbar  tabs={listTabBar} {...props} />} 
    >
      {
          listTabBar.map((item, index) => {
            return (
              <Tab.Screen
                key={index.toString()}
                name={item.routeName}
                component={item.component}
              />
            )
          })
        }
    </Tab.Navigator>
  )
}

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name={ListPages.MainPage} component={TabNavigator} /> */}
      <Stack.Screen name={ListPages.ChooseCity} component={ChooseCity} />
      {/* <Stack.Screen name={ListPages.EnterPhoneNumber} component={EnterPhoneNumberSingIn} />
      <Stack.Screen name={ListPages.PasswordSingIn} component={PasswordSingIn} />
      <Stack.Screen name={ListPages.AppointmentType} component={AppointmentType} />  */}
      {/* <Stack.Screen name={ListPages.RegistrationContacts} component={RegistrationContacts} /> */}
      {/* <Stack.Screen name={ListPages.SelectService} component={SelectService} /> */}
      
      
    </Stack.Navigator>
  )
}
