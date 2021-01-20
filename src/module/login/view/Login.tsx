import React, { PureComponent } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
} from 'app/system/helpers'
import { TextInputMask } from 'react-native-masked-text'
import { CommonButton } from 'app/module/global/view/CommonButton'

interface IState {
  phoneNumber: string
}

interface IProps {
  navigation: any
}

export class Login extends PureComponent<IProps, IState> {
  state = {
    phoneNumber: '',
  }

  handleChangeText = (phoneNumber: string) => {
    this.setState({ phoneNumber }, () => {console.log(phoneNumber.length)})
  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.enterPhoneTitle}>
          Введите номер {'\n'} телефона
        </Text>
        <View style={styles. phoneInputContainer}>
          <TextInputMask
            type="custom"
            options={{
              mask: '+7 (999) 999-99-99'
            }}
            // placeholderTextColor={Color.sonicSilver}
            placeholder='+7 (925)123-45-67  '
            style={styles.numberInputStyle}
            value={this.state.phoneNumber}
            onChangeText={this.handleChangeText}

            keyboardType="numeric"
          />
        </View>
        <CommonButton
          title='ДАЛЕЕ'
          styleButton={styles.continueButton}
          disabled={this.state.phoneNumber.length == 18 ? false : true}
          onPress={this.props.navigation.navigate('Password')}
          
         />
      </View>
    )
  }
}

const styles = styleSheetCreate({
  content: style.view({
    alignItems: 'center',
    height: '100%',
    backgroundColor: Color.white,
  }),
  phoneInputContainer: style.view({
    borderWidth: windowWidth * 0.0026,
    borderColor: Color.gray100,
    width: windowWidth * 0.76,
    height: windowWidth * 0.13,
    alignItems: 'center',
    borderRadius: windowWidth * 0.04,
    marginTop: windowWidth * 0.106,
  }),
  enterPhoneTitle: style.text({
    textAlign: 'center',
    paddingTop: windowWidth * 0.27,
    fontSize: windowWidth * 0.064,
    fontFamily: fonts.robotoBold
  }),
  numberInputStyle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.136,
  }),
  continueButton: style.view({
    position: 'absolute',
    bottom: windowWidth * 0.021,
    width: windowWidth * 0.914,
  }),
})