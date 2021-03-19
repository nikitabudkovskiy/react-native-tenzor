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
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { RouteProp } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { MainAsyncActions } from 'app/module/main/store/mainAsyncActions'
import moment from 'moment'

interface IStateProps extends IIsLoadingAndError {
  userCity: ITownsResponce
  workingHoursMaster: any
}

interface IDispatchProps {
  creatreRecord(data: ICreateRecordRequest): Promise<void>
}

interface IProps {
  navigation: StackNavigationProp<any>
  route: RouteProp<any, any>
}

interface IState {
  activeDate: any
  activeTime: any
  comment: string
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    userCity: state.system.userCity,
    isLoading: state.main.isLoading,
    error: state.main.error,
    workingHoursMaster: state.master.workingHoursMaster,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async creatreRecord(data) {
      await dispatch(MainAsyncActions.creatreRecord(data))
    },
  })
)
export class DetailsRecord extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {

  state = {
    activeDate: -1,
    activeTime: -1,
    comment: '',
  }

   createRecord = async (): Promise<void> => {
    const {
      selectedServices,
      master,
    } = (this.props.route.params as any)

    //@ts-ignore
    const selectedServicesFlat = Object.values(selectedServices).flat()
    await this.props.creatreRecord({
      point_id: this.props.userCity.id,
      datetime: moment().format('DDDD-MM-DD hh:mm:Ss'), 
      master: master.id,
      nomenclatures: selectedServicesFlat.map(item => {
        return {
          // priceListId: 4,
          count: 1,
          cost: item.cost,
          externalId: item.externalId,
          name: item.name,

        }
      })
  
    })
  }

  onChangeCommentHandler = (comment: string): void => {
    this.setState({ comment })
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  render() {

    const container = styleSheetFlatten([
      styles.container,
      {
        marginTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.05
      }
    ])

    console.log('oorro', this.props.route.params)

    const {
      salon,
      selectedServices,
      countService,
      priceService,
      master,
    } = (this.props.route.params as any)

    //@ts-ignore
    const selectedServicesFlat = Object.values(selectedServices).flat()

    const details = [
      {
        key: 'Дата записи',
        value: '15.01.2021 в 14:30',
        boldValue: false,
      },
      {
        key: 'Салон',
        value: salon?.address,
        boldValue: false,
      },
      {
        key: 'Специалист',
        value: master?.name,
        boldValue: false,
      },
      {
        key: 'Стоимость услуг',
        value: `${priceService} ₽`,
        boldValue: true,
      },
      {
        key: 'Длительность',
        value: '70 мин.',
        boldValue: true,
      },
    ]

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
              Детали записи
            </Text>
          </View>
          <View style={styles.serviceContainer}>
            {
              selectedServicesFlat.map(item => {
                return (
                  <View style={styles.sertiveListItem}>
                    <Text style={styles.serviceTitle}>
                      {item.name}
                    </Text>
                    <View style={styles.serviceBottomContainer}>
                      <Text style={styles.serviceTime}>
                        30 мин
                    </Text>
                      <Text style={styles.serviceMoney}>
                        {item.cost} ₽
                    </Text>
                    </View>
                  </View>
                )
              })
            }
          <View style={styles.serviceDevider} />
          
          </View>
          <View style={styles.detailsContainer}>
            {
              details.map(item => {
                return (
                  <View style={styles.detailsListItem}>
                    <Text style={styles.detailsListTitle}>
                        {item.key}
                      </Text>
                      <Text style={item.boldValue ? styles.detailsListValueBold : styles.detailsListValue}>
                        {item.value}
                      </Text>
                  </View>
                )
              })
            }
          </View>
          <TextInput 
            placeholder="Комментарий к записи" 
            placeholderTextColor={Color.gray} 
            style={styles.postComment}
            multiline
            value={this.state.comment}
            onChangeText={this.onChangeCommentHandler}
            maxLength={80}
          />
        </ScrollView>
        <View style={styles.calculationsContainer}>
          <CommonButton
            title='ЗАПИСАТЬСЯ'
            styleButton={styles.makeAppointment}
            onPress={this.createRecord}
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
    paddingHorizontal: windowWidth * 0.04,
  }),
  dateTimeContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037,
    paddingRight: windowWidth * 0.04,
  }),
  arrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  serviceContainer: style.view({
    marginTop: windowWidth * 0.03,
  }),
  sertiveListItem: style.view({
    marginTop: windowWidth * 0.04,
  }),
  serviceTitle: style.text({
    fontFamily: fonts.robotoRegular,
    color: Color.yankeesBlue,
    fontSize: windowWidth * 0.037,
    marginBottom: windowWidth * 0.015,
  }),
  serviceBottomContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  serviceTime: style.text({
    color: Color.gray,
  }),
  serviceMoney: style.text({

  }),
  serviceDevider: style.view({
    backgroundColor: Color.smokyWhite,
    height: windowWidth * 0.0025,
    width: '100%',
    marginTop: windowWidth * 0.025,
  }),
  detailsContainer: style.view({
    marginTop: windowWidth * 0.04,
  }),
  detailsListItem: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: windowWidth * 0.06,
  }),
  detailsListTitle: style.text({
    color: Color.black600,
    fontFamily: fonts.robotoRegular,
  }),
  detailsListValue: style.text({
    width: '50%',
    textAlign: 'right',
    color: Color.yankeesBlue,
    fontFamily: fonts.robotoRegular,
  }),
  postComment: style.view({
    borderColor: Color.gray100,
    borderWidth: windowWidth * 0.0025,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.03,
    paddingHorizontal:  windowWidth * 0.04,
    paddingTop: windowWidth * 0.02,
  }),
  detailsListValueBold: style.text({
    width: '50%',
    textAlign: 'right',
    color: Color.yankeesBlue,
    fontFamily: fonts.robotoBold,
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
  calculationsContainer: style.view({
    width: windowWidth,
    height: windowWidth * 0.216,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: windowWidth * 0.06,
  }),
  makeAppointment: style.view({
    width: windowWidth * 0.914,
    height: windowWidth * 0.1
  }),
  calculationsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular
  }),
})
