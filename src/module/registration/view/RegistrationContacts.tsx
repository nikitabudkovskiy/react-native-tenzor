import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  ImageRepository,
  styleSheetFlatten,
  isLongDevices,
  windowHeight,
} from 'app/system/helpers'
import { TextInputMask } from 'react-native-masked-text'
import { CommonInput } from 'app/module/global/view/CommonInput'
import { CommonButton } from 'app/module/global/view/CommonButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface IProps {

}

interface IState {
  birthDate: string,
  genderSelected: string
  correctBirthDate: boolean
  correctName: boolean
  name: string
  termsOfUseChecked: boolean
  isInputTouched: boolean
}

export class RegistrationContacts extends PureComponent<IProps, IState> {
  state = {
    birthDate: '',
    genderSelected: '',
    correctBirthDate: true,
    name: '',
    correctName: true,
    termsOfUseChecked: false,
    isInputTouched: false,
  }

  handleChangeBirthDate = (birthDate: string) => {
    this.setState({ birthDate })
  }

  handleNameInput = (name: string) => {
    this.setState({ name })
  }

  handleSelectedGender = (sex: string) => {
    if (this.state.genderSelected === sex) {
      this.setState({ genderSelected: '' })
      return
    }
    this.setState({ genderSelected: sex })
  }

  checkBirthDate = () => {
    if (!this.state.isInputTouched) {
      this.setState({ isInputTouched: true })
    }
    this.setState({ 
      correctBirthDate: /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/
        .test(this.state.birthDate)
    })
  }

  checkName = () => {
    if (!this.state.isInputTouched) {
      this.setState({ isInputTouched: true })
    }
    this.setState({ 
      correctName: /^[а-яА-Я\-]+$/.test(this.state.name) 
    })
  }

  checkTermsOfUse = () => {
    this.setState({ 
      termsOfUseChecked: !this.state.termsOfUseChecked 
    })
  }

  render() {

    const birthDateInputFlatten = styleSheetFlatten([
      styles.birthDateContainer,
      {
        borderColor: this.state.correctBirthDate ?
          Color.gray :
          Color.electricOrange
      }
    ])

    const nameInputFlatten = styleSheetFlatten([
      {
        borderColor: this.state.correctName ?
          Color.gray :
          Color.electricOrange
      }
    ])

    const contentTitle = styleSheetFlatten([
      styles.contentTitle,
      {
        paddingTop: isLongDevices ? 
        windowWidth * 0.12 : 
        windowWidth * 0.04,
      }
    ])

    return (
      <KeyboardAwareScrollView 
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
        <Text style={contentTitle}>
          Укажите контакты
        </Text>
        <Text style={styles.contentDescription}>
          Контакты нужны нам, чтобы мы узнали вас.{'\n'}
          Заполняется только один раз
        </Text>
        <View >
          <CommonInput
            label='Ваше имя'
            containerStyle={styles.inputContainer}
            onChangeText={this.handleNameInput}
            onBlur={this.checkName}
            inputStyle={nameInputFlatten}
          />
          <View style={birthDateInputFlatten}>
            <Text style={styles.birthDateInputLabel}>
              Дата рождения
            </Text>
            <TextInputMask
              type={'datetime'}
              options={{
                format: 'DD.MM.YYYY'
              }}
              keyboardType='numeric'
              value={this.state.birthDate}
              onChangeText={this.handleChangeBirthDate}
              style={styles.birthDateInput}
              placeholder='ДД.ММ.ГГГГ'
              onBlur={this.checkBirthDate}
            />
          </View>
        </View>
        <View>
          <Text style={styles.genderChoiceTitle}>
            Ваш пол
          </Text>
          <TouchableOpacity
            onPress={this.handleSelectedGender.bind(this, 'male')}
            style={styles.genderChoiceContainer}>
            <View style={styles.radioBox}>
              {
                this.state.genderSelected == 'male'
                ? (
                    <View style={styles.selectedGender}>
                    </View>
                  ) : undefined
              }
            </View>
            <Text style={styles.genderTitle}>
              Мужской
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleSelectedGender.bind(this, 'female')}
            style={styles.genderChoiceContainer}>
            <View style={styles.radioBox}>
              {
                this.state.genderSelected == 'female' 
                ? (
                <View style={styles.selectedGender}>
                </View>
                ): undefined
              }
            </View>
            <Text style={styles.genderTitle}>
              Женский
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.termsOfUseContainer}>
          <TouchableOpacity
            style={styles.checkBox}
            onPress={this.checkTermsOfUse}
          >
            {
              this.state.termsOfUseChecked == true?
              <Image 
                source={ImageRepository.contactsCheckMark}
                style={styles.contactsCheckMark}
              />
              : (
                <View style={styles.contactsCheckMarkEndCap} />
              )
            }
          </TouchableOpacity>
          <Text style={styles.termsOfUseDescription}>
            Согласен у условиями {''}
            <Text style={styles.termsOfUseDescriptionUnderline}>
              Пользовательского {'\n'}соглашения
            </Text>
          </Text>
        </View>
        </View>
        <View style={styles.fininshButtonContainer}>
          <CommonButton 
            title='ЗАВЕРШИТЬ'
            styleButton={styles.fininshButton}
            disabled={!((this.state.correctBirthDate && this.state.isInputTouched) && (this.state.correctName && this.state.isInputTouched))}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = styleSheetCreate({
  contentTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.05,
  }),
  container: style.view({
    paddingHorizontal: windowWidth * 0.04,
    backgroundColor: Color.white,
    flex: 1,
  }),
  content: style.view({
    height: windowHeight * 0.92,
  }),
  contentDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    paddingTop: windowWidth * 0.08,
    color: Color.gray,
  }),
  inputContainer: style.view({
    marginTop: windowWidth * 0.064
  }),
  birthDateInput: style.view({
    height: '100%',
  }),
  birthDateInputLabel: style.text({
    position: 'absolute',
    top: windowWidth * -0.023,
    left: windowWidth * 0.04,
    backgroundColor: Color.white,
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowWidth * 0.03,
    color: Color.gray
  }),
  birthDateContainer: style.view({
    marginTop: windowWidth * 0.08,
    width: windowWidth * 0.914,
    height: windowWidth * 0.133,
    borderWidth: windowWidth * 0.0026,
    borderRadius: windowWidth * 0.032,
    paddingHorizontal: windowWidth * 0.04,
    borderColor: Color.gray
  }),
  radioBox: style.view({
    borderWidth: windowWidth * 0.005,
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.026,
    marginRight: windowWidth * 0.032,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  genderChoiceContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037
  }),
  genderChoiceTitle: style.text({
    paddingTop: windowWidth * 0.037,
    fontSize: windowWidth * 0.034,
    color: Color.gray
  }),
  genderTitle: style.text({
    fontSize: windowWidth * 0.036,
  }),
  selectedGender: style.view({
    width: windowWidth * 0.021,
    height: windowWidth * 0.021,
    borderRadius: windowWidth * 0.266,
    backgroundColor: Color.black,
  }),
  checkBox: style.view({
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    backgroundColor: Color.black,
    borderRadius: windowWidth * 0.005,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  termsOfUseContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.12,
  }),
  termsOfUseDescription: style.text({
    paddingLeft: windowWidth * 0.032,
    fontSize: windowWidth * 0.036,
    fontFamily: fonts.robotoRegular
  }),
  termsOfUseDescriptionUnderline: style.text({
    textDecorationLine: 'underline'
  }),
  contactsCheckMark: style.image({
    width: windowWidth * 0.035,
    height: windowWidth * 0.026,
  }),
  contactsCheckMarkEndCap: style.view({
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    backgroundColor: Color.white,
  }), 
  fininshButtonContainer: style.view({
    alignItems: 'center',
  }),
  fininshButton: style.view({
    width: windowWidth * 0.92, 
  }),
})