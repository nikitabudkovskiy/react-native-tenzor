import React, { PureComponent } from 'react'
import {
  Text,
  Keyboard,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  keyboardShowEvent,
  keyboardHideEvent,
  styleSheetFlatten,
} from 'app/system/helpers'
import { TextInputMask } from 'react-native-masked-text'
import { CommonButton } from 'app/module/global/view/CommonButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack'

interface IState {
  phoneNumber: string
  isKeyboardShow: boolean
  heightKeybord: number
}

interface IProps {
  navigation: StackNavigationProp<any>
}

export class EnterPhoneNumberSingInRegistration extends PureComponent<IProps, IState> {

  state = {
    phoneNumber: '',
    isKeyboardShow: false,
    heightKeybord: 0,
  }

  componentDidMount(): void {
    Keyboard.addListener(keyboardShowEvent, (event) => {
      this.setState({ 
        isKeyboardShow: true, 
        heightKeybord: event.endCoordinates.height  
      })
    })
    Keyboard.addListener(keyboardHideEvent, () => {
      this.setState({ 
        isKeyboardShow: false, 
        heightKeybord: 0,
      })
    })
  }

  componentWillUnmount(): void {
    // Keyboard.removeAllListeners(keyboardShowEvent)
    // Keyboard.removeAllListeners(keyboardHideEvent)
  }

  handleChangeText = (phoneNumber: string) => {
    this.setState({ phoneNumber })
  }

  goToNextPassword = (): void => {
    // this.props.navigation.push(ListPages.SingInPassword)
  }

  render() {

    const continueButton = styleSheetFlatten([
      styles.continueButton,
      {
        bottom: this.state.isKeyboardShow 
          ? windowWidth * 0.06 + this.state.heightKeybord 
          : windowWidth * 0.06
      }
    ])

    return (
      <KeyboardAwareScrollView 
         contentContainerStyle={styles.content}
         keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.enterPhoneTitle}>
          Введите номер{'\n'}телефона для заказа
        </Text> 
        <TextInputMask
          type="custom"
          options={{
            mask: '+7 (999) 999-99-99'
          }}
          placeholderTextColor={Color.gray}
          placeholder='+7 (925)123-45-67  '
          style={styles.numberInputStyle}
          value={this.state.phoneNumber}
          onChangeText={this.handleChangeText}
          keyboardType="numeric"
        />
        <CommonButton
          title='ДАЛЕЕ'
          styleButton={continueButton}
          disabled={!(this.state.phoneNumber.length === 18)}
          onPress={this.goToNextPassword}
         />
      </KeyboardAwareScrollView>
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
  }),
  enterPhoneTitle: style.text({
    textAlign: 'center',
    paddingTop: windowWidth * 0.17,
    fontSize: windowWidth * 0.064,
    fontFamily: fonts.robotoBold
  }),
  numberInputStyle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.136,
    textAlign: 'center',
    borderWidth: windowWidth * 0.0026,
    borderColor: Color.gray100,
    width: windowWidth * 0.76,
    height: windowWidth * 0.13,
    alignItems: 'center',
    borderRadius: windowWidth * 0.04,
    marginTop: windowWidth * 0.106,
  }),
  continueButton: style.view({
    position: 'absolute',
    width: windowWidth * 0.914,
  }),
})