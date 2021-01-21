import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  TextStyle
} from 'react-native'
import {
  styleSheetCreate,
  styleSheetFlatten,
  style,
  windowWidth,
  Color,
} from 'app/system/helpers'

interface IProps extends TextInputProps {
  label: string
  textStyle?: TextStyle
  inputStyle?: TextStyle,
  containerStyle?: TextStyle

}

interface IState {

}

export class CommonInput extends PureComponent<IProps, IState>{
  render() {
    const {
      label,
      textStyle,
      inputStyle,
      containerStyle,

    } = this.props

    const containerFlatten = styleSheetFlatten([
      styles.container,
      containerStyle
    ])

    const textFlatten = styleSheetFlatten([
      textStyle,
      styles.text,
    ])

    const inputFlatten = styleSheetFlatten([
      styles.textInput,
      inputStyle,
    ])

    return (
      <View style={containerFlatten}>
        <TextInput
          style={inputFlatten}
          {...this.props}
        />
        <Text style={textFlatten}>
          {label}
        </Text>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  container: style.view({
    width: windowWidth * 0.914,
    height: windowWidth * 0.133,
  }),
  textInput: style.text({
    borderWidth: windowWidth * 0.0026,
    borderRadius: windowWidth * 0.032,
    paddingHorizontal: windowWidth * 0.04,
    borderColor: Color.gray
  }),
  text: style.text({
    position: 'absolute',
    top: windowWidth * -0.02,
    left: windowWidth * 0.04,
    backgroundColor: Color.white,
    paddingHorizontal: windowWidth * 0.01,
    fontSize: windowWidth * 0.03,
    color: Color.gray
  })
})
