import React, { PureComponent } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, } from 'react-native'
import { styleSheetCreate, style, fonts, Color, windowWidth, isLongDevices, styleSheetFlatten, ImageRepository } from 'app/system/helpers'
import { CommonButton } from 'app/module/global/view'
import BottomSheet from '@gorhom/bottom-sheet'

interface IProps {

}

interface IState {
  selectedСity: string
}

export class ChooseCity extends PureComponent<IProps, IState> {

  state = {
    selectedСity: '',
  }

  onChangeCityHandler = (selectedСity: string) => {
    if (this.state.selectedСity === selectedСity) {
      this.setState({ selectedСity: '' })
      return
    }
    this.setState({ selectedСity })
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
          index={0}
          snapPoints={['50%']}
          onChange={this.handleSheetChanges}
          enableHandlePanningGesture
        >
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetText}>
              Удовлетварительно
            </Text>
            <Text style={styles.bottomSheetYourMark}>
            Ваша оценка
            </Text>
            <View style={styles.bottomSheetYourMarkContainer}>

            </View>
          </View>
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
  bottomSheetContent: style.view({
    paddingHorizontal: windowWidth * 0.04,
    borderTopLeftRadius: windowWidth * 0.04,
    borderTopRightRadius: windowWidth * 0.04,
    backgroundColor: 'red',
    flex: 1,
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
    // color: Color.gray,
    // fontSize: windowWidth * 0.035,
    // textAlign: 'center',
    // fontFamily: fonts.robotoBold,
    // marginTop: windowWidth * 0.04,
  }),
})