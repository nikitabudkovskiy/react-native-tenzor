import React, { PureComponent } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageURISource,
  TextInput,
  Animated,
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
  windowHeight,
  hitSlop,
} from 'app/system/helpers'
import { StringHelper } from 'app/system/helpers/stringHelper'
import { isEmpty } from 'lodash'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

interface IProps {
  navigation: BottomTabNavigationProp<any>
}

interface IState {
  searchValue: string
  animatedMarginLeft: Animated.Value
}

interface IHairDreesserItems {
  name: string
  position: string
  image: ImageURISource
}

export class Masters extends PureComponent<IProps, IState> {
  refTextInput: any

  state = {
    searchValue: '',
    animatedMarginLeft: new Animated.Value(0)
  }

  searchMasterHandler = (searchValue: string): void => {
    this.setState({ searchValue })
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  onFocusInputHandler = (): void => {
    Animated.timing(this.state.animatedMarginLeft, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    })
    .start()
    setTimeout(() => {
      this.refTextInput.focus()
    }, 700)
  }

  onBlurInputHandler = (): void => {
    this.refTextInput.blur()
    Animated.timing(this.state.animatedMarginLeft, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    })
    .start()
  }

  refTextInputHadler = (ref: any) => this.refTextInput = ref 

  render() {

    const container = styleSheetFlatten([
      styles.container,
      {
        marginTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.05
      }
    ])

    const searchMasterInputBlur = styleSheetFlatten([
      styles.searchMasterInputBlur,
      {
        marginLeft: this.state.animatedMarginLeft.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -windowWidth * 0.93],
        }),
      }
    ])

    const masterList = drawerList
      .filter(items => StringHelper.search(items.name, this.state.searchValue))

    return (
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={container} >
          <View style={styles.searchMasterContainer}>
            <Animated.View style={searchMasterInputBlur}>
              <Text style={styles.searchMasterTitle}>
                Наши мастера
              </Text>
              <TouchableOpacity
                hitSlop={hitSlop}
                onPress={this.onFocusInputHandler}
              >
                <Image
                  source={ImageRepository.masterSearch}
                  style={styles.searchMasterSearch}
                />
              </TouchableOpacity>
            </Animated.View>
           
            <View style={styles.searchMasterInputFocus}> 
            <TouchableOpacity
              onPress={this.goBackHandler}
            >
              <Image
                source={ImageRepository.masterArrowLeft}
                style={styles.masterArrowLeft}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.masterInput}
              placeholder="Введите имя мастера"
              placeholderTextColor={Color.gray}
              onChangeText={this.searchMasterHandler}
              value={this.state.searchValue}
              ref={this.refTextInputHadler}
              onBlur={this.onBlurInputHandler}
            />
            </View>
          </View>
          {
            !isEmpty(masterList)
            ? masterList.map(items => {
              return (
                <TouchableOpacity 
                key={items.name}
                style={styles.hairDresserContainer}>
                  <Image
                    source={items.image}
                    style={styles.master}
                  />
                  <View style={styles.hairDresserInfoContainer}>
                    <Text style={styles.hairDresserName}>
                      {items.name}
                    </Text>
                    <Text style={styles.hairDresserPosition}>
                      {items.position}
                    </Text>
                    <View style={styles.starContainer}>
                      {
                        [1, 2, 3, 4, 5].map(item => {
                          return (
                            <Image
                              key={item}
                              source={ImageRepository.masterStar}
                              style={styles.masterStar}
                            />
                          )
                        })
                      }
                    </View>
                  </View>
                  <Image
                    source={ImageRepository.masterArrowRight}
                    style={styles.masterArrowRight}
                  />
                </TouchableOpacity>
              )
            }) 
            : (
              <View style={styles.nothingFound}>
                <Text style={styles.nothingFoundText}>
                  Ничего не найдено
                </Text>
              </View>
            )
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = styleSheetCreate({
  mainContainer: style.view({
    backgroundColor: Color.white,
    paddingBottom: windowWidth * 0.26
  }),
  container: style.view({
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: windowWidth * 0.04,
  }),
  hairDresserContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.914,
    marginTop: windowWidth * 0.064,
  }),
  master: style.image({
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
  }),
  masterStar: style.image({
    width: windowWidth * 0.0395,
    height: windowWidth * 0.0426,
    marginRight: windowWidth * 0.007
  }),
  hairDresserName: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.04,
  }),
  hairDresserPosition: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),
  hairDresserInfoContainer: style.view({
    paddingLeft: windowWidth * 0.053
  }),
  masterArrowRight: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
    position: 'absolute',
    right: 0,
  }),
  masterInput: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingLeft: windowWidth * 0.085,
    width: windowWidth * 0.83,
  }),
  searchMasterContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: windowWidth * 0.037,
    width: '100%',
    overflow: 'hidden',
    // backgroundColor: 'yellow',
  }),
  searchMasterTitle: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.05,
    color: Color.chineseBlack,
  }),
  searchMasterInputBlur: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',

    // backgroundColor: 'green',
  }),
  searchMasterInputFocus: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'red',
  }),
  searchMasterSearch: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  starContainer: style.view({
    flexDirection: 'row'
  }),
  masterArrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  nothingFound: style.view({
    width: '100%',
    height: windowHeight * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  nothingFoundText: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.05,
  }),
})

const drawerList: IHairDreesserItems[] = [
  {
    name: 'Карамова Рузанна',
    position: 'Парикмахер',
    image: ImageRepository.masterOne
  },
  {
    name: 'Лушникова Анна',
    position: 'Парикмахер-стилист',
    image: ImageRepository.masterTwo
  }
]