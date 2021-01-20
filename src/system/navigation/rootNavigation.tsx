import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ListPages  } from 'app/system/navigation'
import { ChooseCity } from 'app/module/main/view/ChooseCity'
import { Login } from 'app/module/login/view/Login'
import { Password } from 'app/module/login/view/Password'

const Stack = createStackNavigator()

export const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode={undefined}>
      {/* <Stack.Screen name={ListPages.Login} component={Login} /> */}
      <Stack.Screen name={ListPages.Password} component={Password} />
    </Stack.Navigator>
  )
}
