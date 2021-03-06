import React, { PureComponent } from 'react'
import { AppState, AppStateStatus, YellowBox, StatusBar, View } from 'react-native'
import { NavigationContainer, NavigationContainerRef, StackActions } from '@react-navigation/native'
import { RootNavigator } from 'app/system/navigation/rootNavigation'
import { Provider } from 'react-redux'
import { Persistor } from 'redux-persist'
import { Store } from 'redux'
import { PersistGate } from 'redux-persist/integration/react'
import { IApplicationState } from 'app/system/store'
import { Loader } from 'app/module/global/view/Loader'
import { localization } from 'app/system/localization'
import { configureStore } from './system/store/configureStore'
import { Color, platform } from './system/helpers'
import { ListPages } from './system/navigation'
import { FloatingLoader } from './module/global/view/FloatingLoader'
import { ApiService } from './system/api/ApiService'

YellowBox.ignoreWarnings(['Remote debugger'])

interface IProps {

}

interface IState {
  appStatus: AppStateStatus
  isLoading: boolean
}

export class App extends PureComponent<IProps, IState>{
  private readonly store: Store
  private readonly persistor: Persistor
  private navigatorRef: any

  constructor(props: IProps) {
    super(props)
    const { store, persistor } = configureStore(this.onStoreCreated)
    this.store = store
    this.persistor = persistor
  }

  state = {
    appStatus: AppState.currentState,
    isLoading: true,
  }

  componentDidMount(): void {
    AppState.addEventListener('change', this.handleAppStateChange)
    if (platform.isAndroid) {
      StatusBar.setBackgroundColor(Color.white)
      StatusBar.setBarStyle('dark-content')
    }
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppStatus: AppStateStatus): void => {
    if (this.state.appStatus.match(/inactive|background/) && nextAppStatus === 'active') {

    }
    this.setState({ appStatus: nextAppStatus })
  }

  setNavigatorRef = (navigatorRef: NavigationContainerRef): void => {
    this.navigatorRef = navigatorRef
  }

  onStoreCreated = (): void => {
    const state: IApplicationState = this.store.getState()
    localization.list.setLanguage(state.system.language)
    const { userCity } = state.system
    const { codeVerificationInformation } = state.login
    if (codeVerificationInformation && codeVerificationInformation.token) {
      ApiService.defaults.headers.common['Authorization'] = `Bearer ${codeVerificationInformation.token}`
    }
    if (userCity.id !== -1) {
      setTimeout(() => {
        this.navigatorRef.dispatch(StackActions.replace(ListPages.MainTab))
      }, 800)
    }
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 4000)
  }

  renderLoader = (): JSX.Element => {
    return (
      <Loader />
    )
  }

  render(): JSX.Element {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.isLoading
            ? <FloatingLoader />
            : null
        }
        <PersistGate
          loading={this.renderLoader()}
          persistor={this.persistor}
        >
          <Provider store={this.store}>
            <NavigationContainer ref={this.setNavigatorRef}>
              <RootNavigator />
            </NavigationContainer>
          </Provider>
        </PersistGate>
      </View>
    )
  }
}
