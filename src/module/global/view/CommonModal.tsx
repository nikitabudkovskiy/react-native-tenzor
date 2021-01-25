import React, { PureComponent } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
} from 'app/system/helpers'
import Modal from 'react-native-modal'
import { CommonButton } from './CommonButton'

interface IProps {
  showModal: boolean
}

interface IState {

}

export class CommonModal extends PureComponent<IProps, IState>{
  render() {
    const { 
      showModal,
    } = this.props

    return (
      <Modal isVisible={showModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Отменить запись?
          </Text>
          <Text style={styles.modalDescription}>
            Вы точно хотите отменить запись?
          </Text>
          <View style={styles.modalButtonsContainer}>
            <CommonButton 
              title='Нет'
              styleButton={styles.modalNoButton}
              styleText={styles.modalNoButtonTitle}
            />
            <CommonButton 
              title='Да'
              styleButton={styles.modalYesButton}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = styleSheetCreate({
  modalContainer: style.view({
    width: windowWidth * 0.92,
    height: windowWidth * 0.466,
    backgroundColor: Color.white,
    paddingHorizontal: windowWidth * 0.042,
    borderRadius: windowWidth * 0.042
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
  modalNoButton: style.view({
    backgroundColor: Color.white,
    borderWidth: windowWidth * 0.0025,
    borderColor: Color.electricOrange,
    width: windowWidth * 0.394,
    height: windowWidth * 0.133,
  }),
  modalNoButtonTitle: style.text({
    color: Color.electricOrange
  }),
  modalYesButton: style.view({
    borderWidth: windowWidth * 0.0025,
    borderColor: Color.electricOrange,
    width: windowWidth * 0.394,
    height: windowWidth * 0.133,
  }),
  modalButtonsContainer: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: windowWidth * 0.069,
  }),
})