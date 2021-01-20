import React, { PureComponent } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import {
  styleSheetCreate,
  fonts,
  Color,
  style,
  windowWidth,
} from 'app/system/helpers'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useState } from 'react';



const CELL_COUNT = 6;



export const AccessCode = (navigation: any) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>
        Пароль отправлен {'\n'} в СМС
      </Text>
      <Text style={styles.description}>
        Мы отправили СМС с паролем {'\n'} на номер {''}
        <Text style={styles.descriptionPhoneNumber}>
          +7(925)123-45-67
          </Text>
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
     
      {/* <TouchableOpacity
        style={styles.forgetPasswordButton}
        onPress={() => {
          navigation.navigate('AccessCode')
        }}
      >
        <Text style={styles.forgetPasswordTitle}>
          Я не помню пароль
        </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const setTimePassed = () => {
  
}

const styles = styleSheetCreate({
  root: style.view({
    paddingHorizontal: windowWidth * 0.12,
    alignItems: 'center',
    height: '100%'
  }),
  title: style.text({
    textAlign: 'center',
    fontSize: windowWidth * 0.064,
    fontFamily: fonts.robotoBold,
    paddingTop: windowWidth * 0.17
  }),
  descriptionPhoneNumber: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.048,
  }),
  description: style.text({
    fontSize: windowWidth * 0.048,
    fontFamily: fonts.robotoRegular,
    paddingTop: windowWidth * 0.04,
    textAlign: 'center',
  }),
  cellRoot: style.view({
    marginTop: windowWidth * 0.09,
    width: windowWidth * 0.1,
    height: windowWidth * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Color.gray100,
    borderBottomWidth: 2,
    borderRadius: 1,
    marginHorizontal: windowWidth * 0.021,
  }),
  cellText: style.text({
    color: Color.black,
    fontSize: windowWidth * 0.064,
    textAlign: 'center',
  }),
  focusCell: style.view({
    borderBottomColor: Color.black,
    borderBottomWidth: 2,
  }),
  forgetPasswordButton: style.view({
    position: 'absolute',
    bottom: windowWidth * 0.06,
  }),
  forgetPasswordTitle: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.electricOrange,
  }),
})

