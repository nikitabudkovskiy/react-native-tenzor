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
  isLongDevices,
  windowHeight,
} from 'app/system/helpers'
import { StringHelper } from 'app/system/helpers/stringHelper'
import { CommonModal } from 'app/module/global/view/CommonModal'
import { isEmpty } from 'lodash'

interface IProps {

}

interface IState {
  searchValue: string
}

interface IHairDreesserItems {
  name: string
  position: string
  image: ImageURISource
}

export class Masters extends PureComponent<IProps, IState> {
  state = {
    searchValue: '',
  }

  searchMaster = (searchValue: string) => {
    this.setState({ searchValue })
  }

  render() {

    const container = styleSheetFlatten([
      styles.container,
      {
        marginTop: isLongDevices ? windowWidth * 0.08 : windowWidth * 0.05
      }
    ])

    const masterList = drawerList
      .filter(items => StringHelper.search(items.name, this.state.searchValue))

    return (
      <ScrollView
        scrollEnabled
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={container} >
          <View style={styles.searchMasterContainer}>
            <TouchableOpacity>
              <Image
                source={ImageRepository.masterArrowLeft}
                style={styles.masterArrowLeft}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.masterInput}
              placeholder="Введите имя мастера"
              placeholderTextColor={Color.gray}
              onChangeText={this.searchMaster}
              value={this.state.searchValue}
            />
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

  }),
  container: style.view({
    alignItems: 'center',
    flex: 1,
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