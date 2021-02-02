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
  platform,
  isLongDevices,
} from 'app/system/helpers'
import Barcode from "react-native-barcode-builder"
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ListPages } from 'app/system/navigation'

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  activeDot: number
  bonusActiveDot: number
  isUserLogin: boolean
}

const action = [
  {
    title: 'Акция',
    subTitle: 'До 20 января Креативнаяж' + '\n' + 'стрижка по цене обычной',
  },
  {
    title: 'Акция',
    subTitle: 'До 20 января Креативнаяж' + '\n' + 'стрижка по цене обычной',
  },
  {
    title: 'Акция',
    subTitle: 'До 20 января Креативнаяж' + '\n' + 'стрижка по цене обычной',
  },
]

export class MainPage extends PureComponent<IProps, IState> {
  refModalize: any

  state = {
    activeDot: 0,
    bonusActiveDot: 0,
    isUserLogin: true,
  }

  onChangeLoginStatusHandler = (): void => {
    this.setState({ isUserLogin: !this.state.isUserLogin })
  }

  goToLoginPageHandler = (): void => {
    this.props.navigation.replace(ListPages.EnterPhoneNumberSingIn)
  }

  goToRegistraionPageHandler = (): void => {
    this.props.navigation.replace(ListPages.EnterPhoneNumberSingInRegistration)
  }

  openSupportServiceHandler = (): void => {
    this.refModalize.open()
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
    const bonusSlideSize = event.nativeEvent.layoutMeasurement.width * 0.2
    const bonusActiveDot = Math.round(bonusPositionX / bonusSlideSize)
    this.setState({ bonusActiveDot }, () => {
      console.log("bonusActiveDot", bonusActiveDot)
    })
  }

  changeCityHandler = () => {
    this.props.navigation.navigate('ChooseCity')
  }

  refModalizeHandler = (ref: any) => this.refModalize = ref

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
                action.map(item => {
                  return (
                    <View
                      style={styles.slides}
                      key={Math.random().toString()}
                    >
                      <TouchableOpacity
                        key={Math.random().toString()}
                        style={styles.slideOne}
                        onPress={this.openSupportServiceHandler}
                      >
                        <Text style={styles.slideOneTitle}>
                          {item.title}
                        </Text>
                        <Text style={styles.slideOneDescription}>
                          {item.subTitle}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
          <View style={styles.dotConteiner}>
            <View style={styles.dots}>
              {
                [0, 1, 2].map(item => {
                  return (
                    <View
                      key={item}
                      style={this.state.activeDot === item ? styles.dotIsActive : styles.dotInactive}>
                    </View>
                  )
                })
              }
            </View>
          </View>

          {
            this.state.isUserLogin
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
                      <View style={styles.slides}>
                        <View style={styles.bonusSlideOne}>
                          <Text style={styles.bounusSlideOneTitle}>
                            5900 ₽
                          </Text>
                          <Text style={styles.bounusSlideOneDescription}>
                            Баланс{'\n'}
                            абонемента{'\n'}
                            110₽ сгорят через{'\n'}
                            3 дня (под вопросом???)
                          </Text>
                        </View>
                      </View>
                      <View style={styles.slides}>
                        <View style={styles.bonusSlideTwo}>
                          <Text style={styles.bounusSlideTwoTitle}>
                            50 ₽
                          </Text>
                          <Text style={styles.bounusSlideTwoDescription}>
                            Бонусы Прядки в{'\n'}
                            Порядке
                          </Text>
                        </View>
                      </View>
                      <View style={styles.slides}>
                        <View style={styles.bonusSlideThree}>
                          <Text style={styles.bounusSlideTwoTitle}>
                            100 ₽
                          </Text>
                          <Text style={styles.bounusSlideTwoDescription}>
                            Бонусы Кенди{'\n'}
                            Денди
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                  <View style={styles.dotConteiner}>
                    <View style={styles.dots}>
                      {
                        [0, 1, 2].map(item => {
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

          <View style={styles.appointments}>
            <TouchableOpacity style={styles.serviceAppointment}>
              <Image
                source={ImageRepository.mainPageSign}
                style={styles.sign}
              // resizeMode="contain"
              />
              <Text style={styles.appointmentDescription}>
                Запись{'\n'} на услугу
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceAppointment}>
              <Image
                source={ImageRepository.mainPageRecordingMaster}
                style={styles.sign}
              // resizeMode="contain"
              />
              <Text style={styles.appointmentDescription}>
                Запись{'\n'} к мастеру
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceAppointment}>
              <Image
                source={ImageRepository.mainPageSolariumAppointment}
                style={styles.sign}
              // resizeMode="contain"
              />
              <Text style={styles.appointmentDescription}>
                Запись{'\n'} в солярий
              </Text>
            </TouchableOpacity>
          </View>
          {
            this.state.isUserLogin
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
                    onPress={this.onChangeLoginStatusHandler}
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
            ref={this.refModalizeHandler}
            childrenStyle={styles.bottomSheetChildren}
            modalHeight={windowWidth * 1.5}
          >
            <View style={styles.bottomSheetBackground}>
              <Text style={styles.bottomSheetBackgroundTitle}>
                Акция!
              </Text>
              <Text style={styles.bottomSheetBackgroundSubtitle}>
                До 20 января Креативная стрижка по цене обычной
              </Text>
            </View>
            <Text style={styles.bottomSheetTitle}>
              Скидка 20% на все креативные стрижки
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
      </View>
    )
  }
}

const styles = styleSheetCreate({
  content: style.view({
    backgroundColor: Color.white,
    height: '100%',
    paddingBottom: windowWidth * 0.26
  }),
  container: style.view({
    width: windowWidth * 2.436,
    height: windowWidth * 0.266,
    marginTop: windowWidth * 0.05,
  }),
  bonusesContainer: style.view({
    width: windowWidth * 1.42,
    height: windowWidth * 0.387,
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
    paddingLeft: windowWidth * 0.021,
  }),
  slideOne: style.view({
    width: windowWidth * 0.76,
    height: windowWidth * 0.266,
    backgroundColor: Color.candyAppleRed,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.041,
    borderRadius: windowWidth * 0.032,
  }),
  bonusSlideOne: style.view({
    width: windowWidth * 0.42,
    height: windowWidth * 0.384,
    backgroundColor: Color.pastaAndCheese,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
  }),
  bonusSlideTwo: style.view({
    width: windowWidth * 0.42,
    height: windowWidth * 0.384,
    backgroundColor: Color.electricOrange,
    paddingLeft: windowWidth * 0.042,
    paddingTop: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
  }),
  bonusSlideThree: style.view({
    width: windowWidth * 0.42,
    height: windowWidth * 0.384,
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
    backgroundColor: Color.black,
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
    height: windowWidth * 0.24,
    borderWidth: windowWidth * 0.002,
    borderColor: Color.electricOrange,
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
    color: Color.gray600,
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
})