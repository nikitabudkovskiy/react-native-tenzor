import React, { ComponentType } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
import { MainPage } from 'app/module/main/view/MainPage'
import { Masters } from 'app/module/masters/view/Masters'
import { MyNotes } from 'app/module/myNotes/view/MyNotes'
import { NoteDetails } from 'app/module/myNotes/view/NoteDetails'
import { AppointmentType } from 'app/module/appointments/view/AppointmentType'
import { TimeSelect } from 'app/module/appointments/view/TimeSelect'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomTabbar } from 'app/system/navigation/CustomTabbar'
import { Host } from 'react-native-portalize'
import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
import { ChooseSalon } from 'app/module/appointments/view/ChooseSalon'
import { SelectService } from 'app/module/appointments/view/SelectService'
import { ChooseMaster } from 'app/module/appointments/view/ChooseMaster'
import { EnterPhoneNumberSingInRegistration } from 'app/module/login/view/EnterPhoneNumberSingInRegistration'
import { PasswordRegistration } from 'app/module/login/view/PasswordRegistration'
import { RegistrationContacts } from 'app/module/registration/view/RegistrationContacts'
import { Сontacts } from 'app/module/main/view/Сontacts'

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

const MainTabNavigator = () => {
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
      {/* <Stack.Screen name={ListPages.ChooseCity} component={ChooseCity} /> */}
      <Stack.Screen name={ListPages.MainTab} component={MainTabNavigator} />
      <Stack.Screen name={ListPages.ChooseSalon} component={ChooseSalon} />
      <Stack.Screen name={ListPages.SelectService} component={SelectService} /> 
      <Stack.Screen name={ListPages.ChooseMaster} component={ChooseMaster} /> 
      <Stack.Screen name={ListPages.TimeSelect} component={TimeSelect} />
      <Stack.Screen name={ListPages.EnterPhoneNumberSingIn} component={EnterPhoneNumberSingIn} />
      <Stack.Screen name={ListPages.PasswordSingIn} component={PasswordSingIn} />
      <Stack.Screen name={ListPages.EnterPhoneNumberSingInRegistration} component={EnterPhoneNumberSingInRegistration} />
      <Stack.Screen name={ListPages.PasswordRegistration} component={PasswordRegistration} />
      <Stack.Screen name={ListPages.RegistrationContacts} component={RegistrationContacts} />    
    </Stack.Navigator>
  )
}
