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
import { CommonButton } from 'app/module/global/view/CommonButton'

interface IProps {

}

interface IState {

}

interface IDateTime {
  date: number
  month: string
  dayOfWeek: string
  status: string
}

interface ITime {
  time: string
  timeStatus: string
}

export class TimeSelect extends PureComponent<IProps, IState> {
  render() {

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

    const timeContainerFlatten = styleSheetFlatten([
      styles.timeContainer,
      {
        opacity: 0.5,
      }
    ])

    return (
      <View style={styles.mainContainer}>
        <ScrollView
          scrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={container}
        >
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity>
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
              dateTimeList.map(item => {
                return (
                  item.status == 'active'
                    ? (
                      <TouchableOpacity
                        key={Math.random().toString()}
                        style={dateContainerFlatten}>
                        <View style={styles.monthDateContainer}>
                          <Text style={styles.monthDateNumberTitle}>
                            {item.date}
                          </Text>
                          <Text style={styles.monthDateTitle}>
                            {item.month}
                          </Text>
                        </View>
                        <Text style={styles.dayOfWeek}>
                          {item.dayOfWeek}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        key={Math.random().toString()}
                        style={styles.dateContainer}>
                        <View style={styles.monthDateContainer}>
                          <Text style={monthDateNumberTitleFlatten}>
                            {item.date}
                          </Text>
                          <Text style={monthDateTitleFlatten}>
                            {item.month}
                          </Text>
                        </View>
                        <Text style={monthDateTitleFlatten}>
                          {item.dayOfWeek}
                        </Text>
                      </TouchableOpacity>
                    )
                )
              })
            }
          </ScrollView>
          <View style={styles.timeContent}>
            {
              timeList.map(item => {
                return (
                  item.timeStatus == 'active'
                    ? (
                      <View
                        key={Math.random().toString()}
                        style={styles.timeContainer}>
                        <Text style={styles.timeTitle}>
                          {item.time}
                        </Text>
                      </View>
                    ) : (
                      <View
                        key={Math.random().toString()}
                        style={timeContainerFlatten}>
                        <Text style={styles.timeTitle}>
                          {item.time}
                        </Text>
                      </View>
                    )
                )
              })
            }
          </View>
        </ScrollView>
        <View style={styles.calculationsContainer}>
          <Text style={styles.calculationsTitle}>
            Услуг: 3 на 600 ₽ / 90 мин
            </Text>
          <CommonButton
            title='ЗАПИСАТЬСЯ'
            styleButton={styles.makeAppointment}
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
    width: windowWidth * 1.2,
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
  timeTitle: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04
  }),
  timeContent: style.view({
    paddingHorizontal: windowWidth * 0.048,
    paddingBottom: windowWidth * 0.085
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

const dateTimeList: IDateTime[] = [
  {
    date: 18,
    month: 'Янв',
    dayOfWeek: 'Пт',
    status: 'active'
  },
  {
    date: 19,
    month: 'Янв',
    dayOfWeek: 'Пн',
    status: 'inactive'
  },
  {
    date: 22,
    month: 'Янв',
    dayOfWeek: 'Пт',
    status: 'inactive'
  },
  {
    date: 25,
    month: 'Янв',
    dayOfWeek: 'Пн',
    status: 'inactive'
  },
  {
    date: 26,
    month: 'Янв',
    dayOfWeek: 'Вт',
    status: 'inactive'
  },
  {
    date: 28,
    month: 'Янв',
    dayOfWeek: 'Чт',
    status: 'inactive'
  },
]


const timeList: ITime[] = [
  {
    time: '09:00',
    timeStatus: 'active'
  },
  {
    time: '10:00',
    timeStatus: 'active'
  },
  {
    time: '11:00',
    timeStatus: 'inactive'
  },
  {
    time: '12:00',
    timeStatus: 'active'
  },
  {
    time: '13:00',
    timeStatus: 'active'
  },
  {
    time: '14:00',
    timeStatus: 'active'
  },
  {
    time: '15:00',
    timeStatus: 'inactive'
  },
  {
    time: '16:00',
    timeStatus: 'active'
  },
  {
    time: '17:00',
    timeStatus: 'active'
  },
  {
    time: '18:00',
    timeStatus: 'inactive'
  },
  {
    time: '19:00',
    timeStatus: 'active'
  },
  {
    time: '20:00',
    timeStatus: 'active'
  },
]