import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Linking,
  Alert,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  windowWidth,
  windowHeight,
  ImageRepository,
  Color,
  fonts,
  platform,
} from 'app/system/helpers'
import MapView, { Callout, Marker } from 'react-native-maps'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Modalize } from 'react-native-modalize'
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { MainAsyncActions } from '../store/mainAsyncActions'
import { isEmpty } from 'lodash'
import Geolocation from 'react-native-geolocation-service'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions'

interface IStateProps {
  organisations: IGetOrganisationsResponce
  userCity: ITownsResponce
}

interface IDispatchProps {
  getOrganisations(data: IGetOrganisationsRequest): Promise<void>
}

interface IProps {
  navigation: BottomTabNavigationProp<any>
}

interface IState {
  isVisible: boolean
  isScreenFocus: boolean
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    organisations: state.main.organisationsList,
    userCity: state.system.userCity,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async getOrganisations(data) {
      await dispatch(MainAsyncActions.getOrganisations(data))
    }
  })
)
export class Сontacts extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {
  refModalize: any
  refMap: any
  listMarkerRef: any = {}

  state = {
    isVisible: false,
    isScreenFocus: false,
  }

  async componentDidMount(): Promise<void> {
    await this.props.getOrganisations({
     id: this.props.userCity.id,
    })
  }
  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  goToCurrentLocationHandler = async (): Promise<void> => {
    let permission
    if (platform.isIos) {
      permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else {
      permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

    if (permission === RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          this.refMap.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          })
        },
        (error) => {
          console.log(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    } else {
      Alert.alert('Ошибка', 'Предоставьте разрешение')
    }
  }

  goToСoordinatesHandler = (data: IOrganisation): void => {
    this.refMap.animateToRegion({
      latitude: +data.GPS.latitude,
      longitude: +data.GPS.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    this.listMarkerRef[data.id].showCallout()

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
    this.setState({ isVisible: true })
  }

  refModalizeHandler = (ref: any) => this.refModalize = ref

  arrogateMapRefHandler = (ref: any) => this.refMap = ref

  pushMarkerRefHandler = (id: number, ref: any): void => {
    this.listMarkerRef[id] = ref
  }

  render(): JSX.Element {

    const contacts: any = this.props.organisations &&
      !isEmpty(this.props.organisations.orgs)
      && this.props.organisations.orgs

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={this.arrogateMapRefHandler}
            showsUserLocation={true}
            initialRegion={{
              latitude: 56.854281,
              longitude: 60.556179,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
            zoomEnabled={false}
          >
            {
              !isEmpty(contacts) && contacts.map(((item: IOrganisation) => {
                return (
                  <Marker
                  //@ts-ignore
                    ref={this.pushMarkerRefHandler.bind(this, item.id)}
                    coordinate={{
                      latitude: +item.GPS.latitude,
                      longitude: +item.GPS.longitude,
                    }}
                    key={Math.random().toString()}
                    // image={ImageRepository.contactsCustomMarker}
                  >
  
                      <Image 
                        source={ImageRepository.contactsCustomMarker} 
                        style={{ width: 40, height: 40,}} 
                        resizeMode="contain"
                      />

                 <Callout tooltip>
                {/* <CalloutSubview onPress={this.onPressMarkerHandler}> */}
                  <View style={styles.markerTooltip}>
                    <Text style={styles.markerTooltipAddress}>
                      ул. Красная 154
                      </Text>
                    <Text style={styles.markerTooltipTime}>
                      С 10:00 до 22:00
                      </Text>
                  
                  </View>
                {/* </CalloutSubview> */}
              </Callout>

            </Marker>
                )
              }))
            }


          </MapView>
          {/* <TouchableOpacity
            style={styles.arrowBackButton}
            onPress={this.goBackHandler}
          >
            <Image
              source={ImageRepository.contactsArrowBack}
              style={styles.arrowBackImage}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={this.goToCurrentLocationHandler}
          >
            <Image
              source={ImageRepository.contactsCurrentLocation}
              style={styles.currentLocationImage}
            />
          </TouchableOpacity>
        </View>
        {/* <Portal> */}
        <Modalize
          ref={this.refModalizeHandler}
          alwaysOpen={windowHeight * 0.5}
          panGestureEnabled={false}
        >
          <View style={styles.listContactsContainer}>
            <ScrollView
              style={styles.listContacts}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {
               !isEmpty(contacts) && contacts.map((item: IOrganisation, index: number) => {
                  return (
                    <TouchableOpacity
                      key={Math.random().toString()}
                      onPress={this.goToСoordinatesHandler.bind(this, item)}
                      style={contacts.length - 1 !== index ? styles.listContactsTextContainer : styles.listContactsTextContainerWithoutBorderBottom}>
                      <Text style={styles.listContactsText}>
                        {item.address}
                      </Text>
                      <View style={styles.listContactsDescription}>
                        <Text style={styles.phoneNumber}>
                          {item.phone}
                        </Text>
                        <View style={styles.socialsContainer}>
                          <TouchableOpacity
                            onPress={this.makeCallHandler.bind(this, item.phone)}
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
                    </TouchableOpacity>
                  )
                })
              }
              {/* <View style={{ height: windowWidth * 0.2 }} /> */}
            </ScrollView>
            {/* <CommonButton
                styleButton={styles.signSalonButton}
                title="Записаться в салон"
              /> */}
          </View>
        </Modalize>
        {/* </Portal> */}
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
    bottom: windowWidth * 0.09,
    right: windowHeight * 0.035,
  }),
  currentLocationImage: style.image({
    width: windowWidth * 0.059,
    height: windowWidth * 0.059,
    marginRight: windowWidth * 0.01,
    marginTop: windowWidth * 0.01,
  }),
  listContactsContainer: style.view({
    // backgroundColor: Color.philippineGray,
    paddingBottom: windowWidth * 0.21,
    height: windowHeight * 0.48,
  }),
  listContacts: style.view({
    // backgroundColor: 'red',
    // borderTopLeftRadius: windowWidth * 0.05,
    // borderTopRightRadius: windowWidth * 0.05,
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
    marginTop: windowWidth * 0.05,
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
  }),
  markerTooltip: style.view({
    minWidth: windowWidth * 0.37,
    padding: windowWidth * 0.03,
    backgroundColor: Color.white,
    borderRadius: windowWidth * 0.025,
  }),
  markerTooltipAddress: style.text({
    marginBottom: windowWidth * 0.02,
    color: Color.chineseBlack,
    fontSize: windowWidth * 0.036,
    textAlign: 'center',
  }),
  markerTooltipTime: style.text({
    marginBottom: windowWidth * 0.02,
    color: Color.gray600,
    fontSize: windowWidth * 0.03,
    textAlign: 'center',
  }),
})