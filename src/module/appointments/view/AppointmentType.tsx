import React, { PureComponent } from 'react'
import {
  View,
  Text,
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
  isLongDevices,
  styleSheetFlatten,
} from 'app/system/helpers'

interface IProps {

}

interface IState {

}

export class AppointmentType extends PureComponent<IProps, IState>{

  render() {

    const container = styleSheetFlatten([
      styles.container,
      {
        paddingTop: isLongDevices ? windowWidth * 0.12 : windowWidth * 0.04,
      }
    ])

    return (
      <View style={container}>
        <Text style={styles.appointmentTitle}>
          Выберите тип записи
        </Text>
        <View>
          <TouchableOpacity style={styles.appointmentTypeContainer}>
            <Image
            style={styles.sign} 
            source={ImageRepository.mainPageSign}
            />
            <Text style={styles.appointmentDescription}>
              Записаться на услугу
            </Text>
            <Image
            style={styles.arrowRight} 
            source={ImageRepository.mainPageArrowRight}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.appointmentTypeContainer}>
            <Image
            style={styles.sign} 
            source={ImageRepository.mainPageRecordingMaster}
            />
            <Text style={styles.appointmentDescription}>
              Запись к специалисту
            </Text>
            <Image
            style={styles.arrowRight} 
            source={ImageRepository.mainPageArrowRight}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.appointmentTypeContainer}>
            <Image
            style={styles.sign} 
            source={ImageRepository.mainPageSolariumAppointment}
            />
            <Text style={styles.appointmentDescription}>
              Записаться в солярий
            </Text>
            <Image
            style={styles.arrowRight} 
            source={ImageRepository.mainPageArrowRight}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    height: '100%',
    paddingHorizontal: windowWidth * 0.0426,
    backgroundColor: Color.white
  }),
  appointmentTypeContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center', 
    height: windowWidth * 0.13,
  }),
  sign: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  arrowRight: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
    position: 'absolute',
    right: 0
  }),
  appointmentDescription: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    paddingLeft: windowWidth * 0.061,
  }),
  appointmentTitle: style.text({
    fontSize: windowWidth * 0.053,
    fontFamily: fonts.robotoBold,
    paddingBottom: windowWidth * 0.13,
    paddingTop: windowWidth * 0.037,
  }),

})