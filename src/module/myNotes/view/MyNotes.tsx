import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageURISource,
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
import { StackNavigationProp } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'
import { IMainState } from 'app/module/main/store/mainState'
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { MyNotesAsyncActions } from '../store/myNotesAsyncActions'

interface IDispatchProps {
  getOrdersHistory(data: IGetOrdersHistoryRequest): Promise<void>
}

interface IStateProps extends IIsLoadingAndError {
  myNotes: IGetOrdersHistoryResponce
}

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {

}

interface INote {
  date: string
  status: string
  image: ImageURISource
  hairDresserName: string
  address: string
  noteNumber: string
  time: number,
  price: number
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    isLoading: state.myNotes.isLoading,
    error: state.main.error,
    myNotes: state.myNotes.myNotes,
  }),
  (dispatch: ThunkDispatch<IMainState, void, any>): IDispatchProps => ({
    async getOrdersHistory(data) {
      await dispatch(MyNotesAsyncActions.getOrdersHistory(data))
    },
  })
)
export class MyNotes extends PureComponent<IProps & IDispatchProps & IStateProps, IState> {

  async componentDidMount(): Promise<void> {
    // await this.props.getOrdersHistory({
    //   order_id: 
    // })
  }

  goToNoteDetailsHandler = (): void => {
    this.props.navigation.push(ListPages.NoteDetails)
  }

  render() {

    console.log(this.props)

    const container = styleSheetFlatten([
      styles.container,
      {
        paddingTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.08,
      }
    ])

    const cancelStatusFlatten = styleSheetFlatten([
      styles.statusContainer,
      {
        backgroundColor: Color.electricOrange,
        width: windowWidth * 0.208,
        height: windowWidth * 0.05
      }
    ])

    const finishlStatusFlatten = styleSheetFlatten([
      styles.statusContainer,
      {
        backgroundColor: Color.fauxLime,
        width: windowWidth * 0.23,
        height: windowWidth * 0.05
      }
    ])

    const cancelStatusTitleFlatten = styleSheetFlatten([
      styles.statusTitle,
      {
        color: Color.white
      }
    ])

    return (
      <View style={container}>
        <ScrollView
          scrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headerTitle}>
            Мои записи
        </Text>
          <View style={styles.noteContent}>
            {
              noteList.map(items => {
                return (
                  <TouchableOpacity 
                    onPress={this.goToNoteDetailsHandler}
                    style={styles.noteContainer}
                    key={Math.random().toString()}
                  >
                    <View style={styles.noteTitleContainer}>
                      <Text style={styles.noteTimeTitle}>
                        {items.date}
                      </Text>
                      {
                        items.status == 'Ожидает'
                          ? (
                            <View style={styles.statusContainer}>
                              <Text style={styles.statusTitle}>
                                {items.status}
                              </Text>
                            </View>
                          ) : items.status == 'Отменена'
                            ? (
                              <View style={cancelStatusFlatten}>
                                <Text style={cancelStatusTitleFlatten}>
                                  {items.status}
                                </Text>
                              </View>
                            ) : (
                              <View style={finishlStatusFlatten}>
                                <Text style={cancelStatusTitleFlatten}>
                                  {items.status}
                                </Text>
                              </View>
                            )

                      }
                    </View>
                    <View style={styles.noteDescriptionConteiner}>
                      <Image
                        style={styles.master}
                        source={items.image}
                      />
                      <View style={styles.hairDresserInfoContainer}>
                        <Text style={styles.hairDresserName}>
                          {items.hairDresserName}
                        </Text>
                        <Text style={styles.hairDresserAddress}>
                          {items.address}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.footerNoteContainer}>
                      <Text style={styles.footerNoteNumber}>
                        Запись №{items.noteNumber}
                      </Text>
                      <View style={styles.footerTimePriceContainer}>
                        <Text style={styles.footerNoteTime}>
                          {items.time} мин
                      </Text>
                        <Text style={styles.footerNotePrice}>
                          {items.price} ₽
                      </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    paddingHorizontal: windowWidth * 0.021,
    backgroundColor: Color.white,
    height: '100%',
    paddingBottom: windowWidth * 0.2,
  }),
  headerTitle: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingTop: windowWidth * 0.037,
  }),
  noteContent: style.view({
    alignItems: 'center',
    paddingTop: windowWidth * 0.058,
    marginBottom: windowWidth * 0.03,
  }),
  noteTitle: style.view({
    alignItems: 'center'
  }),
  statusContainer: style.view({
    paddingHorizontal: windowWidth * 0.02,
    height: windowWidth * 0.048,
    backgroundColor: Color.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.296
  }),
  statusTitle: style.text({
    fontSize: windowWidth * 0.0346,
    fontFamily: fonts.robotoBold,
    color: Color.fauxLime,
  }),
  noteTitleContainer: style.view({
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingTop: windowWidth * 0.032
  }),
  noteTimeTitle: style.text({
    fontSize: windowWidth * 0.048,
    fontFamily: fonts.robotoBold
  }),
  noteContainer: style.view({
    width: windowWidth * 0.957,
    height: windowWidth * 0.352,
    backgroundColor: Color.white,
    paddingHorizontal: windowWidth * 0.042,
    justifyContent: 'space-evenly',
    borderRadius: windowWidth * 0.032,
    marginTop: windowWidth * 0.032,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  }),
  master: style.image({
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
  }),
  noteDescriptionConteiner: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: windowWidth * 0.032
  }),
  hairDresserInfoContainer: style.view({
    paddingLeft: windowWidth * 0.032
  }),
  hairDresserName: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular
  }),
  hairDresserAddress: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.gray
  }),
  footerNoteContainer: style.view({
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  footerNoteNumber: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    color: Color.gray,

  }),
  footerNoteTime: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    color: Color.gray,
    paddingRight: windowWidth * 0.032,
  }),
  footerNotePrice: style.text({
    fontSize: windowWidth * 0.048,
    fontFamily: fonts.robotoBold,
  }),
  footerTimePriceContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
  })
})

const noteList: INote[] = [
  {
    date: '22 янв в 12:30',
    status: 'Ожидает',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
  {
    date: '22 янв в 12:30',
    status: 'Отменена',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
  {
    date: '22 янв в 12:30',
    status: 'Завершена',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
  {
    date: '22 янв в 12:30',
    status: 'Завершена',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
  {
    date: '22 янв в 12:30',
    status: 'Завершена',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
  {
    date: '22 янв в 12:30',
    status: 'Завершена',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
  {
    date: '22 янв в 12:30',
    status: 'Завершена',
    image: ImageRepository.masterOne,
    hairDresserName: 'Королева Мария Алексеевна',
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    noteNumber: '1276543',
    time: 30,
    price: 630,
  },
]