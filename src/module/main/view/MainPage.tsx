import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  ImageRepository,
  styleSheetFlatten,
  platform,
  isLongDevices,
} from 'app/system/helpers'
import Barcode from "react-native-barcode-builder"
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ListPages } from 'app/system/navigation'
import { connectStore } from 'app/system/store/connectStore'
import { IApplicationState } from 'app/system/store/applicationState'
import { ThunkDispatch } from 'redux-thunk'
import { isEmpty } from 'lodash'
import { LoginAction } from 'app/module/login/store/loginActions'
import { LoginAsynсActions } from 'app/module/login/store/loginAsyncActions'
import { MainAsyncActions } from '../store/mainAsyncActions'

interface IStateProps extends IIsLoadingAndError {
  codeVerificationInformation: any
  promotions: IGetPromotionsResponce[]
  organisations: IGetOrganisationsResponce[]
}

interface IDispatchProps {
  logoutAccount(): void
  getPromotions(): Promise<void>
  getOrganisations(data: IGetOrganisationsRequest): Promise<void>
}

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  activeDot: number
  bonusActiveDot: number
  isUserLogin: boolean
  activePromotion: IGetPromotionsResponce | any
  activeBonus: boolean
  defauldIdOrganisation: Number
}


@connectStore(
  (state: IApplicationState): IStateProps => ({
    isLoading: state.login.isLoading,
    error: state.login.error,
    codeVerificationInformation: state.login.codeVerificationInformation,
    promotions: state.login.promotions,
    organisations: state.main.organisationsList
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    logoutAccount() {
      dispatch(LoginAction.logoutAccount())
    },
    async getPromotions() {
      await dispatch(LoginAsynсActions.getPromotions())
    },
    async getOrganisations(data) {
      await dispatch(MainAsyncActions.getOrganisations(data))
    }
  })
)
export class MainPage extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {
  refModalizePromotions: any
  refModalizeBonus: any

  state = {
    activeDot: 0,
    bonusActiveDot: 0,
    isUserLogin: false,
    activePromotion: {},
    activeBonus: false,
    defauldIdOrganisation: 1830
  }

  async componentDidMount(): Promise<void> {
    await this.props.getPromotions()
  }

  onChangeLoginStatusHandler = (): void => {
    this.props.navigation.navigate(ListPages.Сontacts)
  }

  logoutHandler = (): void => {
    this.props.navigation.reset({
      index: 0,
      routes: [
        { name: ListPages.MainTab }
      ],
    })
    this.props.logoutAccount()
  }

  goToLoginPageHandler = (): void => {
    this.props.navigation.replace(ListPages.EnterPhoneNumberSingIn)
  }

  goToRegistraionPageHandler = (): void => {
    this.props.navigation.replace(ListPages.EnterPhoneNumberSingInRegistration)
  }

  openPromotionsModalHandler = (activePromotion: IGetCodeVerificationRequest): void => {
    this.setState({ activePromotion }, () => {
      this.refModalizePromotions.open()
    })
  }

  openBonusServiceHandler = (): void => {
    this.setState({ activeBonus: !this.state.activeBonus }, () => this.refModalizeBonus.open())
  }

  onPromotionScrollHandler = (event: any): void => {
    const { x: positionX } = event.nativeEvent.contentOffset
    const slideSize = event.nativeEvent.layoutMeasurement.width * 0.8
    const activeDot = Math.round(positionX / slideSize)
    this.setState({ activeDot }, () => {
      console.log("slideSize", slideSize)
    })
  }

  onBonusesScrollHandler = (event: any): void => {
    const { x: bonusPositionX } = event.nativeEvent.contentOffset
    const bonusSlideSize = event.nativeEvent.layoutMeasurement.width * 0.5
    const bonusActiveDot = Math.round(bonusPositionX / bonusSlideSize)
    this.setState({ bonusActiveDot })
  }

  changeCityHandler = () => {
    this.props.navigation.navigate('ChooseCity')
  }

  refModalizePromotionsHandler = (ref: any) => this.refModalizePromotions = ref

  refModalizeBonusHandler = (ref: any) => this.refModalizeBonus = ref

  render() {

    const logoContainer = styleSheetFlatten([
      styles.logoContainer,
      {
        paddingTop: isLongDevices
          ? windowWidth * 0.1
          : platform.isIos
            ? windowWidth * 0.05
            : 0
      }
    ])

    return (
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={logoContainer}>
            <Image
              source={ImageRepository.mainPageLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
            decelerationRate="normal"
            onScroll={this.onPromotionScrollHandler}
          >
            <View style={styles.promotionSlidesContainer}>
              {
                !isEmpty(this.props.promotions) && this.props.promotions.map((item: IGetPromotionsResponce) => {
                  return (
                    <ImageBackground
                      source={{ uri: item.img_big }}
                      style={styles.slides}
                      key={Math.random().toString()}
                    >
                      <TouchableOpacity
                        key={Math.random().toString()}
                        style={styles.slideOne}
                        onPress={this.openPromotionsModalHandler.bind(this, item)}
                      >
                        <Text style={styles.slideOneTitle}>
                          Акция
                        </Text>
                        <Text style={styles.slideOneDescription}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  )
                })
              }
            </View>
          </ScrollView>
          <View style={styles.dotConteiner}>
            <View style={styles.dots}>
              {
                this.props.promotions.map((_, index) => {
                  return (
                    <View
                      key={index.toString()}
                      style={this.state.activeDot === index ? styles.dotIsActive : styles.dotInactive}>
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View style={styles.appointments}>
            <TouchableOpacity>
              <ImageBackground
                source={ImageRepository.mainReadCardBackground}
                style={styles.serviceAppointment}
                resizeMode="cover"
              >
                <Image
                  source={ImageRepository.mainPageHairdry}
                  style={styles.sign}
                // resizeMode="contain"
                />
                <Text style={styles.appointmentDescription}>
                  Запись{'\n'} на услугу
              </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity>
              <ImageBackground
                resizeMode="cover"
                source={ImageRepository.mainReadCardBackground}
                style={styles.serviceAppointment}
              >
                <Image
                  source={ImageRepository.mainPageRecordingMaster}
                  style={styles.sign}
                // resizeMode="contain"
                />
                <Text style={styles.appointmentDescription}>
                  Запись{'\n'} к мастеру
              </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity>
              <ImageBackground
                resizeMode="cover"
                source={ImageRepository.mainReadCardBackground}
                style={styles.serviceAppointment}
              >
                <Image
                  source={ImageRepository.mainPageSolariumAppointment}
                  style={styles.sign}
                // resizeMode="contain"
                />
                <Text style={styles.appointmentDescription}>
                  Запись{'\n'} в солярий
              </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {
            isEmpty(this.props.codeVerificationInformation)
              ? (
                <View>
                  <View style={styles.cardContent}>
                    <View style={styles.cardContainer}>
                      <View style={styles.cardBarcode}>
                        <Barcode
                          background={Color.white}
                          value="3243240000000"
                          format="CODE128"
                          width={windowWidth * 0.006}
                        />
                        <Text style={styles.barCodeNumber}>
                          3243240000000
                        </Text>
                      </View>
                      <View style={styles.cardDescriptionContainer}>
                        <Text style={styles.cardDescription}>
                          Карта любимого клиента
                        </Text>
                      </View>
                    </View>
                  </View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={styles.bonusesContainer}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="normal"
                    onScroll={this.onBonusesScrollHandler}
                  >
                    <View style={styles.bonusesSlidesContainer}>

                      <TouchableOpacity
                        style={styles.slides}
                        onPress={this.openBonusServiceHandler}
                      >
                        <View style={styles.bonusSlideOne}>
                          <Text style={styles.bounusSlideOneTitle}>
                            5900 ₽
                          </Text>
                          <Text style={styles.bounusSlideOneDescription}>
                            Баланс{'\n'}
                            абонемента
                          </Text>
                          <View
                            // onPress={this.openBonusServiceHandler} 
                            style={styles.bonusBurningContainer}>
                            <Text style={styles.bonusBurningTitle}>
                              🔥Сгорит 500 руб
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.slides}
                        onPress={this.openBonusServiceHandler}
                      >
                        <View style={styles.bonusSlideTwo}>
                          <Text style={styles.bounusSlideTwoTitle}>
                            50 ₽
                          </Text>
                          <Text style={styles.bounusSlideTwoDescription}>
                            Бонусы Прядки в{'\n'}
                            Порядке
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.slides}
                        onPress={this.openBonusServiceHandler}
                      >
                        <View style={styles.bonusSlideThree}>
                          <Text style={styles.bounusSlideTwoTitle}>
                            100 ₽
                          </Text>
                          <Text style={styles.bounusSlideTwoDescription}>
                            Бонусы Кенди{'\n'}
                            Денди
                          </Text>
                        </View>
                      </TouchableOpacity>

                    </View>
                  </ScrollView>
                  <View style={styles.dotConteiner}>
                    <View style={styles.dots}>
                      {
                        [0, 1].map(item => {
                          return (
                            <View
                              key={item}
                              style={this.state.bonusActiveDot === item ? styles.dotIsActive : styles.dotInactive}>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.cardContent}>
                  <View style={styles.loginRequestContainer}>
                    <Image
                      source={ImageRepository.mainPageNonLogin}
                      style={styles.loginRequestProfile}
                    />
                    <Text style={styles.loginRequestDescription}>
                      Для просмотра бонусов и карты {'\n'} клиента войдите в кабинет
                    </Text>
                    <CommonButton
                      title='ВОЙТИ'
                      styleButton={styles.loginButton}
                      onPress={this.goToLoginPageHandler}
                      onLongPress={this.goToRegistraionPageHandler}
                    />
                  </View>
                </View>
              )
          }


          {
            isEmpty(this.props.codeVerificationInformation)
              ? (
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    onPress={this.changeCityHandler}
                    style={styles.changeLocation}
                  >
                    <Image
                      source={ImageRepository.mainPageChangeLocation}
                      style={styles.changeCity}
                    />
                    <Text style={styles.changeLocationTitle}>
                      Изменить город
                    </Text>
                    <Image
                      source={ImageRepository.mainPageArrowRight}
                      style={styles.arrowRight}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.logoutHandler}
                    style={styles.exitContainer}
                  >
                    <Image
                      source={ImageRepository.mainPageExit}
                      style={styles.exit}
                    />
                    <Text style={styles.exitTitle}>
                      Выход
                    </Text>
                    <Image
                      source={ImageRepository.mainPageArrowRight}
                      style={styles.arrowRight}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    onPress={this.changeCityHandler}
                    style={styles.changeLocation}
                  >
                    <Image
                      source={ImageRepository.mainPageChangeLocation}
                      style={styles.changeCity}
                    />
                    <Text style={styles.changeLocationTitle}>
                      Изменить город
                    </Text>
                    <Image
                      source={ImageRepository.mainPageArrowRight}
                      style={styles.arrowRight}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onChangeLoginStatusHandler}
                    style={styles.exitContainer}
                  >
                    <Image
                      source={ImageRepository.mainPageAddress}
                      style={styles.mainPageAddress}
                    />
                    <Text style={styles.addressTitle}>
                      Адреса салонов
                    </Text>
                    <Image
                      source={ImageRepository.mainPageArrowRight}
                      style={styles.arrowRight}
                    />
                  </TouchableOpacity>
                </View>
              )
          }
        </ScrollView>

        <Portal>
          <Modalize
            ref={this.refModalizePromotionsHandler}
            childrenStyle={styles.bottomSheetChildren}
            modalHeight={windowWidth * 1.5}
          >
            <View style={styles.bottomSheetBackground}>
              <Text style={styles.bottomSheetBackgroundTitle}>
                Акция!
              </Text>
              <Text style={styles.bottomSheetBackgroundSubtitle}>
                {this.state.activePromotion?.title}
              </Text>
            </View>
            <Text style={styles.bottomSheetTitle}>
              {/* {this.state.activePromotion?.title} */}
            </Text>
            <Text style={styles.bottomSheetWorks}>
              Действует до 18.10.202
            </Text>
            <Text style={styles.bottomSheetSubtitle}>
              Тут какой-то дополнительный текст по акции. Можно написать в каких салонах действует и т.п.
            </Text>
            <CommonButton
              title="Завершить"
            />
          </Modalize>
        </Portal>

        <Portal>
          <Modalize
            ref={this.refModalizeBonusHandler}
            adjustToContentHeight
          >
            <View style={styles.bottomSheetChildren}>
              <Text style={styles.burningBonusTitle}>
                Ближайшие сгорания
              </Text>
              <View style={styles.burningBonusNoteContainer}>
                <Text style={styles.burningBonusTimeTitle}>
                  12.02.2021
                </Text>
                <Text style={styles.burningBonusMoneyTitle}>
                  сгорят 120 ₽
                </Text>
              </View>
              <View style={styles.burningBonusNoteContainer}>
                <Text style={styles.burningBonusTimeTitle}>
                  23.02.2021
                </Text>
                <Text style={styles.burningBonusMoneyTitle}>
                  сгорят 288 ₽
                </Text>
              </View>
              <View style={styles.burningBonusNoteContainer}>
                <Text style={styles.burningBonusTimeTitle}>
                  19.02.2021
                </Text>
                <Text style={styles.burningBonusMoneyTitle}>
                  сгорят 367 ₽
                </Text>
              </View>
              <CommonButton
                title="Понятно"
                styleButton={styles.understand}
              />
            </View>
          </Modalize>
        </Portal>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  content: style.view({
    backgroundColor: Color.white,
    height: '100%',
    paddingBottom: windowWidth * 0.2,
  }),
  container: style.view({
    // marginRight: windowWidth * 0.1,
    // width: windowWidth * 2.436,
    height: windowWidth * 0.266,
    marginTop: windowWidth * 0.05,
  }),
  bonusesContainer: style.view({
    width: windowWidth * 1.42,
    height: windowWidth * 0.272,
    marginTop: windowWidth * 0.05,
  }),
  promotionSlidesContainer: style.view({
    flexDirection: 'row',
    paddingLeft: windowWidth * 0.043,
  }),
  bonusesSlidesContainer: style.view({
    flexDirection: 'row',
    paddingLeft: windowWidth * 0.043,
  }),
  slides: style.view({
    alignItems: 'center',
    marginLeft: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
    overflow: 'hidden',
  }),
  slideOne: style.view({
    width: windowWidth * 0.76,
    height: windowWidth * 0.266,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.041,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }),
  bonusSlideOne: style.view({
    width: windowWidth * 0.42,
    height: windowWidth * 0.272,
    backgroundColor: Color.pastaAndCheese,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
  }),
  bonusSlideTwo: style.view({
    width: windowWidth * 0.42,
    height: windowWidth * 0.272,
    backgroundColor: Color.electricOrange,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
  }),
  bonusSlideThree: style.view({
    width: windowWidth * 0.42,
    height: windowWidth * 0.272,
    backgroundColor: Color.frostySky,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
  }),
  slideOneTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.058,
    color: Color.white,
    marginBottom: windowWidth * 0.01,
  }),
  bounusSlideOneTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.058,
    color: Color.black,
    marginBottom: windowWidth * 0.01,
  }),
  bounusSlideTwoTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.058,
    color: Color.white,
    marginBottom: windowWidth * 0.01,
  }),
  slideOneDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.036,
    color: Color.white,
  }),
  slideTwoDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.036,
    color: Color.white,
  }),
  bonusBurningContainer: style.view({
    // marginTop: windowWidth * 0.01
  }),
  bonusBurningTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold,
    color: Color.alizarinCrimson
  }),
  bounusSlideOneDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.036,
    color: Color.black,
    textAlign: 'left'
  }),
  bounusSlideTwoDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.036,
    color: Color.white,
    textAlign: 'left'
  }),
  logoContainer: style.view({
    // paddingTop: windowWidth * 0.1,
    backgroundColor: Color.white,
  }),
  logo: style.image({
    width: windowWidth,
    height: windowWidth * 0.128,
  }),
  dotInactive: style.view({
    width: windowWidth * 0.0106,
    height: windowWidth * 0.0106,
    borderRadius: windowWidth * 0.375,
    backgroundColor: Color.electricOrange,
    opacity: 0.4,
    marginRight: windowWidth * 0.01,
  }),
  dotIsActive: style.view({
    width: windowWidth * 0.0106,
    height: windowWidth * 0.0106,
    borderRadius: windowWidth * 0.375,
    backgroundColor: Color.electricOrange,
    marginRight: windowWidth * 0.01,
  }),
  dotConteiner: style.view({
    height: windowWidth * 0.0106,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: windowWidth * 0.032,
  }),
  dots: style.view({
    flexDirection: 'row'
  }),
  appointments: style.view({
    paddingTop: windowWidth * 0.05,
    flexDirection: 'row',
    paddingLeft: windowWidth * 0.06,
  }),
  serviceAppointment: style.view({
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderWidth: windowWidth * 0.002,
    borderColor: Color.white,
    borderRadius: windowWidth * 0.032,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: windowWidth * 0.021,
  }),
  sign: style.image({
    width: windowWidth * 0.0858,
    height: windowWidth * 0.0835,
    marginBottom: windowWidth * 0.02,
  }),
  appointmentDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.0346,
    textAlign: 'center',
    color: Color.yankeesBlue,
    fontWeight: 'bold',
  }),
  menuContainer: style.view({
    paddingLeft: windowWidth * 0.06,
    paddingTop: windowWidth * 0.053,
  }),
  changeLocation: style.view({
    width: windowWidth * 0.88,
    height: windowWidth * 0.13,
    flexDirection: 'row',
    alignItems: 'center'
  }),
  exitContainer: style.view({
    width: windowWidth * 0.88,
    height: windowWidth * 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: windowWidth * 0.021
  }),
  changeCity: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  arrowRight: style.image({
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  }),
  changeLocationTitle: style.text({
    paddingLeft: windowWidth * 0.0277,
    paddingRight: windowWidth * 0.42,
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),
  exitTitle: style.text({
    paddingLeft: windowWidth * 0.0277,
    paddingRight: windowWidth * 0.605,
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),
  exit: style.image({
    width: windowWidth * 0.042,
    height: windowWidth * 0.042,
  }),
  profileContainer: style.view({
    alignItems: 'center'
  }),
  profile: style.image({
    width: windowWidth * 0.042,
    height: windowWidth * 0.04
  }),
  titleElementBar: style.text({
    fontSize: windowWidth * 0.029,
    fontFamily: fonts.robotoRegular
  }),
  cardBarcode: style.view({
    paddingTop: windowWidth * 0.03,
  }),
  cardContainer: style.view({
    alignItems: 'center',
    backgroundColor: Color.white,
    marginTop: windowWidth * 0.05,
    borderRadius: windowWidth * 0.05,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  barCodeNumber: style.text({
    fontSize: windowWidth * 0.058,
    textAlign: 'center',
  }),
  cardDescriptionContainer: style.view({
    backgroundColor: Color.black,
    width: windowWidth * 0.9,
    borderBottomLeftRadius: windowWidth * 0.05,
    borderBottomRightRadius: windowWidth * 0.05,
    marginTop: windowWidth * 0.04,
    justifyContent: 'center',
    paddingVertical: windowWidth * 0.02,
  }),
  cardDescription: style.text({
    color: Color.white,
    textAlign: 'center',
    fontSize: windowWidth * 0.04,
  }),
  cardContent: style.view({
    alignItems: 'center',
  }),
  loginRequestContainer: style.view({
    width: windowWidth * 0.91,
    height: windowWidth * 0.62,
    borderRadius: windowWidth * 0.032,
    borderColor: Color.electricOrange,
    borderWidth: windowWidth * 0.005,
    borderStyle: 'dashed',
    marginTop: windowWidth * 0.05,
    alignItems: 'center'
  }),
  loginButton: style.view({
    width: windowWidth * 0.72,
    height: windowWidth * 0.1,
    marginTop: windowWidth * 0.05
  }),
  loginRequestProfile: style.image({
    width: windowWidth * 0.085,
    height: windowWidth * 0.08,
    marginTop: windowWidth * 0.117
  }),
  loginRequestDescription: style.text({
    fontSize: windowWidth * 0.04,
    textAlign: 'center',
    fontFamily: fonts.robotoRegular,
    paddingTop: windowWidth * 0.08
  }),
  mainPageAddress: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
    position: 'absolute',
    left: 0,
  }),
  addressTitle: style.text({
    paddingLeft: windowWidth * 0.07,
    paddingRight: windowWidth * 0.42,
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),
  bottomSheetChildren: style.view({
    paddingHorizontal: windowWidth * 0.04,
  }),
  bottomSheetBackground: style.view({
    width: '100%',
    height: windowWidth * 0.3,
    backgroundColor: Color.candyAppleRed,
    marginTop: windowWidth * 0.03,
    borderRadius: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.05,
  }),
  bottomSheetBackgroundTitle: style.text({
    fontSize: windowWidth * 0.06,
    color: Color.white,
    fontFamily: fonts.robotoBold,
    marginTop: windowWidth * 0.05,
  }),
  bottomSheetBackgroundSubtitle: style.text({
    fontSize: windowWidth * 0.036,
    color: Color.white,
    fontFamily: fonts.robotoRegular,
    marginTop: windowWidth * 0.01,
  }),
  bottomSheetTitle: style.text({
    fontFamily: fonts.robotoBold,
    color: Color.black,
    fontSize: windowWidth * 0.044,
    marginTop: windowWidth * 0.04,
  }),
  bottomSheetWorks: style.text({
    fontFamily: fonts.robotoRegular,
    color: Color.candyAppleRed,
    fontSize: windowWidth * 0.044,
    marginTop: windowWidth * 0.04,
  }),
  bottomSheetSubtitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    marginTop: windowWidth * 0.04,
    marginBottom: windowWidth * 0.6,
  }),
  burningBonusNoteContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: windowWidth * 0.082
  }),
  burningBonusTitle: style.text({
    alignSelf: 'center',
    marginTop: windowWidth * 0.04,
    fontSize: windowWidth * 0.064,
    fontFamily: fonts.robotoBold
  }),
  burningBonusMoneyTitle: style.text({
    fontSize: windowWidth * 0.04,
    color: Color.alizarinCrimson,
    fontFamily: fonts.robotoRegular
  }),
  burningBonusTimeTitle: style.text({
    fontSize: windowWidth * 0.04,
    color: Color.gray600,
    fontFamily: fonts.robotoRegular
  }),
  understand: style.view({
    marginTop: windowWidth * 0.42,
    marginBottom: windowWidth * 0.07,
  })
})