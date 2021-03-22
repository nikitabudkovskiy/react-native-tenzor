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
  hitSlop,
} from 'app/system/helpers'
import { CommonButton } from 'app/module/global/view/CommonButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { MastersAsyncActions } from 'app/module/masters/store/masterAsyncActions'
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { RouteProp } from '@react-navigation/native'
import moment from 'moment'
import { FloatingLoader } from 'app/module/global/view/FloatingLoader'
import { isEmpty } from 'lodash'
import { ListPages } from 'app/system/navigation'

interface IStateProps extends IIsLoadingAndError {
  userCity: ITownsResponce
  workingHoursMaster: any
}

interface IDispatchProps {
  getWorkingHoursMaster(data: IGetWorkingHoursMasterRequest): Promise<void>
}

interface IProps {
  navigation: StackNavigationProp<any>
  route: RouteProp<any, any>
}

interface IState {
  activeDate: any
  activeTime: any
}

export function convertMinutesToHoursAndMinutes(minutes: number) {
  let h: any = Math.floor(minutes / 60)
  let m: any = minutes % 60
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  return h + ':' + m
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    userCity: state.system.userCity,
    isLoading: state.main.isLoading,
    error: state.main.error,
    workingHoursMaster: state.master.workingHoursMaster,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async getWorkingHoursMaster(data) {
      await dispatch(MastersAsyncActions.getWorkingHoursMaster(data))
    },
  })
)
export class TimeSelect extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {

  state = {
    activeDate: -1,
    activeTime: -1,
  }

  async componentDidMount(): Promise<void> {
    moment.locale('ru')
    await this.props.getWorkingHoursMaster({
      point_id: this.props.userCity.id,
      master_id: this.props.route.params?.master.id,
    })
  }

  onChangeDateHandler = (activeDate: any): void => {
    if (this.state.activeDate === activeDate) {
      this.setState({ activeDate: -1 })
      return
    }
    this.setState({ activeDate })
  }

  onChangeTimeHandler = (activeTime: any, activeDate: string): void => {
    if (this.state.activeTime === activeTime) {
      this.setState({ activeTime: -1, activeDate: -1 })
      return
    }
    this.setState({ activeTime, activeDate })
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  goToDetailsRecordHandler = (): void => {
    this.props.navigation.push(ListPages.DetailsRecord, 
      {
        salon: this.props.route.params?.salon,
        selectedServices: this.props.route.params?.selectedServices,
        countService: this.props.route.params?.countService,
        priceService: this.props.route.params?.priceService,
        master: this.props.route.params?.master,
        dateRecord: this.state.activeDate,
        timeRecord: this.state.activeTime,
      }
    )
  }

  render() {

    if (this.props.isLoading) {
      return <FloatingLoader />
    }

    const container = styleSheetFlatten([
      styles.container,
      {
        marginTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.05
      }
    ])

    const dateContainerFlatten = styleSheetFlatten([
      styles.dateContainer,
      {
        backgroundColor: Color.electricOrange
      }
    ])

    const monthDateNumberTitleFlatten = styleSheetFlatten([
      styles.monthDateNumberTitle,
      {
        color: Color.chineseBlack
      }
    ])

    const monthDateTitleFlatten = styleSheetFlatten([
      styles.monthDateTitle,
      {
        color: Color.gray600
      }
    ])

    const { countService, priceService } = (this.props.route.params as any)
    console.log('f', !this.state.activeTime)
    console.log('f', !this.state.activeDate)
    console.log('f', !this.state.activeTime && !this.state.activeDate)
    console.log('fkm', !this.state.activeDate && !this.state.activeTime || !this.state.activeTime && !this.state.activeDate)
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          scrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={container}
        >
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              onPress={this.goBackHandler}
              hitSlop={hitSlop}
            >
              <Image
                source={ImageRepository.masterArrowLeft}
                style={styles.arrowLeft}
              />
            </TouchableOpacity>
            <Text style={styles.dateTimeHeadTitle}>
              Дата и время
            </Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.dateContent}
            showsHorizontalScrollIndicator={false}
            decelerationRate="normal"
          >
            {
              !isEmpty(this.props.workingHoursMaster) && this.props.workingHoursMaster.map(item => {
                return (
                  <TouchableOpacity
                    key={Math.random().toString()}
                    style={this.state.activeDate === item.date ? dateContainerFlatten : styles.dateContainer}
                    onPress={this.onChangeDateHandler.bind(this, item.date)}
                  >
                    <View style={styles.monthDateContainer}>
                      <Text style={this.state.activeDate === item.date ? styles.monthDateNumberTitle : monthDateNumberTitleFlatten}>
                        {moment(item.date).format('DD')}
                      </Text>
                      <Text style={this.state.activeDate === item.date ? styles.monthDateTitle : monthDateTitleFlatten}>
                        {moment(item.month).format('MMM')}
                      </Text>
                    </View>
                    <Text style={this.state.activeDate === item.date ? styles.dayOfWeek : monthDateTitleFlatten}>
                      {moment(item.dayOfWeek).format('ddd')}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          <ScrollView horizontal style={styles.timeContent}>
            {
              !isEmpty(this.props.workingHoursMaster) &&
              this.props.workingHoursMaster.map(topItem => {
                return topItem.masters.map(midddleItem => {
                  return (
                    <View 
                      style={{ marginRight: 20 }}
                      key={Math.random().toString()}
                    >
                      {
                        midddleItem.time_intervals.map(bottomItem => {
                          const disabledButton = !bottomItem.available
                          return (
                            <TouchableOpacity
                              key={Math.random().toString()}
                              style={disabledButton ? styles.timeContainerDisabled : this.state.activeTime === bottomItem.start && this.state.activeDate === topItem.date ? styles.timeContainerActive : styles.timeContainer}
                              disabled={disabledButton}
                              onPress={this.onChangeTimeHandler.bind(this, bottomItem.start, topItem.date)}
                            >
                              <Text style={this.state.activeTime === bottomItem.start && this.state.activeDate === topItem.date ? styles.timeTitleActive :  styles.timeTitle}>
                                {convertMinutesToHoursAndMinutes(bottomItem.start)}
                              </Text>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                  )
                })
              })
            }
          </ScrollView>
        </ScrollView>
        <View style={styles.calculationsContainer}>
          <Text style={styles.calculationsTitle}>
            Услуг: {countService} на {priceService} ₽ 
          </Text>
          <CommonButton
            title='ЗАПИСАТЬСЯ'
            styleButton={styles.makeAppointment}
            onPress={this.goToDetailsRecordHandler}
            disabled={this.state.activeTime === -1}
          />
        </View>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  mainContainer: style.view({
    flex: 1,
    backgroundColor: Color.white
  }),
  container: style.view({

  }),
  dateTimeContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037,
    paddingHorizontal: windowWidth * 0.035,
  }),
  arrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  dateTimeHeadTitle: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingLeft: windowWidth * 0.085,
  }),
  dateContainer: style.view({
    width: windowWidth * 0.154,
    height: windowWidth * 0.152,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: windowWidth * 0.021,
    marginRight: windowWidth * 0.021,
    borderWidth: windowWidth * 0.002,
    borderColor: Color.anitFlashWhite
  }),
  dateContainerActive: style.view({
    width: windowWidth * 0.154,
    height: windowWidth * 0.152,
    backgroundColor: Color.electricOrange,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: windowWidth * 0.021,
    marginRight: windowWidth * 0.021,
    borderWidth: windowWidth * 0.002,
    borderColor: Color.anitFlashWhite
  }),
  monthDateContainer: style.view({
    flexDirection: 'row',
    alignItems: 'flex-end'
  }),
  monthDateNumberTitle: style.text({
    fontSize: windowWidth * 0.048,
    fontFamily: fonts.robotoBold,
    color: Color.white
  }),
  monthDateTitle: style.text({
    fontSize: windowWidth * 0.034,
    color: Color.white
  }),
  dayOfWeek: style.text({
    fontSize: windowWidth * 0.034,
    color: Color.white
  }),
  dateContent: style.view({
    // width: windowWidth * 1.2,
    height: windowWidth * 0.216,
    marginTop: windowWidth * 0.05,
    // paddingLeft: windowWidth * 0.042
    paddingHorizontal: windowWidth * 0.042,
  }),
  timeContainer: style.view({
    width: windowWidth * 0.22,
    height: windowWidth * 0.1,
    backgroundColor: Color.anitFlashWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.01
  }),
  timeContainerActive: style.view({
    width: windowWidth * 0.22,
    height: windowWidth * 0.1,
    backgroundColor: Color.electricOrange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.01
  }),
  timeContainerDisabled: style.view({
    width: windowWidth * 0.22,
    height: windowWidth * 0.1,
    backgroundColor: Color.anitFlashWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.01,
    opacity: 0.3,
  }),
  timeTitle: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04
  }),
  timeTitleActive: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.white,
  }),
  timeContent: style.view({
    paddingHorizontal: windowWidth * 0.048,
    paddingBottom: windowWidth * 0.085,

    // flexDirection: 'row',
  }),
  makeAppointment: style.view({
    width: windowWidth * 0.914,
    height: windowWidth * 0.1
  }),
  calculationsContainer: style.view({
    width: windowWidth,
    height: windowWidth * 0.216,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: windowWidth * 0.06,
  }),
  calculationsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular
  }),
})
