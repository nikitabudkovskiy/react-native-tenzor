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
  windowHeight,
  ImageRepository,
} from 'app/system/helpers'
import { StringHelper } from 'app/system/helpers/stringHelper'


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
    return (
      <View style={styles.container}>
        <View style={styles.searchMasterContainer}>
          <Image 
            source={ImageRepository.masterArrowLeft}
            style={styles.masterArrowLeft}
          />
          <TextInput
            style={styles.masterInput}
            placeholder="Введите имя мастера"
            onChangeText={this.searchMaster}
            value={this.state.searchValue}
          />
        </View>
        {
          
          drawerList
          .filter(items => StringHelper.search(items.name, this.state.searchValue ))
          .map(items => {
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
        }
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    paddingLeft: windowWidth * 0.042,
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
    color: Color.gray,
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