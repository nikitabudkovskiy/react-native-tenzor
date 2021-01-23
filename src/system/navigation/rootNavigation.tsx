import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages  } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
import { MainPage } from 'app/module/main/view/MainPage'
import { RegistrationContacts } from 'app/module/registration/view/RegistrationContacts'
import { Masters } from 'app/module/masters/view/Masters'
import { DidntLike } from 'app/module/notes/view/DidntLike'
import { AppointmentType } from 'app/module/appointments/view/AppointmentType'

const Stack = createStackNavigator()

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ListPages.MainPage} component={MainPage} />
      {/* <Stack.Screen name={ListPages.ChooseCity} component={ChooseCity} />
      <Stack.Screen name={ListPages.EnterPhoneNumber} component={EnterPhoneNumberSingIn} />
      <Stack.Screen name={ListPages.PasswordSingIn} component={PasswordSingIn} />
      <Stack.Screen name={ListPages.AppointmentType} component={AppointmentType} /> 
      <Stack.Screen name={ListPages.RegistrationContacts} component={RegistrationContacts} /> */}
      
      
    </Stack.Navigator>
  )
}
