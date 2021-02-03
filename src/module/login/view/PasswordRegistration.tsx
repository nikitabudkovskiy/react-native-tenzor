import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native'
import {
  styleSheetCreate,
  fonts,
  Color,
  style,
  windowWidth,
  ImageRepository,
  keyboardShowEvent,
  keyboardHideEvent,
  styleSheetFlatten,
  isLongDevices,
  platform,
} from 'app/system/helpers'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useState, useEffect, useRef, } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'

const CELL_COUNT = 6

interface IProps {
  navigation: StackNavigationProp<any>
}

export const PasswordRegistration = ({ navigation }: IProps) => {
  let intervalId: any = useRef(null)
  const isInitialMount = useRef(true)

  const [IsResending, setIsResending] = useState<boolean>(false)
  const [isUserForgotPassword, setIsUserForgotPassword] = useState<boolean>(false)
  const [timeSendingCode, setTimeSendingCode] = useState<number>(15)

  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false)
  const [heightKeybord, setHeightKeybord] = useState<number>(0)
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  useEffect(() => {
    Keyboard.addListener(keyboardShowEvent, (event) => {
      setIsKeyboardShow(true)
      setHeightKeybord(event.endCoordinates.height)
    })

    Keyboard.addListener(keyboardHideEvent, () => {
      setIsKeyboardShow(true)
      setHeightKeybord(0)
    })
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (!timeSendingCode) {
        clearInterval(intervalId.current)
        setTimeSendingCode(5)
        setIsUserForgotPassword(false)
      }
      if (!IsResending) {
        setIsResending(true)
      }
    }

  }, [timeSendingCode])

  const goBackHandler = ():void => {
    navigation.goBack()
  }

  const forgotPasswordHandler = (): void => {
    setIsUserForgotPassword(true)
    intervalId.current = setInterval(() => {
      setTimeSendingCode(timeSendingCode => timeSendingCode - 1)
    }, 1000)
  }

  const goToRegistrationContacts = (): void => {
    navigation.navigate(ListPages.RegistrationContacts)
  }

  const forgetPasswordButton = styleSheetFlatten([
    styles.forgetPasswordButton,
    {
      bottom: isKeyboardShow 
        ? platform.isAndroid 
          ? windowWidth * 0.06  
          : windowWidth * 0.06 + heightKeybord 
        : windowWidth * 0.06
    }
  ])

  const backArrowButton = styleSheetFlatten([
    styles.backArrowButton,
    {
      marginTop: isLongDevices ? windowWidth * 0.09 : windowWidth * 0.03,
    }
  ])

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.root}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={goBackHandler}
        hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
        style={backArrowButton}
      >
        <Image
          source={ImageRepository.contactsArrowBack}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        Введите код из СМС
      </Text>
      <Text style={styles.description}>
        Мы отправили СМС с кодом на номер +7(925)123-45-67
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {
                symbol || (isFocused
                  ? <Cursor />
                  : null)
              }
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={forgetPasswordButton}
        onPress={forgotPasswordHandler}
        onLongPress={goToRegistrationContacts}
        disabled={isUserForgotPassword}
      >
        {
          !isUserForgotPassword && !IsResending
            ? (
              <Text style={styles.forgetPasswordTitle}>
                Я не помню пароль
              </Text>
            ) : !isUserForgotPassword && IsResending
              ? (
                <Text style={styles.forgetPasswordTitle}>
                  Отправить новый код
                </Text>
              )
              : (
                <Text style={styles.forgetPasswordTitleSendCode}>
                  Отправка нового кода через <Text style={styles.forgetPasswordTitleSendCodeTime}>{timeSendingCode}</Text> сек
                </Text>
              )
        }
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = styleSheetCreate({
  root: style.view({
    paddingHorizontal: windowWidth * 0.12,
    alignItems: 'center',
    height: '100%'
  }),
  title: style.text({
    textAlign: 'center',
    fontSize: windowWidth * 0.064,
    fontFamily: fonts.robotoBold,
    paddingTop: windowWidth * 0.17
  }),
  description: style.text({
    fontSize: windowWidth * 0.048,
    fontFamily: fonts.robotoRegular,
    paddingTop: windowWidth * 0.04
  }),
  cellRoot: style.view({
    marginTop: windowWidth * 0.09,
    width: windowWidth * 0.1,
    height: windowWidth * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.gray100,
    borderBottomWidth: windowWidth * 0.005,
    borderRadius: windowWidth * 0.002,
    marginHorizontal: windowWidth * 0.021,
  }),
  cellText: style.text({
    color: Color.black,
    fontSize: windowWidth * 0.064,
    textAlign: 'center',
  }),
  focusCell: style.view({
    borderBottomColor: Color.black,
    borderBottomWidth: windowWidth * 0.005,
  }),
  forgetPasswordButton: style.view({
    position: 'absolute',
    bottom: windowWidth * 0.06,
  }),
  forgetPasswordTitle: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.electricOrange,
  }),
  forgetPasswordTitleSendCode: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.gray,
  }),
  forgetPasswordTitleSendCodeTime: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.04,
    color: Color.black,
  }),
  backArrowButton: style.view({
    paddingTop: windowWidth * 0.04,
    alignSelf: 'flex-start',
    marginLeft: windowWidth * - 0.05
  }),
  backArrow: style.image({
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
  }),
})