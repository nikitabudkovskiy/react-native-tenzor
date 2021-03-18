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
  platform
} from 'app/system/helpers'
import MapView, { Callout, CalloutSubview, Marker } from 'react-native-maps'
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'
import { MainAsyncActions } from 'app/module/main/store/mainAsyncActions'
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { isEmpty } from 'lodash'
import { Loader } from 'app/module/global/view/Loader'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service'
import { FloatingLoader } from 'app/module/global/view/FloatingLoader'

interface IStateProps extends IIsLoadingAndError {
  organisations: IGetOrganisationsResponce
  userCity: ITownsResponce
}

interface IDispatchProps {
  getOrganisations(data: IGetOrganisationsRequest): Promise<void>
}

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  isVisible: boolean
  selectedSalon: {
    address: string
  }
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    organisations: state.main.organisationsList,
    userCity: state.system.userCity,
    isLoading: state.main.isLoading,
    error: state.main.error,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async getOrganisations(data) {
      await dispatch(MainAsyncActions.getOrganisations(data))
    }
  })
)
export class ChooseSalon extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {
  refModalize: any
  refMap: any

  state = {
    isVisible: false,
    selectedSalon: {
      address: '',
    },
  }

  async componentDidMount(): Promise<void> {
    if (isEmpty(this.props.organisations)) {
      await this.props.getOrganisations({
       id: this.props.userCity.id,
    // id: 170,
      })
    }
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  changeSelectedSalon = (salon: IOrganisation): void => {
    if (this.state.selectedSalon.address === salon.address) {
      this.setState({ selectedSalon: { address: '' } })
      return
    }
    this.setState({ selectedSalon: salon })
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

  goToSelectServiceHandler = (): void => {
    this.props.navigation.push(
      ListPages.SelectService, 
      { salon: this.state.selectedSalon }
    )
  }

  onPressMarkerHandler = (): void => {
    console.log('fdjknjf')
  }

  arrogateMapRefHandler = (ref: any) => this.refMap = ref

  refModalizeHandler = (ref: any) => this.refModalize = ref

  render(): JSX.Element {

    if (this.props.isLoading) {
      return <FloatingLoader />
    }

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
                    coordinate={{
                      latitude: +item.GPS.latitude,
                      longitude: +item.GPS.longitude,
                    }}
                    key={Math.random().toString()}
                  >

                    <Image
                      source={ImageRepository.contactsCustomMarker}
                      style={{ width: 40, height: 40, }}
                      resizeMode="contain"
                    />

                    <Callout tooltip>
                      <CalloutSubview onPress={() => console.log('11')}>

                      <View style={styles.markerTooltip}>
                        <Text style={styles.markerTooltipAddress}>
                          ул. Красная 154
                      </Text>
                        <Text style={styles.markerTooltipTime}>
                          С 10:00 до 22:00
                      </Text>
                        {/* <CalloutSubview onPress={this.onPressMarkerHandler}> */}
                        <TouchableOpacity onPress={() => console.log('11')}>
                          <Text>
                            klvdlgnlg
                          </Text>
                        </TouchableOpacity>
                          {/* <CommonButton title="Выбрать"  /> */}
                    

                      </View>
                      </CalloutSubview>
     
                    </Callout>

                  </Marker>
                )
              }))
            }

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
            onPress={this.goToCurrentLocationHandler}
          >
            <Image
              source={ImageRepository.contactsCurrentLocation}
              style={styles.currentLocationImage}
            />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            style={styles.listAddress}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {
              !isEmpty(contacts) && contacts.map((item: IOrganisation) => {
                return (
                  <View
                    key={Math.random().toString()}
                    style={styles.listAddressCard}
                  >
                    <TouchableOpacity
                      style={styles.listAddressCardContainer}
                      onPress={this.changeSelectedSalon.bind(this, item)}
                    >
                      <Text style={this.state.selectedSalon.address === item.address ? styles.listAddressCardActiveText : styles.listAddressCardText}>
                        {item.address}
                      </Text>
                      {
                        this.state.selectedSalon.address === item.address
                          ? (
                            <Image
                              source={ImageRepository.globalOrangeCheckMark}
                              style={styles.orangeCheckMark}
                              resizeMode="contain"
                            />
                          )
                          : null
                      }
                    </TouchableOpacity>


                  </View>
                )
              })
            }
          </ScrollView>
          <CommonButton
            disabled={!this.state.selectedSalon.address}
            styleButton={styles.signSalonButton}
            title="Далее"
            onPress={this.goToSelectServiceHandler}
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
  }),
  mapContainer: style.view({
    backgroundColor: 'red',
  }),
  map: style.view({
    width: windowWidth,
    height: windowHeight * 0.55,
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
  orangeCheckMark: style.image({
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
  }),
  listAddress: style.view({
    height: windowHeight * 0.36,
    borderTopLeftRadius: windowWidth * 0.04,
    borderTopRightRadius: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.04,
  }),
  listAddressCard: style.view({

  }),
  listAddressCardContainer: style.view({
    paddingVertical: windowWidth * 0.036,
    paddingHorizontal: windowWidth * 0.04,
    borderBottomColor: Color.gray50,
    borderBottomWidth: windowWidth * 0.0025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  listAddressCardText: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),
  listAddressCardActiveText: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.04,
  }),
  phoneNumber: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
    color: Color.gray,
    paddingTop: windowWidth * 0.03
  }),
  signSalonButton: style.view({
    marginHorizontal: windowWidth * 0.04,
    marginTop: windowWidth * 0.02,
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
  }),
  markerTooltipTime: style.text({
    marginBottom: windowWidth * 0.02,
    color: Color.gray600,
    fontSize: windowWidth * 0.03,
    textAlign: 'center',
  }),
})