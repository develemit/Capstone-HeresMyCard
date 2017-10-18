import React, { Component } from 'react'
import { ImageBackground, View, ScrollView, Text, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import { Container, Button, Header, Left, Body, Title, Content, Form, Item, Input, Label, Right, Icon, Spinner } from 'native-base'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import axios from 'axios'
import RoundedButton from '../Components/RoundedButton'
import FullButton from '../Components/FullButton'
import DrawerButton from '../Components/DrawerButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import GetUsersActions from '../Redux/GetUsersRedux'

import mainBackground from '../Images/main-background.jpg'

import ProfileScreen from './ProfileScreen'
import FooterScreen from './FooterScreen'
// Styles
import styles from './Styles/SignInScreenStyle'

class HomeScreen extends Component {
  constructor(props){
    super(props)

      this.state = {
        email: "",
        password: "",

        animating: false,

        emailX: false,
        passwordX: false,
      }
  }

  signIn(){


    let {email, password} = this.state
    let {navigate} = this.props.navigation
    let person = {
      email,
      password,
    }
    console.log('navigate?', this.props)
    this.setState({
      animating: true
    })
    email == '' || password == '' ?
      Alert.alert("All Fields Required","Please complete missing fields", this.setState({
        animating: false
      })) :
      axios.get(`http://localhost:4000/api/user/${email.toLowerCase()}`).then(res => {
        let  user = res.data.data
        console.log('the user is ', user)
        user === null ?
        Alert.alert('Email not found',`No account found registered to: \n ${email}`) :
        user.password === password ?
        // alert(`signing in as ${user.first_name}`) :
        navigate('ProfileScreen', {user}):
        Alert.alert(`Password is incorrect`,`Please try again`)
        this.setState({
          animating: false
        })
      })
  }

  clearFields(){
    this.setState({
      email: '',
      password: '',
      emailX: false,
      passwordX: false,
    })
  }
  clearFirst(){
    this.setState({
      email: '',
      emailX: false
    })
  }
  clearLast(){
    this.setState({
      password: '',
      passwordX: false
    })
  }

  getUsers(){
    axios.get('http://localhost:4000/api/users').then(data => {
      data.data.data.map(user => {
        let {email: first, password: last} = user
        console.log(`${first} ${last}`)
      })
    })
  }

  render () {
      console.log("HomeScreen Loaded!", this.props)
      let {navigate, goBack} = this.props.navigation
      let {email, password, emailX, passwordX, animating} = this.state
      let {clearFirst, clearLast} = this

    return (

        <ImageBackground source={mainBackground} style={styles.backgroundImage}>
          <Header style={{position: "absolute", backgroundColor:"rgba(0,0,0,0)", borderBottomWidth:0}}>
            <Left>
              <Button transparent
                onPress={() => navigate("SplashPageScreen")}>
                <Icon style={{color: "white"}} name='arrow-back' />
                {/* <Text>Go Back!</Text> */}
              </Button>
            </Left>
          </Header>

        <View behavior='position' style={styles.middleizeContent}>
          <Spinner animating={animating} size="large" color="blue" style={{position: 'absolute', alignSelf: 'center'}}/>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email}
              onChangeText={(email) => this.setState({email})} onFocus={() => this.setState({emailX: true})}/>
                { email !== '' ? <Icon name="close" onPress={() => this.clearFirst()}/> : null}
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              onFocus={() => this.setState({passwordX: true})}/>
              { password !== '' ? <Icon name="close" onPress={() => this.clearLast()}/> : null}
            </Item>

            <Button block success onPress={() => this.signIn()} style={styles.buttonPosition}>
              <Text>Sign In</Text>
            </Button>

            <Button block danger onPress={() => this.clearFields()}
              style={styles.buttonStyle}>
              <Text>Clear all</Text>
            </Button>
          </Form>
        </View>
        </ImageBackground>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    // users = state.GetUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetUsersActions: bindActionCreators(GetUsersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
