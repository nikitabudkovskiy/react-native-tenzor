import React, { PureComponent } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  ImageRepository,
  styleSheetFlatten,
  isLongDevices,
  windowHeight,
  hitSlop,
} from 'app/system/helpers'
import { isEmpty } from 'lodash'
import { StackNavigationProp } from '@react-navigation/stack'
import { CommonButton } from 'app/module/global/view'
import { ListPages } from 'app/system/navigation'
import { IApplicationState } from 'app/system/store/applicationState'
import { connectStore } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { MastersAsyncActions } from 'app/module/masters/store/masterAsyncActions'
import { FloatingLoader } from 'app/module/global/view/FloatingLoader'
import { RouteProp } from '@react-navigation/native'

interface IStateProps extends IIsLoadingAndError {
  userCity: ITownsResponce
  mastersList: IGetMastersListResponce
}

interface IDispatchProps {
  getOrganisations(data: IGetOrganisationsRequest): Promise<void>
  getMasterList(data: IGetMastersListRequest): Promise<void>
}

interface IProps {
  navigation: StackNavigationProp<any>
  route: RouteProp<any, any>
}

interface IState {
  searchValue: string
  animatedMarginLeft: Animated.Value
}

@connectStore(
  (state: IApplicationState): IStateProps => ({
    userCity: state.system.userCity,
    isLoading: state.main.isLoading,
    error: state.main.error,
    mastersList: state.master.mastersList,
  }),
  (dispatch: ThunkDispatch<IApplicationState, void, any>): IDispatchProps => ({
    async getMasterList(data) {
      await dispatch(MastersAsyncActions.getMastersList(data))
    },
  })
)
export class ChooseMaster extends PureComponent<IStateProps & IDispatchProps & IProps, IState> {

  state = {
    searchValue: '',
    animatedMarginLeft: new Animated.Value(0)
  }

  async componentDidMount(): Promise<void> {
    await this.props.getMasterList({
      point_id: this.props.userCity.id,
    })
  }

  searchMasterHandler = (searchValue: string): void => {
    this.setState({ searchValue })
  }

  goBackHandler = (): void => {
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack()
    }
  }

  goToTimeSelectHandler = (master: IMasters): void => {
    this.props.navigation.push(ListPages.TimeSelect, 
      {
        salon: this.props.route.params?.salon,
        selectedServices: this.props.route.params?.selectedServices,
        master,
      }
    )
  }

  render() {

    if (this.props.isLoading) {
      return <FloatingLoader />
    }

    const container = styleSheetFlatten([
      styles.container,
      {
        marginTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.05
      }
    ])

    console.log('lol', this.props.route.params)

    return (
      <View style={styles.mainContainer}>
        <View style={container} >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={this.goBackHandler}
              hitSlop={hitSlop}
            >
              <Image
                source={ImageRepository.masterArrowLeft}
                style={styles.masterArrowLeft}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Наши мастера
          </Text>
          </View>
          <ScrollView>
            {
              !isEmpty(this.props.mastersList.masters)
                ? this.props.mastersList.masters.map(items => {
                  return (
                    <TouchableOpacity
                      key={items.name}
                      style={styles.hairDresserWrapper}
                      onPress={this.goToTimeSelectHandler.bind(this, items)}
                    >
                      <View style={styles.hairDresserContainer}>
                        <Image
                          source={{ uri: items.photo }}
                          style={styles.master}
                        />
                        <View style={styles.hairDresserInfoContainer}>
                          <Text style={styles.hairDresserName}>
                            {items.name}
                          </Text>
                          <Text style={styles.hairDresserPosition}>
                            {items.role}
                          </Text>
                          <View style={styles.starContainer}>
                            {
                              [1, 2, 3, 4, 5].map(item => {
                                return (
                                  <Image
                                    key={item}
                                    source={ImageRepository.masterStar}
                                    style={styles.masterStar}
                                  />
                                )
                              })
                            }
                          </View>
                        </View>
                      </View>
                      <Image
                        source={ImageRepository.globalGrayCheckMark}
                        style={styles.grayCheckMark}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )
                })
                : (
                  <View style={styles.nothingFound}>
                    <Text style={styles.nothingFoundText}>
                      Ничего не найдено
                </Text>
                  </View>
                )
            }
          </ScrollView>

          <View style={styles.masterCalculationsContainer}>
            <View style={styles.masterCalculations}>
              <Text style={styles.masterCalculationsTitle}>
                Услуг: 3 на 600 ₽ / 90 мин
              </Text>
              <CommonButton
                title='Любой мастер'
                styleButton={styles.masterContinue}
                styleText={styles.masterContinueText}
                onPress={this.goToTimeSelectHandler}
              />
            </View>
          </View>

        </View>
      </View>
    )
  }
}

const styles = styleSheetCreate({
  mainContainer: style.view({
    backgroundColor: Color.white,
    flex: 1,
  }),
  container: style.view({
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: windowWidth * 0.04,
  }),
  headerContainer: style.view({
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.035,
    marginTop: windowWidth * 0.037,
  }),
  headerTitle: style.text({
    fontSize: windowWidth * 0.05,
    fontFamily: fonts.robotoBold,
    paddingLeft: windowWidth * 0.085,
  }),
  hairDresserWrapper: style.view({
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.914,
    marginTop: windowWidth * 0.064,
    justifyContent: 'space-between',
  }),
  hairDresserContainer: style.view({
    flexDirection: 'row',
    alignItems: 'center',
  }),
  master: style.image({
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
    borderRadius: windowWidth * 0.1,
  }),
  masterStar: style.image({
    width: windowWidth * 0.0395,
    height: windowWidth * 0.0426,
    marginRight: windowWidth * 0.007
  }),
  hairDresserName: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.04,
  }),
  hairDresserPosition: style.text({
    fontFamily: fonts.robotoRegular,
    fontSize: windowWidth * 0.04,
  }),
  hairDresserInfoContainer: style.view({
    paddingLeft: windowWidth * 0.053
  }),
  grayCheckMark: style.image({
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
  }),
  starContainer: style.view({
    flexDirection: 'row'
  }),
  masterArrowLeft: style.image({
    width: windowWidth * 0.064,
    height: windowWidth * 0.064,
  }),
  nothingFound: style.view({
    width: '100%',
    height: windowHeight * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  nothingFoundText: style.text({
    fontFamily: fonts.robotoBold,
    fontSize: windowWidth * 0.05,
  }),

  masterCalculationsContainer: style.view({
    width: windowWidth,
    height: windowWidth * 0.216,
    borderTopWidth: windowWidth * 0.001,
    marginBottom: windowWidth * 0.06,
  }),
  masterCalculations: style.view({
    alignItems: 'center',
  }),
  masterContinue: style.view({
    width: windowWidth * 0.914,
    backgroundColor: Color.anitFlashWhite,
  }),
  masterContinueText: style.text({
    color: Color.black,
  }),
  masterCalculationsTitle: style.text({
    fontSize: windowWidth * 0.04,
    fontFamily: fonts.robotoRegular,
    paddingVertical: windowWidth * 0.021
  }),
})

