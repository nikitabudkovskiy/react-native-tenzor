import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages  } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
import { EnterPhoneNumberSingIn } from 'app/module/login/view/EnterPhoneNumberSingIn'
import { PasswordSingIn } from 'app/module/login/view/PasswordSingIn'
import { MainPage } from 'app/module/main/view/MainPage'
import { ForgotPassword } from 'app/module/login/view/ForgotPasswordSingIn'

const Stack = createStackNavigator()

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode={undefined}>
      <Stack.Screen name={ListPages.EnterPhoneNumber} component={EnterPhoneNumberSingIn} />
      <Stack.Screen name={ListPages.PasswordSingIn} component={PasswordSingIn} />
  
      {/* <Stack.Screen name={ListPages.MainPage} component={MainPage} /> */}
    </Stack.Navigator>
  )
}
