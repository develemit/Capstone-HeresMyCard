import React, { Component } from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { Container, Button, Header, Left, Body, Title, Content, Form, Item, Input, Label, Right, Icon, H1, H2 } from 'native-base'
import { connect } from 'react-redux'
import FooterScreen from './FooterScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import axios from 'axios'

// Styles
import styles from './Styles/ProfileScreenStyle'
import shelf from '../Images/shelf.jpg'
import rolladex from '../Images/rolladex.png'
import ir from '../Images/ir.png'
import emitbiz from '../Images/emitbiz.jpg'

class ProfileScreen extends Component {
  constructor(){
    super()

    this.state = {
      user_card: 'blank'
    }
}

componentDidMount() {
  let {id} = this.props.navigation.state.params.user
  axios.get(`http://localhost:4000/api/users/${id}`).then(user => this.setState({
    user_card: user.user_card
  }))
}

  render () {
    console.disableYellowBox = true
    console.log('props for ProfileScreen - ', this.props)
    console.log('user for ProfileScreen',this.props.navigation.state.params.user)
    let {navigate} = this.props.navigation
    let { user } = this.props.navigation.state.params
    let {first_name, last_name, email, user_card} = user


    return (
      <ImageBackground source={shelf} style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior='position'>
          <H1 style={{color: 'white', position: "absolute", top: 73, left: 10, fontSize: 35}}>Hello {first_name}!</H1>

          <H2 style={{color:"white", position: "relative", top: 185, left: 10, fontSize: 28}}>My Card: </H2>

          <TouchableOpacity stye={{position: "absolute", top: 130}} onPress={() => navigate('CardsScreen', {user})}>
            { user_card === 'blank' ?
          <Text style={{color: 'aqua', fontSize: 40, position: "absolute", top: 130, left: 125, height: 100}} onPress={() => navigate('CardsScreen', {user})}> Upload Card</Text>
          :
          <Image source={{uri: user_card}} style={{position: "absolute", top: 105, left: 145,  width: 125, height: 75}} onPress={() => navigate('CardsScreen', {user})}></Image>
          }
          </TouchableOpacity>

            <ImageBackground source={rolladex} style={{position: "absolute", top: 225, width: 100, height: 100}}>
              <TouchableOpacity onPress={() => navigate(`MyCards`, {user})}>
              <Text style={{marginTop: 10, marginLeft: 45}}>My </Text>
              <Text style={{position: "absolute", left: 45, top: 43}}>Cards</Text>
              </TouchableOpacity>
            </ImageBackground>
        </KeyboardAvoidingView>
      <FooterScreen navigation={this.props.navigation}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
