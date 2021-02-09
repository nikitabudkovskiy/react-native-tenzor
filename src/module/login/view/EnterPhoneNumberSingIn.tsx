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
  platform,
} from 'app/system/helpers'
import { TextInputMask } from 'react-native-masked-text'
import { CommonButton } from 'app/module/global/view/CommonButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ListPages } from 'app/system/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { connectStore } from 'app/system/store/connectStore'
import { IApplicationState } from 'app/system/store/applicationState'
import { MainAsynсActions } from 'app/module/main/store/mainAsyncActions'
import { ThunkDispatch } from 'redux-thunk'

interface IStateProps {

}

interface IDispatchProps {
  getRequestSmsOnNumber(data: IGetRequestSmsNumberRequest): Promise<void>
}

interface IState {
  phoneNumber: string
  isKeyboardShow: boolean
  heightKeybord: number
}

interface IProps {
  navigation: StackNavigationProp<any>
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    isLoading: state.main.isLoading,
    error: state.main.error,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async getRequestSmsOnNumber(data) {
      await dispatch(MainAsynсActions.getRequestSmsOnNumber(data))
    },
  })
)
export class EnterPhoneNumberSingIn extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {

  state = {
    phoneNumber: '+79251234567',
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

  handleChangeText = (phoneNumber: string):void => {
    this.setState({ phoneNumber })
  }

  goToNextPasswordHandler = async (): Promise<void> => {
    // const phoneOnlyNumbers = this.state.phoneNumber.replace(/[^+\d]/g, '')
    // console.log('phoneOnlyNumbers', phoneOnlyNumbers)
    // await this.props.getRequestSmsOnNumber({
    //   phone: phoneOnlyNumbers,
    // })

    this.props.navigation.push(ListPages.PasswordSingIn)
  }

  render() {

    const continueButton = styleSheetFlatten([
      styles.continueButton,
      {
        bottom: this.state.isKeyboardShow 
          ? platform.isAndroid 
            ? windowWidth * 0.06  
            : windowWidth * 0.06 + this.state.heightKeybord 
          : windowWidth * 0.06
      }
    ])

    return (
      <KeyboardAwareScrollView 
         contentContainerStyle={styles.content}
         keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.enterPhoneTitle}>
          Введите номер{'\n'}телефона
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
          onPress={this.goToNextPasswordHandler}
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