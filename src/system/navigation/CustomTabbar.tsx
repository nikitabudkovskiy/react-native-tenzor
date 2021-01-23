import React, { Fragment, PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native'
import {
  styleSheetCreate,
  style,
  windowWidth,
  Color,
  fonts,
  styleSheetFlatten,
  isLongDevices,
  ImageRepository,
} from 'app/system/helpers'
import { ListPages } from './listPages'
// import { IListTabBar, ITabInformation } from 'app/interfaces';

interface IRoutes {
  key: string
  name: string
}

interface IStateHistory {
  key: string
  type: string
}

interface IStateRoutes {
  key: string
  name: string
}

interface IProps {
  navigation: any
  state: {
    history: IStateHistory[]
    index: number
    key: string
    routeNames: string[]
    routes: IStateRoutes[]
  }
  descriptors: any
  tabs: any[]
}

interface IState {

}

export class CustomTabbar extends PureComponent<IProps, IState>{

  onPressTabBarHandler = (item: IRoutes): void => {
    //@ts-ignore
    const event = this.props.navigation.emit({
      type: 'tabPress',
      target: item.key,
      canPreventDefault: true,
    })

    if (!event.defaultPrevented) {
      this.props.navigation.navigate(item.name)
    }
  }

  render(): JSX.Element {

    const { state } = this.props

    const mainContainer = styleSheetFlatten([
      styles.mainContainer,
      {
        height: isLongDevices ? windowWidth * 0.24 : windowWidth * 0.2
      }
    ])

    console.log('this', this.props)
    return (
      <View style={mainContainer}>
        <View style={styles.container}>
          
          <View
            key={Math.random().toString()}
            style={styles.tab}
          >
            <TouchableOpacity
              disabled={state.index === 0}
              onPress={this.onPressTabBarHandler.bind(this,  state.routes[0])}
              style={styles.tabContainer}
            >
              <Image
                source={state.index === 0 ? ImageRepository.tabBarProfileActive  : ImageRepository.tabBarProfile}
                style={styles.tabImage}
                resizeMode="contain"
              />
               <Text style={state.index === 0 ? styles.activeText  : styles.text}>
                Профиль
              </Text>
            </TouchableOpacity>
          </View>

          <View
            key={Math.random().toString()}
            style={styles.tab}
          >
            <TouchableOpacity
              disabled={state.index === 1}
              onPress={this.onPressTabBarHandler.bind(this,  state.routes[1])}
              style={styles.tabContainer}
            >
              <Image
               source={state.index === 1 ? ImageRepository.tabBarProfileActive  : ImageRepository.tabBarProfile}
               style={styles.tabImage}
                resizeMode="contain"
              />
              <Text style={state.index === 1 ? styles.activeText  : styles.text}>
                Мастера
              </Text>
            </TouchableOpacity>
          </View>
  

          <View
            key={Math.random().toString()}
            style={styles.tab}
          >
            <TouchableOpacity
              disabled={state.index === 2}
              onPress={this.onPressTabBarHandler.bind(this,  state.routes[2])}
              style={styles.tabContainer}
            >
              <Image
               source={state.index === 2 ? ImageRepository.tabBarMyNotesActive  : ImageRepository.tabBarMyNotes}
                style={styles.tabImage}
                resizeMode="contain"
              />
              <Text style={state.index === 2 ? styles.activeText  : styles.text}>
                Мои записи
              </Text>
            </TouchableOpacity>
          </View>

          <View
            key={Math.random().toString()}
            style={styles.tab}
          >
            <TouchableOpacity
              disabled={state.index === 3}
              onPress={this.onPressTabBarHandler.bind(this,  state.routes[3])}
              style={styles.tabContainer}
            >
              <Image
               source={state.index === 3 ? ImageRepository.tabBarMycontactsActive  : ImageRepository.tabBarContacts}
                style={styles.tabImage}
                resizeMode="contain"
              />
              <Text style={state.index === 3 ? styles.activeText  : styles.text}>
                Мои записи
              </Text>
            </TouchableOpacity>
          </View>
  


        </View>

        {/* {
          state.routes.map((item: IRoutes, index: number) => {
            const isFocused = state.index === index
            return index === 2
              ? (
                <Fragment>
                  <TouchableOpacity style={styles.addButton}>
                    <Image
                      source={ImageRepository.tabBarAdd}
                      style={styles.addImageButton}
                    // resizeMode="contain" 
                    />
                  </TouchableOpacity>
                  <View
                    key={Math.random().toString()}
                    style={styles.tab}
                  >
                    <TouchableOpacity
                      disabled={isFocused}
                      onPress={this.onPressTabBarHandler.bind(this, item)}
                      style={styles.tabContainer}
                    >
                      <Image
                        source={this.props.tabs[index].icon}
                        style={this.props.tabs[index].style}
                        resizeMode="contain"
                      />
                      <Text style={styles.text}>
                        {this.props.tabs[index].name}
                      </Text>
                    </TouchableOpacity>
                  </View>

                </Fragment>
              )
              : (
                (
                  <View
                    key={Math.random().toString()}
                    style={styles.tab}
                  >
                    <TouchableOpacity
                      disabled={isFocused}
                      onPress={this.onPressTabBarHandler.bind(this, item)}
                      style={styles.tabContainer}
                    >
                      <Image
                        source={this.props.tabs[index].icon}
                        style={this.props.tabs[index].style}
                        resizeMode="contain"
                      />
                      <Text style={styles.text}>
                        {this.props.tabs[index].name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              )
          })
        } */}
      </View>
    )
  }
}

const styles = styleSheetCreate({
  mainContainer: style.view({
    borderTopLeftRadius: windowWidth * 0.1,
    borderTopRightRadius: windowWidth * 0.1,
    // backgroundColor: 'red',
    height: windowWidth * 0.2,
    backgroundColor: Color.linen,
  }),
  container: style.view({
    flexDirection: 'row',
    height: windowWidth * 0.15,
    marginTop: windowWidth * 0.03,
  }),
  tabContainer: style.view({
    alignItems: 'center',
    justifyContent: 'center',
    // height: windowWidth * 0.12,
  }),
  tab: style.view({
    flex: 1,
    marginTop: windowWidth * 0.0375,
    height: windowWidth * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  tabImage: style.image({
    width: windowWidth * 0.06, 
    height: windowWidth * 0.06,
  }),
  activeText: style.text({
    color: Color.electricOrange,
    fontSize: windowWidth * 0.022,
  }),
  text: style.text({
    color: Color.philippineGray,
    fontSize: windowWidth * 0.022,
    // fontFamily: fonts.geometriaMedium,
  }),
  addButton: style.view({
    marginTop: -windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.025,
    // backgroundColor: Color.transparent,
    height: windowWidth * 0.16,
    borderRadius: windowWidth * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  addImageButton: style.image({
    width: windowWidth * 0.12,
    height: windowWidth * 0.138,
  }),
})

