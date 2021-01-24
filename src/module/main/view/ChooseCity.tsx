import React, { PureComponent } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, } from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  isLongDevices,
  styleSheetFlatten,
  ImageRepository,
  windowHeight
} from 'app/system/helpers'
import { CommonButton, CommonInput } from 'app/module/global/view'
// import BottomSheet from '@gorhom/bottom-sheet'
import BottomSheet from 'reanimated-bottom-sheet'
import Svg, { Path } from 'react-native-svg'

interface IProps {

}

interface IState {
  selectedСity: string
  masterAssessment: number
  yourOpinion: string
  inputIsCorrect: boolean
}

const masterAssessment = [1, 2, 3, 4, 5]

export class ChooseCity extends PureComponent<IProps, IState> {

  state = {
    selectedСity: '',
    masterAssessment: 0,
    yourOpinion: '',
    inputIsCorrect: true,
  }

  onChangeCityHandler = (selectedСity: string): void => {
    if (this.state.selectedСity === selectedСity) {
      this.setState({ selectedСity: '' })
      return
    }
    this.setState({ selectedСity })
  }

  onChangeMasterAssessmentHandler = (masterAssessment: number): void => {
    this.setState({ masterAssessment })
  }

  onChangeYourOpinionHandler = (yourOpinion: string): void => {
    this.setState({ yourOpinion })
  }

  checkYourOpinionHandler = (): void => {
    this.setState({ inputIsCorrect: !!this.state.yourOpinion })
  }

  handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index)
  }

  render(): JSX.Element {

    const list = ['Ижевск', 'Абакан', 'Адлер']

    const mainContainer = styleSheetFlatten([
      styles.mainContainer,
      {
        paddingTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.08,
      }
    ])


    const nameInputFlatten = styleSheetFlatten([
      {
        borderColor: this.state.inputIsCorrect 
          ? Color.gray 
          : Color.electricOrange
      }
    ])

    return (
      <View style={mainContainer}>
        <ScrollView
          scrollEventThrottle={16}
          style={styles.container}
          bounces={false}
        >
          <Text style={styles.title}>
            Выберите город
          </Text>
          {
            list.map((item, index) => {
              return (
                <View key={Math.random().toString()}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={this.onChangeCityHandler.bind(this, item)}
                  >
                    <Text>
                      {item}
                    </Text>
                    {
                      this.state.selectedСity === item
                        ? (
                          <Image
                            source={ImageRepository.chooseCityCheck}
                            style={styles.cardCheck}
                            resizeMode="contain"
                          />
                        )
                        : null
                    }
                  </TouchableOpacity>
                  {
                    list.length - 1 === index
                      ? null
                      : (
                        <View style={styles.cardDevider} />
                      )
                  }
                </View>
              )
            })
          }

          <CommonButton
            disabled={!this.state.selectedСity}
            title="Выбрать город"
            styleButton={styles.chooseCity}
          />
        </ScrollView>
        <BottomSheet
          // ref={bottomSheetRef}
          initialSnap={1}
          snapPoints={[windowHeight * 0.48, 0]}
          renderHeader={() => {
            return (
              <View style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetHeaderButton}>

                </View>
              </View>
            )
          }}
          renderContent={() => {
            return (
              <View style={styles.bottomSheetContent}>
              <Text style={styles.bottomSheetText}>
                Удовлетварительно
              </Text>
              <Text style={styles.bottomSheetYourMark}>
                Ваша оценка
              </Text>
              <View style={styles.bottomSheetYourMarkContainer}>
                {
                  masterAssessment.map(item => {
                    return (
                      <TouchableOpacity
                        onPress={this.onChangeMasterAssessmentHandler.bind(this, item)}
                        key={item}
                        disabled={this.state.masterAssessment === item}
                      >
                        <Svg 
                          height={windowWidth * 0.1} 
                          width={windowWidth * 0.1}
                        >
                          <Path
                            d="M17.9689 1.1865C18.5231 -0.193677 20.477 -0.193676 21.0312 1.1865L25.3519 11.9458L36.9197 12.7302C38.4036 12.8308 39.0074 14.689 37.866 15.6426L28.9685 23.0766L31.7972 34.3207C32.16 35.7631 30.5793 36.9115 29.3197 36.1207L19.5001 29.9558L9.68041 36.1207C8.42078 36.9115 6.84009 35.7631 7.20295 34.3207L10.0316 23.0766L1.13407 15.6426C-0.00728244 14.689 0.596486 12.8308 2.08038 12.7302L13.6483 11.9458L17.9689 1.1865Z"
                            fill={this.state.masterAssessment >= item ? Color.electricOrange : Color.gray200}
                          />
                        </Svg>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
              <CommonInput
                label='Ваше имя'
                containerStyle={styles.bottomSheetInput}
                onChangeText={this.onChangeYourOpinionHandler}
                onBlur={this.checkYourOpinionHandler}
                inputStyle={nameInputFlatten}
              />
              <CommonButton 
                title="Готово"
                styleButton={styles.bottomSheetSendButton}
              />
            </View>
            )
          }}
        >
        </BottomSheet>
      </View>
    )
  }
}
const styles = styleSheetCreate({
  mainContainer: style.view({
    backgroundColor: Color.white,
    flex: 1,
  }),
  container: style.view({
    // backgroundColor: 
    paddingHorizontal: windowWidth * 0.04,
  }),
  title: style.text({
    fontFamily: fonts.robotoBold,
    color: Color.black,
    fontSize: windowWidth * 0.05,
    marginBottom: windowWidth * 0.03,
    textAlign: 'center',
  }),
  card: style.view({
    paddingVertical: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  cardDevider: style.view({
    borderBottomWidth: windowWidth * 0.0025,
    borderBottomColor: Color.gray100,
  }),
  cardCheck: style.view({
    width: windowWidth * 0.038,
    height: windowWidth * 0.032,
    marginRight: windowWidth * 0.02,
  }),
  chooseCity: style.view({
    marginBottom: windowWidth * 0.1,
    marginTop: windowWidth * 0.02,
  }),
  bottomSheetHeader: style.view({
    backgroundColor: Color.white,
    alignItems: 'center',
    borderTopLeftRadius: windowWidth * 0.04,
    borderTopRightRadius: windowWidth * 0.04,
    //FIXME add margin for hide header bottom sheet
   marginTop: windowWidth * 0.06,
  }),
  bottomSheetHeaderButton: style.view({
    width: windowWidth * 0.1,
    height: windowWidth * 0.01, 
    backgroundColor: Color.gray, 
    borderRadius: windowWidth * 0.1,
    marginTop: windowWidth * 0.04,
  }),
  bottomSheetContent: style.view({
    paddingHorizontal: windowWidth * 0.04,
    borderTopLeftRadius: windowWidth * 0.04,
    borderTopRightRadius: windowWidth * 0.04,
    // backgroundColor: Color.electricOrange,
    alignItems: 'center',
  }),
  bottomSheetText: style.text({
    color: Color.chineseBlack,
    fontSize: windowWidth * 0.058,
    textAlign: 'center',
    fontFamily: fonts.robotoBold,
    marginTop: windowWidth * 0.04,
  }),
  bottomSheetYourMark: style.text({
    color: Color.gray,
    fontSize: windowWidth * 0.035,
    textAlign: 'center',
    fontFamily: fonts.robotoBold,
    marginTop: windowWidth * 0.04,
  }),
  bottomSheetYourMarkContainer: style.text({
    flexDirection: 'row',
    marginTop: windowWidth * 0.036,
    justifyContent: 'space-between',
    width: '75%',
  }),
  bottomSheetInput: style.view({
    marginTop: windowWidth * 0.09,
    marginBottom: windowWidth * 0.3,
  }),
  bottomSheetSendButton: style.view({
    width: '100%',
  }),
})