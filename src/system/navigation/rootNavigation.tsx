import React, { ComponentType } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages  } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
import { MainPage } from 'app/module/main/view/MainPage'
import { RegistrationContacts } from 'app/module/registration/view/RegistrationContacts'
import { Masters } from 'app/module/masters/view/Masters'
import { MyNotes } from 'app/module/myNotes/view/MyNotes'
import { NoteDetails } from 'app/module/myNotes/view/NoteDetails'
import { AppointmentType } from 'app/module/appointments/view/AppointmentType'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabbar } from 'app/system/navigation/CustomTabbar'
import { SelectService } from 'app/module/appointments/view/SelectService'

import { ImageStyle, ImageURISource } from 'react-native'
import { ImageRepository, windowWidth } from '../helpers'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export interface IListTabBar {
  name: string
  component: ComponentType<any>
  icon: ImageURISource
  style: ImageStyle
  routeName: string
}


export const listTabBar: Array<IListTabBar> = [
  {
    name: 'Профиль',
    component: MainPage,
    icon: ImageRepository.changeLocation,
    style: { width: windowWidth * 0.05, height: windowWidth * 0.05 },
    routeName: 'MainPage',
  },
  {
    name: 'Мастеры',
    component: Masters,
    icon: ImageRepository.changeLocation,
    style: { width: windowWidth * 0.05, height: windowWidth * 0.05 },
    routeName: 'Masters',
  },
  {
    name: 'Мои записи',
    component: AppointmentType,
    icon: ImageRepository.changeLocation,
    style: { width: windowWidth * 0.05, height: windowWidth * 0.05 },
    routeName: 'AppointmentType',
  },
  {
    name: 'Контакты',
    component: EnterPhoneNumberSingIn,
    icon: ImageRepository.changeLocation,
    style: { width: windowWidth * 0.05, height: windowWidth * 0.05 },
    routeName: 'EnterPhoneNumberSingIn',
  },
]


const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabbar  tabs={listTabBar} {...props} />} >
      {/* <Tab.Screen name="Test" component={MainPage} /> */}
      {
          listTabBar.map((item, index) => {
            return (
              <Tab.Screen
                key={index.toString()}
                name={item.routeName}
                component={item.component}
                options={{
                  tabBarLabel: item.routeName,
                }}
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
      {/* <Stack.Screen name={ListPages.ChooseCity} component={ChooseCity} />
      <Stack.Screen name={ListPages.EnterPhoneNumber} component={EnterPhoneNumberSingIn} />
      <Stack.Screen name={ListPages.PasswordSingIn} component={PasswordSingIn} />
      <Stack.Screen name={ListPages.AppointmentType} component={AppointmentType} />  */}
      {/* <Stack.Screen name={ListPages.RegistrationContacts} component={RegistrationContacts} /> */}
      {/* <Stack.Screen name={ListPages.SelectService} component={SelectService} /> */}
      {/* <Stack.Screen name={ListPages.MyNotes} component={MyNotes} /> */}
      {/* <Stack.Screen name={ListPages.NoteDetails} component={NoteDetails} /> */}
      <Stack.Screen name={ListPages.Masters} component={Masters} />
      
      
    </Stack.Navigator>
  )
}
