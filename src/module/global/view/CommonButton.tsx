import React, { PureComponent } from 'react'
import { 
  Text,
  TextStyle,
  TouchableOpacity, 
  TouchableOpacityProps,
  ViewStyle, 
} from 'react-native'
import {
  styleSheetCreate,
  style,
  Color,
  windowWidth,
  fonts,
  styleSheetFlatten,
} from 'app/system/helpers'

interface IProps extends TouchableOpacityProps {
  title: string
  styleButton?: ViewStyle
  styleText?: TextStyle
}

interface IState {

}

export class CommonButton extends PureComponent<IProps,IState>{

  render() {

    const container = styleSheetFlatten([
      styles.container,
      this.props.styleButton,
      {
        opacity: this.props.disabled ? 0.5 : 1,
      }
    ])

    const text = styleSheetFlatten([
      styles.text,
      this.props.styleText,
    ])

    return (
      <TouchableOpacity
        {...this.props}
        style={container}
      >
        <Text style={text}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    backgroundColor: Color.electricOrange,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: style.text({
    textTransform: 'uppercase',
    fontSize: windowWidth * 0.036,
    color: Color.white,
    fontFamily: fonts.robotoBold,
  }),
})

