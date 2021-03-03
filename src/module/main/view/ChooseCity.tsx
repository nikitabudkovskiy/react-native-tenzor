import React, { PureComponent } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, } from 'react-native'
import {
  styleSheetCreate,
  style,
  fonts,
  Color,
  windowWidth,
  isLongDevices,
  styleSheetFlatten,
  ImageRepository,
} from 'app/system/helpers'
import { CommonButton } from 'app/module/global/view'
import { StackNavigationProp } from '@react-navigation/stack'
import { ListPages } from 'app/system/navigation'
import { connectStore, IApplicationState } from 'app/system/store'
import { ThunkDispatch } from 'redux-thunk'
import { Loader } from 'app/module/global/view/Loader'
import { MainAsyncActions } from '../store/mainAsyncActions'
import { IMainState } from '../store/mainState'
import { isEmpty } from 'lodash'
import { SystemAction } from 'app/system/store/system'

interface IProps {
  navigation: StackNavigationProp<any>
}

interface IDispatchProps {
  setChooseCity(data: ITownsResponce): void
  getTowns(): Promise<void>
}

interface IState {
  selectedСity: ITown
}

interface IStateProps {
  towns: ITown[]
  isLoading: boolean
  error: boolean
}

interface ITown {
  id: Number
  title: string
}

const list = ['Ижевск', 'Абакан', 'Адлер']

@connectStore(
  (state: IApplicationState): IStateProps => ({
    isLoading: state.main.isLoading,
    error: state.main.error,
    towns: state.main.townsList,
  }),
  (dispatch: ThunkDispatch<IMainState, void, any>): IDispatchProps => ({
    async getTowns() {
      await dispatch(MainAsyncActions.getTownsList())
    },
    setChooseCity(data) {
      dispatch(SystemAction.setChooseCity(data))
    }
  })
)

export class ChooseCity extends PureComponent<IProps & IState & IDispatchProps & IStateProps> {

  state = {
    selectedСity: {
      id: -1,
      title: '',
    },
  }

  async componentDidMount() {
    await this.props.getTowns()

    console.log(this.props.towns)
  }

  onChangeCityHandler = (selectedСity: ITown): void => {
    if (this.state.selectedСity.id === selectedСity.id) {
      this.setState({
        selectedСity: {
          id: -1,
          title: '',
        }
      })
      return
    }
    this.setState({ selectedСity })
  }

  goToMainTabBarHandler = (): void => {
    this.props.setChooseCity(this.state.selectedСity)
    this.props.navigation.replace(ListPages.MainTab)
  }

  render(): JSX.Element {

    if (this.props.isLoading) {
      return (
        <Loader />
      )
    }

    const mainContainer = styleSheetFlatten([
      styles.mainContainer,
      {
        paddingTop: isLongDevices ? windowWidth * 0.1 : windowWidth * 0.08,
      }
    ])

    return (
      <View style={mainContainer}>
        <ScrollView
          scrollEventThrottle={16}
          style={styles.container}
          bounces={false}
        >
          <Text style={styles.title}>
            Выберите город
          </Text>
          {
            !isEmpty(this.props.towns) && this.props.towns.map((item: ITown, index) => {
              return (
                <View key={Math.random().toString()}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={this.onChangeCityHandler.bind(this, item)}
                  >
                    <Text>
                      {item.title}
                    </Text>
                    {
                      
                      this.state.selectedСity.id === item.id
                        ? (
                          <Image
                            source={ImageRepository.chooseCityCheck}
                            style={styles.cardCheck}
                            resizeMode="contain"
                          />
                        )
                        : null
                    }
                  </TouchableOpacity>
                  {
                    list.length - 1 === index
                      ? null
                      : (
                        <View style={styles.cardDevider} />
                      )
                  }
                </View>
              )
            })
          }
        </ScrollView>
          <CommonButton
            disabled={this.state.selectedСity.id === -1}
            title="Выбрать город"
            styleButton={styles.chooseCity}
            onPress={this.goToMainTabBarHandler}
          />
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
    paddingHorizontal: windowWidth * 0.04,
    flex: 1,
  }),
  title: style.text({
    fontFamily: fonts.robotoBold,
    color: Color.black,
    fontSize: windowWidth * 0.05,
    marginBottom: windowWidth * 0.03,
    textAlign: 'center',
  }),
  card: style.view({
    paddingVertical: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  cardDevider: style.view({
    borderBottomWidth: windowWidth * 0.0025,
    borderBottomColor: Color.gray100,
  }),
  cardCheck: style.view({
    width: windowWidth * 0.038,
    height: windowWidth * 0.032,
    marginRight: windowWidth * 0.02,
  }),
  chooseCity: style.view({
    marginBottom: windowWidth * 0.1,
    marginTop: windowWidth * 0.02,
    marginHorizontal: windowWidth * 0.04,
  }),

})