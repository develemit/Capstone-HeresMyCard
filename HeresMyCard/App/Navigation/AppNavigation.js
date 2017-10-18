import { StackNavigator } from 'react-navigation'
import SignInScreen from '../Containers/SignInScreen'
import SplashPageScreen from '../Containers/SplashPageScreen'
import TestScreen from '../Containers/TestScreen'
import SendCardScreen from '../Containers/SendCardScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import MyCards from '../Containers/MyCards'
import FooterScreen from '../Containers/FooterScreen'
import CardsScreen from '../Containers/CardsScreen'
import HomeScreen from '../Containers/HomeScreen'
import LaunchScreen from '../Containers/LaunchScreen'


import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SignInScreen: { screen: SignInScreen },
  SplashPageScreen: { screen: SplashPageScreen },
  TestScreen: { screen: TestScreen },
  SendCardScreen: { screen: SendCardScreen },
  ProfileScreen: { screen: ProfileScreen },
  MyCards: { screen: MyCards },
  FooterScreen: { screen: FooterScreen },
  CardsScreen: { screen: CardsScreen },
  HomeScreen: { screen: HomeScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashPageScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
