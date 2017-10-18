import React, { Component } from 'react'
import { View, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, H1 } from 'native-base';
import { connect } from 'react-redux'
import FooterScreen from './FooterScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'


// Styles
import styles from './Styles/SplashPageScreenStyle'
import cardBackground from '../Images/0ece0a9d162411510995bb21a1842df6--wallpaper-backgrounds-iphone-wallpaper.jpg'
import mainBackground from '../Images/main-background.jpg'

class SplashPageScreen extends Component {


  render () {
    let {navigate} = this.props.navigation

    return (
      <ImageBackground source={mainBackground} style={styles.backgroundImage}>

          <KeyboardAvoidingView behavior='position' style={styles.body}>
            <H1>Here's My Card</H1>
            <Button style={styles.button} block success
              onPress={() => navigate('HomeScreen')}>
                <Text>Sign Up</Text>
            </Button>
              <Text style={{alignSelf: 'center'}}>Or</Text>
            <Button style={styles.button} block
              onPress={() => navigate('SignInScreen')}>
              <Text>Sign In</Text>
            </Button>
          </KeyboardAvoidingView>
      {/* <FooterScreen navigation={this.props.navigation}/> */}
      </ImageBackground>

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

export default connect(mapStateToProps, mapDispatchToProps)(SplashPageScreen)
