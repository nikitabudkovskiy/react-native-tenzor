import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ImageURISource,
  ScrollView,
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
  hitSlop,
} from 'app/system/helpers'
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  isServiceListOpen: boolean
  aniamtedHeightServiceList: Animated.Value
}

interface IServiceList {
  title: string
  checkedImg: ImageURISource
  time: number
  price: number
}

const serviceListItemHight = windowWidth * 5
const serviceListHight = serviceListItemHight

export class SelectService extends PureComponent<IProps, IState>{

  state = {
    isServiceListOpen: false,
    aniamtedHeightServiceList: new Animated.Value(0)
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  goToChooseMasterHandler = (): void => {
    this.props.navigation.push(ListPages.ChooseMaster)
  }

  openServiceListHandler = (): void => {
    Animated.timing(this.state.aniamtedHeightServiceList, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    })
      .start()
  }

  closeServiceListHandler = (): void => {
    Animated.timing(this.state.aniamtedHeightServiceList, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    })
      .start()
  }

  toggleServiceListHandler = ():void => {
    if (this.state.isServiceListOpen) {
      this.setState({ isServiceListOpen: false }, this.closeServiceListHandler)
    }
    else {
      this.setState({ isServiceListOpen: true }, this.openServiceListHandler)
    }
  }

  render() {

    const container = styleSheetFlatten([
      styles.container,
      {
        paddingTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.08,
      }
    ])

    const servicePoints = styleSheetFlatten([
      styles.serviceList,
      {
        maxHeight: this.state.aniamtedHeightServiceList.interpolate({
          inputRange: [0, 1],
          outputRange: [0, serviceListHight]
        }),
      }
    ])

    const serviceContentFlatten = styleSheetFlatten([
      styles.serviceContent,
      {
        backgroundColor: this.state.isServiceListOpen ? Color.smokyWhite : Color.white
      }
    ])

    const spin = this.state.aniamtedHeightServiceList.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    const arrrowBottomFlip = styleSheetFlatten([
      styles.selectServiceArrowBottom,
      {
        transform: [{
          rotate: spin
        }]
      }
    ])

    return (
      <View style={container}>

        <View style={styles.selectServiceContainer}>
          <TouchableOpacity
            onPress={this.goBackHandler}
            hitSlop={hitSlop}
          >
            <Image
              source={ImageRepository.masterArrowLeft}
              style={styles.masterArrowLeft}
            />
          </TouchableOpacity>
          <Text style={styles.serivceHeadTitle}>
            Выберите услугу
          </Text>
        </View>

        <ScrollView style={styles.scrollViewContainer}>
        <View style={serviceContentFlatten}>
          <TouchableOpacity
            onPress={this.toggleServiceListHandler}
            style={styles.serviceContainer}
          >
            <Text style={styles.serviceTitle}>
              Мужской зал
            </Text>
            <View style={styles.serviceAmountContainer}>
              <Text style={styles.serviceAmount}>
                2
              </Text>
            </View>
            <Animated.Image
              style={arrrowBottomFlip}
              source={ImageRepository.selectServiceArrowBottom}
            />
          </TouchableOpacity>
          <Animated.View style={servicePoints}>
            <View style={styles.servicePointsContainer}>
              {
                serviceList.map(items => {
                  return (
                    <View key={Math.random().toString()} style={styles.serviceItemContainer}>
                      <View style={styles.serviceItemTitleContainer}>
                        <Text style={styles.serviceItemTitle}>
                          {items.title}
                        </Text>
                        <Image
                          style={styles.serviceCheck}
                          source={items.checkedImg}
                        />
                      </View>
                      <View style={styles.serviceItemTitleContainer}>
                        <Text style={styles.serivceItemDescriptionTime}>
                          {items.time} мин
                        </Text>
                        <Text style={styles.serivceItemDescriptionPrice}>
                          {items.price} ₽
                        </Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </Animated.View>
        </View>
        </ScrollView>

        <View style={styles.serviceCalculationsContainer}>
          <View style={styles.serviceCalculations}>
            <Text style={styles.serviceCalculationsTitle}>
              Услуг: 3 на 600 ₽ / 90 мин
            </Text>
            <CommonButton
              title='Далее'
              styleButton={styles.continue}
              onPress={this.goToChooseMasterHandler}
            />
          </View>
        </View>

      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    backgroundColor: Color.white,
    flex: 1
  }),
  scrollViewContainer: style.view({
 
  }),
  serviceContainer: style.view({
    paddingHorizontal: windowWidth * 0.021,
    flexDirection: 'row',
    height: windowWidth * 0.06,
    alignItems: 'center',
    marginTop: windowWidth * 0.04,
  }),
  serviceAmountContainer: style.view({
    width: windowWidth * 0.042,
    height: windowWidth * 0.042,
    backgroundColor: Color.electricOrange,
    borderRadius: windowWidth * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: windowWidth * 0.013
  }),
  serviceAmount: style.text({
    fontSize: windowWidth * 0.026,
    color: Color.white
  }),
  selectServiceArrowBottom: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
    position: 'absolute',
    right: 0
  }),
  serviceTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold,
  }),
  serviceList: style.view({
    overflow: 'hidden',
    paddingHorizontal: windowWidth * 0.021,
  }),
  serviceItemContainer: style.view({
    paddingHorizontal: windowWidth * 0.021,
    paddingVertical: windowWidth * 0.02,
    backgroundColor: Color.white,
    marginTop: windowWidth * 0.015,
    borderRadius: windowWidth * 0.032,
    justifyContent: 'space-evenly'
  }),
  serviceItemTitleContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.021,
  }),
  serviceCheck: style.image({
    width: windowWidth * 0.041,
    height: windowWidth * 0.037,
    position: 'absolute',
    right: windowWidth * 0.021
  }),
  serviceItemTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,

  }),
  serivceItemDescriptionTime: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    color: Color.gray
  }),
  serivceItemDescriptionPrice: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    position: 'absolute',
    right: windowWidth * 0.021
  }),
  serviceContent: style.view({
    backgroundColor: Color.white,
    marginHorizontal: windowWidth * 0.021,
    borderRadius: windowWidth * 0.032,
    marginTop: windowWidth * 0.05
  }),
  servicePointsContainer: style.view({
    paddingVertical: windowWidth * 0.04
  }),
  serviceCalculationsContainer: style.view({
    width: windowWidth,
    height: windowWidth * 0.216,
    borderTopWidth: windowWidth * 0.001,
    marginBottom: windowWidth * 0.06,
  }),
  serviceCalculations: style.view({
    alignItems: 'center',
  }),
  continue: style.view({
    width: windowWidth * 0.914,
  }),
  serviceCalculationsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    paddingVertical: windowWidth * 0.021
  }),
  selectServiceContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037,
    paddingHorizontal: windowWidth * 0.035,
  }),
  masterArrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064, 
  }),
  serivceHeadTitle: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingLeft: windowWidth * 0.085,
  })
})


const serviceList: IServiceList[] = [
  {
    title: 'Модельная/теннис стрижка',
    checkedImg: ImageRepository.chooseCityCheck,
    time: 30,
    price: 350
  },
  {
    title: 'Бокс/Ролубокс/спортивная/окантовка с переходом/стрижка шейвером',
    checkedImg: ImageRepository.selectServiceNotChecked,
    time: 20,
    price: 270
  }
]