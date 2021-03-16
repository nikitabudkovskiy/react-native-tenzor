import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  ImageRepository,
  styleSheetFlatten,
} from 'app/system/helpers'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { isEmpty } from 'lodash'

interface IProps {
  service: any
  onChangeHandler: any
  selectedServices: any
}

interface IState {
  isServiceListOpen: boolean
  aniamtedHeightServiceList: Animated.Value
}

export class SelectServiceCard extends PureComponent<IProps, IState> {

  state = {
    isServiceListOpen: false,
    aniamtedHeightServiceList: new Animated.Value(0)
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

  toggleServiceListHandler = (): void => {
    if (this.state.isServiceListOpen) {
      this.setState({ isServiceListOpen: false }, this.closeServiceListHandler)
    }
    else {
      this.setState({ isServiceListOpen: true }, this.openServiceListHandler)
    }
  }

  render() {

    const servicePoints = styleSheetFlatten([
      styles.serviceList,
      {
        maxHeight: this.state.aniamtedHeightServiceList.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 500]
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

    const { service, selectedServices } = this.props

    return (
      <View style={serviceContentFlatten}>
        <TouchableOpacity
          onPress={this.toggleServiceListHandler}
          style={styles.serviceContainer}
        >
          <Text style={styles.serviceTitle}>
            {service.name}
          </Text>
          <View style={styles.serviceAmountContainer}>
            <Text style={styles.serviceAmount}>
              {
                isEmpty(selectedServices) 
                  ? 0
                  : selectedServices.length
              }
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
              service.data.map(items => {
                return items.data.map(item => {
                 const isActiveElement = selectedServices.find(element => element.id === item.id)
                  return (
                    <TouchableOpacity
                      onPress={this.props.onChangeHandler.bind(this, service.hierarchicalId, item)}
                      key={Math.random().toString()}
                      style={isActiveElement ? styles.serviceItemContainerActive : styles.serviceItemContainerNonActive}
                    >
                      <View style={styles.serviceItemTitleContainer}>
                        <Text style={styles.serviceItemTitle}>
                          {item.name}
                        </Text>
                        <Image
                          style={styles.serviceCheck}
                          source={isActiveElement ? ImageRepository.globalOrangeCheckMark : ImageRepository.globalGrayCheckMark}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.serviceItemTitleContainer}>
                        <Text style={styles.serivceItemDescriptionTime}>
                          {/* {items.time} мин */}
                        </Text>
                        <Text style={styles.serivceItemDescriptionPrice}>
                          {item.cost} ₽
                          </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })

              })
            }
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({

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
  serviceItemContainerActive: style.view({
    paddingHorizontal: windowWidth * 0.021,
    paddingVertical: windowWidth * 0.02,
    backgroundColor: Color.white,
    marginTop: windowWidth * 0.015,
    borderRadius: windowWidth * 0.032,
    justifyContent: 'space-evenly'
  }),
  serviceItemContainerNonActive: style.view({
    paddingHorizontal: windowWidth * 0.021,
    paddingVertical: windowWidth * 0.02,
    backgroundColor: Color.white600,
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
    width: '80%',
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

