import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
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
import { MastersAsyncActions } from 'app/module/masters/store/masterAsyncActions'
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { RouteProp } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { FloatingLoader } from 'app/module/global/view/FloatingLoader'
import { SelectServiceCard } from './SelectServiceCard'

interface IStateProps extends IIsLoadingAndError {
  userCity: ITownsResponce
  services: any
}

interface IDispatchProps {
  getServices(data: IGetServicesRequest): Promise<void>
}

interface IProps {
  navigation: StackNavigationProp<any>
  route: RouteProp<any, any>
}

interface IState {
  isServiceListOpen: boolean
  aniamtedHeightServiceList: Animated.Value
  selectedServices: Object
}

const serviceListItemHight = windowWidth * 5
const serviceListHight = serviceListItemHight

@connectStore(
  (state: IApplicationState): IStateProps => ({
    userCity: state.system.userCity,
    isLoading: state.main.isLoading,
    error: state.main.error,
    services: state.master.services,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async getServices(data) {
      await dispatch(MastersAsyncActions.getServices(data))
    }
  })
)
export class SelectService extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {

  state = {
    isServiceListOpen: false,
    aniamtedHeightServiceList: new Animated.Value(0),
    selectedServices: {},
  }

  async componentDidMount(): Promise<void> {
    await this.props.getServices({
      point_id: this.props.userCity.id,
    })
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  goToChooseMasterHandler = (): void => {
    this.props.navigation.push(
      ListPages.ChooseMaster,
      {
        salon: this.props.route.params?.salon,
        selectedServices: this.state.selectedServices,
      }
    )
  }

  openServiceListHandler = (): void => {
    Animated.timing(this.state.aniamtedHeightServiceList, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    })
      .start()
  }

  onChangeSelectedServiceHandler = (mainId: number, serviceInformation: any): void => {
    let selectedServices: any = this.state.selectedServices
    const services: any = selectedServices[mainId] || []
    if (isEmpty(services)) {
      this.setState({
        selectedServices: {
          ...this.state.selectedServices,
          [mainId]: [serviceInformation]
        }
      })
    } else {
      //@ts-ignore
      let elementsServices = Object.values(this.state.selectedServices[mainId])
      const findElement = elementsServices.find((item: any) => +item.id === +serviceInformation.id)
      if (findElement) {
        const test =  elementsServices.filter((item: any) => {
          console.log(item.id, serviceInformation.id)
          return +item.id !== +serviceInformation.id
        })
         this.setState({ 
          selectedServices: {
            ...this.state.selectedServices,
            [mainId]: test,
          }
         })
      } else {
        this.setState({ 
          selectedServices: {
            ...this.state.selectedServices,
            [mainId]: [...elementsServices, serviceInformation],
          }
        })
      }
    }
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

    if (this.props.isLoading) {
      return <FloatingLoader />
    }
    
    //@ts-ignore
    const selectedServices = Object.values(this.state.selectedServices).flat()

    console.log('props', this.props.services)

    const container = styleSheetFlatten([
      styles.container,
      {
        paddingTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.08,
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
          {
            !isEmpty(this.props.services) && this.props.services.map(mainItem => {
              console.log('test', mainItem)
              return (
                <SelectServiceCard
                  service={mainItem}
                  onChangeHandler={this.onChangeSelectedServiceHandler}
                  //@ts-ignore
                  selectedServices={this.state.selectedServices[mainItem.hierarchicalId] || []}
                  // key={mainItem.id.toString()}
                />
              )
            })
          }
        </ScrollView>

        <View style={styles.serviceCalculationsContainer}>
          <View style={styles.serviceCalculations}>
            <Text style={styles.serviceCalculationsTitle}>
              Услуг: {selectedServices.length} на {selectedServices.reduce((sum, item )=> item.cost, 0)} ₽ 
              {/* / 90 мин */}
            </Text>
            <CommonButton
              title='Далее'
              styleButton={styles.continue}
              // disabled={!selectedServices.length}
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

