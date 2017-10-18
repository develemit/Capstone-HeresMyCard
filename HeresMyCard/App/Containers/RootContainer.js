import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { Button, Text, Icon, Footer, FooterTab } from 'native-base'

import FooterScreen from './FooterScreen'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    console.disableYellowBox = true
    const TestyFoot = (props) => {
      const { dispatch, nav } = props
      const navigation = ReactNavigation.addNavigationHelpers({
        state: nav
      })

      return <FooterScreen navigation={navigation} />
    }
    // let {navigate} = this.props.navigation
    // let {goBack} = this.props.navigation
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapStateToProps = (state,props) => ({ nav: state.nav })
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
