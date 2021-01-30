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
} from 'app/system/helpers'
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  selectedСity: string
}

const list = ['Ижевск', 'Абакан', 'Адлер']

export class ChooseCity extends PureComponent<IProps, IState> {

  state = {
    selectedСity: '',
  }

  onChangeCityHandler = (selectedСity: string): void => {
    if (this.state.selectedСity === selectedСity) {
      this.setState({ selectedСity: '' })
      return
    }
    this.setState({ selectedСity })
  }

  goToMainTabBarHandler = (): void => {
    this.props.navigation.replace(ListPages.MainTab)
  }
  
  render(): JSX.Element {

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
            onPress={this.goToMainTabBarHandler}
          />
        </ScrollView>
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
 
})