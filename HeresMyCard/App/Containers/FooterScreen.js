import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { StackNavigator, NavigationActions } from 'react-navigation'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FooterScreenStyle'

class FooterScreen extends Component {


  render () {
    let {navigate} = this.props.navigation
    let {goBack} = this.props.navigation
    // console.log('navigate - ', navigate)
    // console.log('goback - ', goBack)
    return (
      <Footer style={styles.footerStyle}>
          <FooterTab>
            {/* <Button vertical
              onPress={() => goBack()}>
              <Icon name="arrow-back" style={styles.tabStyle}/>
              <Text style={styles.tabStyle} >Go Back</Text>
            </Button> */}
            {/* <Button vertical onPress={() => navigate('HomeScreen')}>
              <Icon name="home" style={styles.tabStyle}/>
              <Text style={styles.tabStyle}>Home</Text>
            </Button> */}
            {/* <Button vertical onPress={() => navigate('CardsScreen')}>
              <Icon active name="card" style={styles.tabStyle}/>
              <Text style={styles.tabStyle}>Cards</Text>
            </Button> */}
            <Button vertical onPress={() => navigate('SignInScreen')}>
              <Icon name="refresh" style={styles.tabStyle}/>
              <Text style={styles.tabStyle}>logout</Text>
            </Button>
          </FooterTab>
        </Footer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterScreen)
