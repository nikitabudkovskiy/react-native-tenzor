import React, { PureComponent } from 'react'
import { Image, ImageBackground, View, } from 'react-native'
import {
  styleSheetCreate,
  style,
  ImageRepository,
  windowWidth,
  windowHeight,
} from 'app/system/helpers'

interface IProps {
  isFloating?: boolean
}

interface IState {

}

export class Loader extends PureComponent<IProps, IState>{
  render() {
    return (
      <ImageBackground
        source={ImageRepository.loaderBackground}
        style={styles.container}
      >
        <View style={styles.darkeningСontent}>
          {/* <Image
            source={ImageRepository.loaderLogo}
            style={styles.image}
            resizeMode="contain"
          /> */}
        </View>
      </ImageBackground>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    flex: 1,
  }),
  darkeningСontent: style.view({
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  image: style.image({
    width: windowWidth * 0.75,
    height: windowWidth * 0.53,
  }),
})