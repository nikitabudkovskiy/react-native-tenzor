import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageURISource,
  TextInput
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
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommonModal } from 'app/module/global/view/CommonModal'

interface IProps {
  naviagation: StackNavigationProp<any>
}

interface IState {
  switchModal: boolean
}

export class NoteDetails extends PureComponent<IProps, IState>{
 state = {
  switchModal: false,
 }

  handleCancelButton = () => {
    this.setState({ switchModal: !this.state.switchModal })
  }


  render() {
    return (
      <View style={styles.container}>
        <CommonModal
           showModal={this.state.switchModal}
        />
        <ScrollView
          scrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.noteTimeContainer}>
            <TouchableOpacity>
              <Image
                source={ImageRepository.masterArrowLeft}
                style={styles.masterArrowLeft}
              />
            </TouchableOpacity>
            <Text style={styles.noteHeadTitle}>
              Выберите услугу
          </Text>
          </View>
          <View style={styles.statusContent}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusTitle}>
                Ожидает
          </Text>
            </View>
            <CommonButton
              title='ОТМЕНИТЬ ЗАПИСЬ'
              styleButton={styles.cancelButton}
              styleText={styles.cancelTitle}
              onPress={this.handleCancelButton}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>
              Детали записи
          </Text>
            <View style={styles.serviceContainer}>
              <View style={styles.service}>
                <Text style={styles.serviceTitle}>
                  Модельная/теннис стрижка
              </Text>
                <View style={styles.serviceInfoContainer}>
                  <Text style={styles.serviceTitleInfo}>
                    40 мин
                </Text>
                  <Text style={styles.serviceTitle}>
                    350 ₽
                </Text>
                </View>
              </View>

            </View>
            <View style={styles.serviceFullInfoContainer}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Номер записи
                </Text>
                <Text style={styles.serviceTitle}>
                  №7847
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Дата записи
                </Text>
                <Text style={styles.serviceTitle}>
                  15.01.2021 в 14:30
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Салон
                </Text>
                <Text style={styles.serviceTitle}>
                  ул. 30 лет Победы, 19А
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Телефон
                </Text>
                <Text style={styles.serviceTitle}>
                  +7(922) 692-93-00
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Специалист
                </Text>
                <Text style={styles.specialistInfo}>
                  Королева Мария Алексеевна {'\n'}(Парикмахер)
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Стоимость услуг
                </Text>
                <Text style={styles.priceInfo}>
                  620 ₽
                </Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceTitleInfo}>
                  Длительность
                </Text>
                <Text style={styles.priceInfo}>
                  70 мин.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    paddingHorizontal: windowWidth * 0.042,
    height: '100%'
  }),
  noteTimeContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037,
  }),
  masterArrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  noteHeadTitle: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingLeft: windowWidth * 0.085,
  }),
  statusContainer: style.view({
    width: windowWidth * 0.914,
    height: windowWidth * 0.13,
    backgroundColor: Color.gray700,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.032,
    marginTop: windowWidth * 0.069
  }),
  statusTitle: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.white
  }),
  cancelButton: style.view({
    backgroundColor: Color.white,
    borderColor: Color.electricOrange,
    borderWidth: windowWidth * 0.002,
    marginTop: windowWidth * 0.042
  }),
  cancelTitle: style.text({
    color: Color.electricOrange
  }),
  detailsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold
  }),
  serviceInfoContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: windowWidth * 0.018
  }),
  detailsContainer: style.view({
    paddingTop: windowWidth * 0.042,
  }),
  service: style.view({
    paddingVertical: windowWidth * 0.02
  }),
  serviceContainer: style.view({
    borderTopWidth: windowWidth * 0.002,
    borderBottomWidth: windowWidth * 0.002,
    borderTopColor: Color.gray50,
    borderBottomColor: Color.gray50,
    marginTop: windowWidth * 0.042,
  }),
  serviceFullInfoContainer: style.view({
    height: windowWidth * 1.264,
    justifyContent: 'space-around'
  }),
  serviceInfo: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between'
  }),
  serviceTitleInfo: style.text({
    fontSize: windowWidth * 0.04,
    color: Color.gray600,
    fontFamily: fonts.robotoRegular
  }),
  serviceTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular
  }),
  specialistInfo: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    textAlign: 'right'
  }),
  priceInfo: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoBold
  })
})