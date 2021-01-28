import React, { ComponentType } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
// import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
// import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
// import { RegistrationContacts } from 'app/module/registration/view/RegistrationContacts'
import { MainPage } from 'app/module/main/view/MainPage'
import { Masters } from 'app/module/masters/view/Masters'
import { MyNotes } from 'app/module/myNotes/view/MyNotes'
import { NoteDetails } from 'app/module/myNotes/view/NoteDetails'
import { AppointmentType } from 'app/module/appointments/view/AppointmentType'
import { TimeSelect } from 'app/module/appointments/view/TimeSelect'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabbar } from 'app/system/navigation/CustomTabbar'
// import { SelectService } from 'app/module/appointments/view/SelectService'

// import { ImageStyle, ImageURISource } from 'react-native'
// import { ImageRepository, windowWidth } from '../helpers'
import { Сontacts } from 'app/module/main/view/Сontacts'
// import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
// import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
// import { RegistrationContacts } from 'app/module/registration/view/RegistrationContacts'
// import { EnterPhoneNumberSingInRegistration } from 'app/module/login/view/EnterPhoneNumberSingInRegistration'
// import { PasswordRegistration } from 'app/module/login/view/PasswordRegistration'
import { Host } from 'react-native-portalize'

export interface IListTabBar {
  name: string
  component: ComponentType<any>
  routeName: string
}

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MyNotesStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ListPages.MyNotes} component={MyNotes} />
      <Stack.Screen name={ListPages.NoteDetails} component={NoteDetails} />
    </Stack.Navigator>
  )
}

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
    component: MyNotesStack,
    routeName: 'AppointmentType',
  },
  {
    name: 'Контакты',
    component: Сontacts,
    routeName: 'Сontacts',
  },
]

const TabNavigator = () => {
  return (
    <Host>
      <Tab.Navigator
        tabBar={props => <CustomTabbar tabs={listTabBar} {...props} />}
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
    </Host>
  )
}

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ListPages.MainPage} component={TabNavigator} />
      {/* <Stack.Screen name={ListPages.ChooseCity} component={ChooseCity} />
      <Stack.Screen name={ListPages.EnterPhoneNumber} component={PasswordSingIn} />
      <Stack.Screen name={ListPages.PasswordSingIn} component={PasswordSingIn} />
       <Stack.Screen name={ListPages.AppointmentType} component={AppointmentType} />  
       <Stack.Screen name={ListPages.RegistrationContacts} component={RegistrationContacts} />
      <Stack.Screen name={ListPages.SelectService} component={SelectService} />  */}
      <Stack.Screen name={ListPages.TimeSelect} component={TimeSelect} />
    </Stack.Navigator>
  )
}
