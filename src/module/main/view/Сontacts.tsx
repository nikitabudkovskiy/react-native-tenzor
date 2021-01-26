import React, { PureComponent } from 'react'
import { 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Text, 
} from 'react-native'
import { 
  styleSheetCreate, 
  style, 
  windowWidth, 
  windowHeight, 
  ImageRepository,
  Color,
  fonts,
} from 'app/system/helpers'
import MapView from 'react-native-maps'
import { CommonButton } from 'app/module/global/view'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

interface IProps {
  navigation: BottomTabNavigationProp<any>
}

interface IState {

}

const listContacts = [
  'пер. Широкий, 53 (ТРК Сигма)',
  'ул. Красная 154',
  'ул. 30 лет Победы, 19А',
  'ул. Московская, 43',
  'ул. Узкая, 54',
  'ул. Максима Горького, 78',
]

export class Сontacts extends PureComponent<IProps, IState> {

  state = {

  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  render(): JSX.Element {

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
        <TouchableOpacity
          style={styles.arrowBackButton}
          onPress={this.goBackHandler}
        >
          <Image 
            source={ImageRepository.contactsArrowBack} 
            style={styles.arrowBackImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.currentLocationButton}
        >
          <Image 
            source={ImageRepository.contactsCurrentLocation} 
            style={styles.currentLocationImage}
          />
        </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listContacts}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {
            listContacts.map((item, index) => {
              return (
                <View 
                  key={Math.random().toString()}
                  style={listContacts.length - 1 !== index ? styles.listContactsTextContainer : styles.listContactsTextContainerWithoutBorderBottom}>
                  <Text style={styles.listContactsText}>
                    {item}
                  </Text>
                  <Text style={styles.phoneNumber}>
                    +7 925 123 45 67
                  </Text>
                </View>
              )
            })
          }
          <CommonButton 
            styleButton={styles.signSalonButton}
            title="Записаться в салон" 
          />
        </ScrollView>
      </View>
    )
  }
}
const styles = styleSheetCreate({
  container: style.view({
    flex: 1,
    backgroundColor: Color.white,
  }),
  mapContainer: style.view({
    backgroundColor: 'red',
  }),
  map: style.view({
    width: windowWidth,
    height: windowHeight * 0.5,
  }),
  arrowBackButton: style.view({
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.1,
    position: 'absolute',
    top: windowWidth * 0.1,
    left: windowHeight * 0.035,
    zIndex: 9999,
  }),
  arrowBackImage: style.image({
    width: windowWidth * 0.036,
    height: windowWidth * 0.036,
  }),
  currentLocationButton: style.view({
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.1,
    position: 'absolute',
    bottom: windowWidth * 0.07,
    right: windowHeight * 0.035,
  }),
  currentLocationImage: style.image({
    width: windowWidth * 0.059,
    height: windowWidth * 0.059,
    marginRight: windowWidth * 0.01,
    marginTop: windowWidth * 0.01,
  }),
  listContacts: style.view({
    height: windowHeight * 0.5,
    borderTopLeftRadius: windowWidth * 0.05,
    borderTopRightRadius: windowWidth * 0.05,
    backgroundColor: Color.white,
  }),
  listContactsTextContainer: style.view({
    paddingVertical: windowWidth * 0.036,
    paddingHorizontal: windowWidth * 0.04,
    borderBottomColor: Color.gray50,
    borderBottomWidth: windowWidth * 0.0025,
  }),
  listContactsTextContainerWithoutBorderBottom: style.view({
    paddingVertical: windowWidth * 0.036,
    paddingHorizontal: windowWidth * 0.04,
  }),
  listContactsText: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),  
  listContactsActiveText: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.035,
  }),  
  phoneNumber: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.gray,
    paddingTop: windowWidth * 0.03
  }),  
  signSalonButton: style.view({
    marginHorizontal: windowWidth * 0.04,
  }),
})