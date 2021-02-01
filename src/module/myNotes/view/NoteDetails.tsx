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
import { StackNavigationProp } from '@react-navigation/stack'
import Modal from 'react-native-modal'
import Svg, { Path } from 'react-native-svg'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  isModalShow: boolean
  masterAssessment: number
  yourOpinion: string
  inputIsCorrect: boolean
}

const masterAssessment = [1, 2, 3, 4, 5]

export class NoteDetails extends PureComponent<IProps, IState>{
  refModalize: any

  state = {
    isModalShow: false,
    masterAssessment: 0,
    yourOpinion: '',
    inputIsCorrect: true,
  }

  onChangeMasterAssessmentHandler = (masterAssessment: number): void => {
    this.setState({ masterAssessment })
  }

  onChangeYourOpinionHandler = (yourOpinion: string): void => {
    this.setState({ yourOpinion })
  }

  checkYourOpinionHandler = (): void => {
    this.setState({ inputIsCorrect: !!this.state.yourOpinion })
  }

  openCancelRecordModalHandler = (): void => {
    this.setState({ isModalShow: true })
  }

  hideCancelRecordModalHandler = (): void => {
    this.setState({ isModalShow: false })
  }

  openBottomSheetHandler = (masterAssessment: number): void => {
    this.setState({ masterAssessment }, () =>  this.refModalize.open())
  }

  openMasterAssessmentBottomHandler = (): void => {
    this.refModalize.open()
  }

  refModalizeHandler = (ref: any) => this.refModalize = ref

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  renderBottomSheetHeader = (): JSX.Element => {
    return (
      <View style={styles.bottomSheetHeader}>
        <View style={styles.bottomSheetHeaderButton} />
      </View>
    )
  }

  renderBottomSheetContent = (): JSX.Element => {
    return (
      <View style={styles.bottomSheetHeader}>
        <View style={styles.bottomSheetHeaderButton} />
      </View>
    )
  }

  render() {

    const container = styleSheetFlatten([
      styles.container,
      {
        paddingTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.08,
      }
    ])

    const yourOpinionFlatten = styleSheetFlatten([
      {
        borderColor: this.state.inputIsCorrect 
          ? Color.gray 
          : Color.electricOrange
      }
    ])

    return (
      <View style={container}>

        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
        >
          <View style={styles.noteTimeContainer}>
            <TouchableOpacity onPress={this.goBackHandler}>
              <Image
                source={ImageRepository.masterArrowLeft}
                style={styles.masterArrowLeft}
              />
            </TouchableOpacity>
            <Text style={styles.noteHeadTitle}>
              13.05.2020, 13:45
            </Text>
          </View>
          <View style={styles.statusContent}>
            <CommonButton
              title='Ожидает'
              styleButton={styles.statusContainer}
              styleText={styles.statusTitle}
            />
            <CommonButton
              title='Отменить запись'
              styleButton={styles.cancelButton}
              styleText={styles.cancelTitle}
              onPress={this.openCancelRecordModalHandler}
            />
            <CommonButton
              title='Запись отменена'
              styleButton={styles.entryСanceledButton}
              styleText={styles.entryСanceledButtonText}
            />
            <CommonButton
              title='Завершена'
              styleButton={styles.finishedRecordingButton}
              styleText={styles.finishedRecordingButtonText}
            />
            <View style={{ alignItems: 'center'}}>
            <Text style={styles.bottomSheetYourMark}>
                Ваша оценка
              </Text>
              <View style={styles.bottomSheetYourMarkContainer}>
                {
                  masterAssessment.map(item => {
                    return (
                      <TouchableOpacity
                        onPress={this.openBottomSheetHandler.bind(this, item)}
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
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Детали записи
          </Text>
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
                  Королева Мария Алексеевна {'\n'}(Парикмахер)
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
        </ScrollView>


        <Modal 
          onBackdropPress={this.hideCancelRecordModalHandler} 
          isVisible={this.state.isModalShow}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Отменить запись?
          </Text>
            <Text style={styles.modalDescription}>
              Вы точно хотите отменить запись?
          </Text>
            <View style={styles.modalButtonsContainer}>
              <CommonButton
                title='Нет'
                styleButton={styles.modalNoButton}
                styleText={styles.modalNoButtonTitle}
                onPress={this.hideCancelRecordModalHandler}
              />
              <CommonButton
                title='Да'
                styleButton={styles.modalYesButton}
                onPress={this.hideCancelRecordModalHandler}
              />
            </View>
          </View>
        </Modal>

        <Portal>
          <Modalize
            ref={this.refModalizeHandler}
            childrenStyle={styles.bottomSheetChildren}
            modalHeight={windowWidth * 1.1}
          >
             <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetText}>
                Удовлетварительно
              </Text>
              <Text style={styles.bottomSheetYourMark}>
                Ваша оценка
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
                label='Ваше имя'
                containerStyle={styles.bottomSheetInput}
                onChangeText={this.onChangeYourOpinionHandler}
                onBlur={this.checkYourOpinionHandler}
                inputStyle={yourOpinionFlatten}
              />
              <CommonButton 
                title="Готово"
                styleButton={styles.bottomSheetSendButton}
              />
            </View>
          </Modalize>
        </Portal>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    height: '100%',
    backgroundColor: Color.white,
  }),
  contentContainer: style.view({
    paddingHorizontal: windowWidth * 0.042,
  }),
  noteTimeContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037,
  }),
  masterArrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  noteHeadTitle: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingLeft: windowWidth * 0.085,
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
    color: Color.fauxLime,
    textTransform: 'none',
  }),
  cancelButton: style.view({
    backgroundColor: Color.white,
    borderColor: Color.electricOrange,
    borderWidth: windowWidth * 0.002,
    marginTop: windowWidth * 0.042,
    height: windowWidth * 0.12,
  }),
  cancelTitle: style.text({
    color: Color.electricOrange
  }),
  detailsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold
  }),
  serviceInfoContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: windowWidth * 0.018
  }),
  detailsContainer: style.view({
    paddingTop: windowWidth * 0.042,
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
    height: windowWidth * 0.12,
  }),
  entryСanceledButtonText: style.text({
    color: Color.white,
    textTransform: 'none',
    fontFamily: fonts.robotoRegular,
  }),
  finishedRecordingButton: style.view({
    backgroundColor: Color.fauxLime,
    marginBottom: windowWidth * 0.04,
    height: windowWidth * 0.12,
  }),
  finishedRecordingButtonText: style.text({
    color: Color.white,
    textTransform: 'none',
    fontFamily: fonts.robotoRegular,
  }),
  priceInfo: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold
  }),
  modalContainer: style.view({
    width: windowWidth * 0.92,
    height: windowWidth * 0.466,
    backgroundColor: Color.white,
    paddingHorizontal: windowWidth * 0.042,
    borderRadius: windowWidth * 0.042
  }),
  modalTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.053,
    paddingTop: windowWidth * 0.042
  }),
  modalDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    paddingTop: windowWidth * 0.069,
  }),
  modalNoButton: style.view({
    backgroundColor: Color.white,
    borderWidth: windowWidth * 0.0025,
    borderColor: Color.electricOrange,
    width: windowWidth * 0.394,
    height: windowWidth * 0.133,
  }),
  modalNoButtonTitle: style.text({
    color: Color.electricOrange
  }),
  modalYesButton: style.view({
    borderWidth: windowWidth * 0.0025,
    borderColor: Color.electricOrange,
    width: windowWidth * 0.394,
    height: windowWidth * 0.133,
  }),
  modalButtonsContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: windowWidth * 0.069,
  }),
  bottomSheetHeader: style.view({
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: windowWidth * 0.04,
    borderTopRightRadius: windowWidth * 0.04,
    //FIXME add margin for hide header bottom sheet
   marginTop: windowWidth * 0.06,
  }),
  bottomSheetHeaderButton: style.view({
    width: windowWidth * 0.1,
    height: windowWidth * 0.01, 
    backgroundColor: Color.gray, 
    borderRadius: windowWidth * 0.1,
    marginTop: windowWidth * 0.04,
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