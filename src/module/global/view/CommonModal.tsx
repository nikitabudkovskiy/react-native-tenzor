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
import Modal from 'react-native-modal'
import { CommonButton } from './CommonButton'

interface IProps {

}

interface IState {

}

export class CommonModal extends PureComponent<IProps, IState>{
  render() {
    return (
      <Modal isVisible={true}>
        <View style={styles.container}>
          <Text style={styles.modalTitle}>
            Отменить запись?
          </Text>
          <Text style={styles.modalDescription}>
            Вы точно хотите отменить запись?
          </Text>
          <View style={styles.buttonsContainer}>
            <CommonButton 
              title='Нет'
              styleButton={styles.noButton}
              styleText={styles.noButtonTitle}
            />
            <CommonButton 
              title='Да'
              styleButton={styles.yesButton}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    width: windowWidth * 0.92,
    height: windowWidth * 0.466,
    backgroundColor: Color.white,
    paddingHorizontal: windowWidth * 0.042,
    borderRadius: windowWidth * 0.042
  }),
  noButton: style.view({
    backgroundColor: Color.white,
    borderWidth: windowWidth * 0.0025,
    borderColor: Color.electricOrange,
    width: windowWidth * 0.394,
    height: windowWidth * 0.133,
  }),
  noButtonTitle: style.text({
    color: Color.electricOrange
  }),
  yesButton: style.view({
    borderWidth: windowWidth * 0.0025,
    borderColor: Color.electricOrange,
    width: windowWidth * 0.394,
    height: windowWidth * 0.133,
  }),
  buttonsContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: windowWidth * 0.069,
  }),
  modalTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.053,
    paddingTop: windowWidth * 0.042
  }),
  modalDescription: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    paddingTop: windowWidth * 0.069,
  }),
})