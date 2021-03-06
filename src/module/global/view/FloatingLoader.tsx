import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, } from 'react-native'
import {
  styleSheetCreate,
  style,
  ImageRepository,
  windowWidth,
  Color,
} from 'app/system/helpers'

interface IProps {

}

interface IState {

}

export class FloatingLoader extends PureComponent<IProps, IState>{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.darkeningСontent}>
          <Image
            source={ImageRepository.loaderLogo}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    flex: 1,
    backgroundColor: Color.white,
    //@ts-ignore
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  image: style.image({
    width: windowWidth * 0.75,
    height: windowWidth * 0.2,
  }),
})