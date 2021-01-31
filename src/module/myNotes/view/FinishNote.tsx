import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
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
} from 'app/system/helpers'
import { CommonButton, CommonInput } from 'app/module/global/view'
import { Modalize } from 'react-native-modalize'
import Svg, { Path } from 'react-native-svg'

interface IProps {

}

interface IState {
  masterAssessment: number
  inputIsCorrect: boolean
  yourOpinion: string
  isInputTouched: boolean
}

const masterAssessment = [1, 2, 3, 4, 5]

export class FinishNote extends PureComponent<IProps, IState> {
  refModalize: any

  state = {
    masterAssessment: 0,
    yourOpinion: '',
    inputIsCorrect: false,
    isInputTouched: false,
  }

  onChangeYourOpinionHandler = (yourOpinion: string): void => {
    this.setState({ yourOpinion })
  }

  checkYourOpinionHandler = (): void => {
    if (!this.state.isInputTouched) {
      this.setState({ isInputTouched: true })
    }
    if (this.state.yourOpinion.length === 0) {
      this.setState({ inputIsCorrect: false })
    }
    else {
      this.setState({ inputIsCorrect: true })
    }
  }

  onChangeMasterAssessmentHandler = (masterAssessment: number): void => {
    this.setState({ masterAssessment })
  }

  openBottomSheetHandler = (): void => {
    this.refModalize.open()
  }

  refModalizeHandler = (ref: any) => this.refModalize = ref

  render() {

    const yourOpinionFlatten = styleSheetFlatten([
      {
        borderColor: this.state.inputIsCorrect
          ? Color.gray
          : Color.electricOrange
      }
    ])

    return (
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
        >
          <View style={styles.headerContainer}>
            <Image
              style={styles.finishNoteIcon}
              source={ImageRepository.finishNoteIcon}
            />
            <Text style={styles.thankTitle}>
              Спасибо за запись!
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusTitle}>
                Ожидает подтверждения
              </Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>
                Детали записи
              </Text>
              <TouchableOpacity>
                <Text style={styles.cancelTitle}>
                  Отменить запись
              </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.serviceContainer}>
              <View style={styles.service}>
                <Text style={styles.serviceTitle}>
                  Модельная/теннис стрижка
                </Text>
                <View style={styles.serviceInfoContainer}>
                  <Text style={styles.serviceTitleInfo}>
                    40 мин
                  </Text>
                  <Text style={styles.serviceTitle}>
                    350 ₽
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.serviceFullInfoContainer}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Номер записи
                </Text>
                <Text style={styles.serviceTitle}>
                  №7847
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Дата записи
                </Text>
                <Text style={styles.serviceTitle}>
                  15.01.2021 в 14:30
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Салон
                </Text>
                <Text style={styles.serviceTitle}>
                  ул. 30 лет Победы, 19А
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Телефон
                </Text>
                <Text style={styles.serviceTitle}>
                  +7(922) 692-93-00
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Специалист
                </Text>
                <Text style={styles.specialistInfo}>
                  Королева Мария{'\n'}Алексеевна{'\n'}(Парикмахер)
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Стоимость услуг
                </Text>
                <Text style={styles.priceInfo}>
                  620 ₽
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Длительность
                </Text>
                <Text style={styles.priceInfo}>
                  70 мин.
                </Text>
              </View>
            </View>
          </View>
          <CommonButton
            title='Готово'
            styleButton={styles.done}
            onPress={this.openBottomSheetHandler}
          />
        </ScrollView>
        <Modalize
          ref={this.refModalizeHandler}
          childrenStyle={styles.bottomSheetChildren}
          modalHeight={windowWidth * 1.1}
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>
              Запись №7847{"\n"}завершена
            </Text>
            <Text style={styles.bottomSheetYourMark}>
              Оцените качество обслуживания
            </Text>
            <View style={styles.bottomSheetYourMarkContainer}>
              {
                masterAssessment.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={this.onChangeMasterAssessmentHandler.bind(this, item)}
                      key={item}
                      disabled={this.state.masterAssessment === item}
                    >
                      <Svg
                        height={windowWidth * 0.1}
                        width={windowWidth * 0.1}
                      >
                        <Path
                          d="M17.9689 1.1865C18.5231 -0.193677 20.477 -0.193676 21.0312 1.1865L25.3519 11.9458L36.9197 12.7302C38.4036 12.8308 39.0074 14.689 37.866 15.6426L28.9685 23.0766L31.7972 34.3207C32.16 35.7631 30.5793 36.9115 29.3197 36.1207L19.5001 29.9558L9.68041 36.1207C8.42078 36.9115 6.84009 35.7631 7.20295 34.3207L10.0316 23.0766L1.13407 15.6426C-0.00728244 14.689 0.596486 12.8308 2.08038 12.7302L13.6483 11.9458L17.9689 1.1865Z"
                          fill={this.state.masterAssessment >= item ? Color.electricOrange : Color.gray200}
                        />
                      </Svg>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <CommonInput
              label='Что вам особенно понравилось?'
              containerStyle={styles.bottomSheetInput}
              onChangeText={this.onChangeYourOpinionHandler}
              onBlur={this.checkYourOpinionHandler}
              inputStyle={yourOpinionFlatten}
            />
            <CommonButton
              title="Готово"
              styleButton={styles.bottomSheetSendButton}
              disabled={!(this.state.inputIsCorrect && this.state.isInputTouched)}
            />
          </View>
        </Modalize>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  finishNoteIcon: style.image({
    width: windowWidth * 0.082,
    height: windowWidth * 0.064,
  }),
  thankTitle: style.text({
    fontSize: windowWidth * 0.064,
    fontWeight: 'bold',
    paddingTop: windowWidth * 0.079,
  }),
  detailsHeader: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }),
  detailsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold
  }),
  detailsContainer: style.view({
    marginTop: windowWidth * 0.042,
  }),
  cancelTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold,
    color: Color.gray
  }),
  service: style.view({
    paddingVertical: windowWidth * 0.02
  }),
  serviceContainer: style.view({
    borderTopWidth: windowWidth * 0.002,
    borderBottomWidth: windowWidth * 0.002,
    borderTopColor: Color.gray50,
    borderBottomColor: Color.gray50,
    marginTop: windowWidth * 0.042,
  }),
  serviceFullInfoContainer: style.view({
    height: windowWidth * 1.264,
    justifyContent: 'space-around'
  }),
  serviceInfo: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between'
  }),
  serviceTitleInfo: style.text({
    fontSize: windowWidth * 0.04,
    color: Color.gray600,
    fontFamily: fonts.robotoRegular
  }),
  serviceTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular
  }),
  specialistInfo: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    textAlign: 'right'
  }),
  entryСanceledButton: style.view({
    backgroundColor: Color.alizarinCrimson,
    marginVertical: windowWidth * 0.04,
  }),
  entryСanceledButtonText: style.text({
    color: Color.white,
    textTransform: 'none',
    fontFamily: fonts.robotoRegular,
  }),
  finishedRecordingButton: style.view({
    backgroundColor: Color.gray700,
    marginBottom: windowWidth * 0.04,
  }),
  finishedRecordingButtonText: style.text({
    color: Color.white,
    textTransform: 'none',
    fontFamily: fonts.robotoRegular,
  }),
  serviceInfoContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: windowWidth * 0.018
  }),
  priceInfo: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold
  }),
  container: style.view({
    height: '100%',
    backgroundColor: Color.white,
  }),
  contentContainer: style.view({
    paddingHorizontal: windowWidth * 0.042,
    marginBottom: windowWidth * 0.02,
  }),
  headerContainer: style.view({
    alignItems: 'center',
    marginTop: windowWidth * 0.069
  }),
  statusContainer: style.view({
    width: windowWidth * 0.914,
    height: windowWidth * 0.13,
    backgroundColor: Color.chineseWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.032,
    marginTop: windowWidth * 0.069
  }),
  statusTitle: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.fauxLime
  }),
  done: style.view({
    marginTop: windowWidth * 0.06,
    width: windowWidth * 0.91,
    height: windowWidth * 0.1
  }),
  bottomSheetContent: style.view({
    paddingHorizontal: windowWidth * 0.04,
    width: '100%',
    backgroundColor: Color.white,
    alignItems: 'center',

  }),
  bottomSheetText: style.text({
    color: Color.chineseBlack,
    fontSize: windowWidth * 0.058,
    textAlign: 'center',
    fontFamily: fonts.robotoBold,
    marginTop: windowWidth * 0.08,
  }),
  bottomSheetYourMark: style.text({
    color: Color.gray,
    fontSize: windowWidth * 0.035,
    textAlign: 'center',
    fontFamily: fonts.robotoBold,
    marginTop: windowWidth * 0.04,
  }),
  bottomSheetYourMarkContainer: style.text({
    flexDirection: 'row',
    marginTop: windowWidth * 0.036,
    justifyContent: 'space-between',
    width: '75%',
  }),
  bottomSheetInput: style.view({
    marginTop: windowWidth * 0.09,
    marginBottom: windowWidth * 0.3,
  }),
  bottomSheetSendButton: style.view({
    width: '100%',
  }),
})