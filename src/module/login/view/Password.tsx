import React, { PureComponent } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  styleSheetCreate,
  fonts,
  Color,
  style,
} from 'app/system/helpers'


interface IState {

}

interface IProps {

}

export class Password extends PureComponent<IState, IProps> {
  render() {
    return (
      <View style={styles.content}>
        <Text>
          Укажите пароль для +7(925)123-45-67
        </Text>
        <Text>
          Пароль состоит из 6 цифр
        </Text>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  content: style.view({
    alignItems: 'center'
  })
})