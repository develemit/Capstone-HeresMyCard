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

import FooterScreen from './FooterScreen'
// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor(props){
    super(props)

      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",

        spinner: false,
        firstX: false,
        lastX: false,
        emailX: false,
        passwordX: false,
        confirmPasswordX: false
      }
  }

  submitUser(){
    let {first_name, last_name, email, password, confirmPassword} = this.state
    let {navigate} = this.props.navigation
    let newUser = {
      first_name,
      last_name,
      email: this.state.email.toLowerCase(),
      password,
      user_card: "blank"
    }
    console.log("submit log - ", newUser)

    this.setState({
      spinner: true
    })

    first_name == '' || last_name == '' || email == '' || password == ''  || confirmPassword == '' ?
      Alert.alert(`All Fields Required`, `Please complete all fields`) :
    password !== confirmPassword ?
      Alert.alert("Passwords Must Match", "Please check passwords and try again") :
      axios.get('http://localhost:4000/api/users').then(res => {
    res.data.data.find(data => data.email === email.toLowerCase()) ?
       Alert.alert(`Email is Unavailable`,`${email} already in use`) :
    axios.post('http://localhost:4000/api/users', {user: newUser}).then(user => navigate('ProfileScreen', {user: user.data.data}))
    })

    setTimeout(() => this.setState({spinner:false}), 1000)
}

  clearFields(){
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstX: false,
      lastX: false,
      emailX: false,
      passwordX: false,
      confirmPasswordX: false
    })
  }
  clearFirst(){
    this.setState({
      first_name: '',
      firstX: false
    })
  }
  clearLast(){
    this.setState({
      last_name: '',
      lastX: false
    })
  }
  clearEmail(){
    this.setState({
      email: '',
      emailX: false
    })
  }
  clearPassword(){
    this.setState({
      password: '',
      passwordX: false
    })
  }
  clearConfirmPassword(){
    this.setState({
      confirmPassword: '',
      confirmPasswordX: false
    })
  }

  // updateFirstName(first_name) {
  //   this.setState({first_name})
  //   console.log('SOMETHING IS HAPPENING! - ',first_name);
  // }
  // updateLastName(last_name) {
  //   this.setState({last_name})
  //   console.log('SOMETHING IS HAPPENING! - ',last_name);
  // }
  // updateEmail(email) {
  //   this.setState({email})
  //   console.log('SOMETHING IS HAPPENING! - ',email);
  // }



  render () {
      // let FirstClose = React.createElement(
      //   <Text> Hello! </Text>
      // )
      console.log("HomeScreen Loaded!", this.props)
      let {navigate, goBack} = this.props.navigation
      let {first_name, last_name, email, password, confirmPassword, firstX, lastX, emailX, passwordX, confirmPasswordX, spinner} = this.state
      let {clearFirst, clearLast, clearEmail} = this
      console.log('this is state of HomeScreen', this.state)
      console.log("refs? ", this.refs)

      // let x = window.getElementById("close")
      console.log(this)


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
        <KeyboardAvoidingView behavior='position' style={styles.middleizeContent}>

          <Spinner animating={spinner} size="large" color="blue" style={{position: 'absolute', alignSelf: 'center', zIndex: 2}}/>

          <Form style={styles.bgColorWhite}>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input value={this.state.first_name}
              onChangeText={(first_name) => this.setState({first_name})} onFocus={() => this.setState({firstX: true})}/>
                { first_name !== '' ? <Icon name="close" onPress={() => this.clearFirst()}/> : null}
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input value={this.state.last_name}
              onChangeText={(last_name) => this.setState({last_name})}
              onFocus={() => this.setState({lastX: true})}/>
              { last_name !== '' ? <Icon name="close" onPress={() => this.clearLast()}/> : null}
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              onFocus={() => this.setState({emailX: true})}/>
              { email !== '' ? <Icon name="close" onPress={() => this.clearEmail()}/> : null}
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              onFocus={() => this.setState({passwordX: true})}/>
              { password !== '' ? <Icon name="close" onPress={() => this.clearPassword()}/> : null}
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry value={this.state.confirmPassword}
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              onFocus={() => this.setState({confirmPasswordX: true})}/>
              { confirmPassword !== '' ? <Icon name="close" onPress={() => this.clearConfirmPassword()}/> : null}
            </Item>

            <Button bordered block success onPress={() => this.submitUser()} style={styles.buttonPosition}>
              <Text style={{fontSize: 20}}>Sign Up</Text>
            </Button>
            <Button bordered block danger onPress={() => this.clearFields()}
            style={styles.buttonStyle}>
              <Text style={{fontSize: 20}}>Clear all</Text>
            </Button>
          </Form>
        </KeyboardAvoidingView>
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
    // GetUsersActions: bindActionCreators(GetUsersActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
