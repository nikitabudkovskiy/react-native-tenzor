import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Linking,
  Alert,
  TouchableOpacityComponent,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  windowWidth,
  windowHeight,
  ImageRepository,
  Color,
  fonts,
  platform
} from 'app/system/helpers'
import MapView, { Callout, CalloutSubview, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { CommonButton } from 'app/module/global/view'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Modal from 'react-native-modal'

interface IProps {
  navigation: BottomTabNavigationProp<any>
}

interface IState {
  isVisible: boolean
}

interface IContactsList {
  address: string
  phoneNumber: string
  isVkLink: boolean

}

const listContacts: IContactsList[] = [
  {
    address: 'пер. Широкий, 53 (ТРК Сигма)',
    phoneNumber: '+7 925 123 45 67',
    isVkLink: true
  },
  {
    address: 'ул. Красная 154',
    phoneNumber: '+7 925 123 45 68',
    isVkLink: false
  },
  {
    address: 'ул. 30 лет Победы, 19А',
    phoneNumber: '+7 925 123 45 69',
    isVkLink: true
  },
  {
    address: 'ул. Московская, 43',
    phoneNumber: '+7 925 123 45 70',
    isVkLink: true
  },
  {
    address: 'ул. Узкая, 54',
    phoneNumber: '+7 925 123 45 71',
    isVkLink: true
  },
  {
    address: 'ул. Максима Горького, 78',
    phoneNumber: '+7 925 123 45 72',
    isVkLink: true
  }
]

export class Сontacts extends PureComponent<IProps, IState> {

  state = {
    isVisible: false,
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  makeCallHandler = async (phoneNumber: string): Promise<void> => {
    let openUrl = ''
    if (platform.isAndroid) {
      openUrl = `tel:${phoneNumber}`
    } else {
      openUrl = `telprompt:${phoneNumber}`
    }
    try {
      await Linking.openURL(openUrl)
    } catch {
      Alert.alert('Ошибка', 'Проверьте наличие приложения для звонков')
    }
  }

  onPressMarkerHandler = (): void => {
    console.log('test')
    this.setState({ isVisible: true })
  }

  render(): JSX.Element {

    console.log('render', this.state.isVisible)
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
          showsUserLocation={true}
            initialRegion={{
              latitude: 48.784627,
              longitude: 44.807354,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
            zoomEnabled={false}
          >
            <Marker coordinate={{
              latitude: 48.784627,
              longitude: 44.807354,
            }}
            // width={windowWidth * 0.04}
            // height={windowWidth * 0.04}
            image={ImageRepository.contactsCustomMarker}
            // style={{ width: windowWidth * 0.04, height: windowWidth * 0.04 }}
            >
              {/* <View> */}
              <Callout tooltip>
              <CalloutSubview  onPress= {this.onPressMarkerHandler}>
              <TouchableOpacity>
          <View>
            <Text>Lost</Text>
          </View>
        </TouchableOpacity>     
              </CalloutSubview>
      </Callout>
              {/* </View> */}

          

  
                {/* <TouchableOpacity style={{ position: 'absolute' }} onPress={this.onPressMarkerHandler}> */}
                  {/* <Image
                    source={ImageRepository.contactsCustomMarker}
                    style={{ width: windowWidth * 0.08, height: windowWidth * 0.1 }}
                    resizeMode="contain"
                  /> */}
                {/* </TouchableOpacity> */}



            </Marker>
            {/* {
              markers.map(item => {
                <Marker coordinate={item} />
              })
            } */}
          </MapView>
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
                    {item.address}
                  </Text>
                  <View style={styles.listContactsDescription}>
                    <Text style={styles.phoneNumber}>
                      {item.phoneNumber}
                    </Text>
                    <View style={styles.socialsContainer}>
                      <TouchableOpacity
                        onPress={this.makeCallHandler.bind(this, item.phoneNumber)}
                      >
                        <Image
                          style={styles.soicals}
                          source={ImageRepository.contactsPhone}
                        />
                      </TouchableOpacity>
                      {
                        item.isVkLink ? (
                          <Image
                            style={styles.soicals}
                            source={ImageRepository.contactsVk}
                          />
                        ) : null
                      }

                      <Image
                        style={styles.soicals}
                        source={ImageRepository.contactsInsta}
                      />
                    </View>
                  </View>
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
  listContactsDescription: style.view({
    flexDirection: 'row',
    justifyContent: 'space-between'
  }),
  socialsContainer: style.view({
    flexDirection: 'row',
  }),
  soicals: style.image({
    width: windowWidth * 0.085,
    height: windowWidth * 0.085,
    marginLeft: windowWidth * 0.021,
  })
})