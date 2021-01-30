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

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IState {
  isVisible: boolean
  selectedSalon: string
}

const listAddress = [
  'пер. Широкий, 53 (ТРК Сигма)',
  'ул. Красная 154',
  'ул. 30 лет Победы, 19А',
  'ул. Московская, 43',
  'ул. Узкая, 54',
  'ул. Максима Горького, 78',
]

export class ChooseSalon extends PureComponent<IProps, IState> {
  refModalize: any

  state = {
    isVisible: false,
    selectedSalon: '',
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  changeSelectedSalon = (salon: string): void => {
    if (this.state.selectedSalon === salon) {
      this.setState({ selectedSalon: '' })
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

  goToSelectServiceHandler = (): void => {
    this.props.navigation.push(ListPages.SelectService)
  }

  onPressMarkerHandler = (): void => {
    console.log('test')
    this.setState({ isVisible: true })
  }

  refModalizeHandler = (ref: any) => this.refModalize = ref

  render(): JSX.Element {

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
              image={ImageRepository.contactsCustomMarker}
            >
              <Callout tooltip>
                <CalloutSubview onPress={this.onPressMarkerHandler}>
                  <View style={styles.markerTooltip}>
                    <Text style={styles.markerTooltipAddress}>
                      ул. Красная 154
                      </Text>
                    <Text style={styles.markerTooltipTime}>
                      С 10:00 до 22:00
                      </Text>
                    <CommonButton title="Выбрать" />
                  </View>
                </CalloutSubview>
              </Callout>
            </Marker>

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
        <View>
          <ScrollView
            style={styles.listAddress}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {
              listAddress.map((item) => {
                return (
                  <View
                    key={Math.random().toString()}
                    style={styles.listAddressCard}
                  >
                    <TouchableOpacity
                      style={styles.listAddressCardContainer}
                      onPress={this.changeSelectedSalon.bind(this, item)}
                    >
                      <Text style={this.state.selectedSalon === item ? styles.listAddressCardActiveText : styles.listAddressCardText}>
                        {item}
                      </Text>
                      {
                        this.state.selectedSalon === item 
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
            disabled={!this.state.selectedSalon}
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