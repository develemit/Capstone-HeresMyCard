import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, ImageBackground, StatusBar, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Drawer, Spinner } from 'native-base'
import { connect } from 'react-redux'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import ImagePicker from 'react-native-image-picker'
import Canvas from 'react-native-canvas'
import axios from 'axios'

import RoundedButton from '../Components/RoundedButton'
import FullButton from '../Components/FullButton'
import DrawerButton from '../Components/DrawerButton'
import FooterScreen from './FooterScreen'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import cardBackground from '../Images/0ece0a9d162411510995bb21a1842df6--wallpaper-backgrounds-iphone-wallpaper.jpg'
import emitbiz from '../Images/emitbiz.jpg'
import SwipeUp from '../Images/SwipeUp.gif'
// import noCard from '../Images/noCard.png'
// Styles
import styles from './Styles/CardsScreenStyle'


let options = {
  title: 'Select Card',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class CardsScreen extends Component {
  constructor(){
    super()

    this.state = {
      user: null,
      user_card: "blank",
      animating: false
    }
  }


  onSwipeUp(image){
    this.setState({
      animating: true
    })
    let {id, received_cards} = this.props.navigation.state.params.user
    let fullArray = received_cards
    fullArray.push(image)
    console.log('this is the full array', fullArray)
    axios.patch(`http://localhost:4000/api/users/${id}`, {user: {received_cards: fullArray}}).then(data => Alert.alert("Card Sent", "Your Card is pending approval!")).then(_ => this.setState({animating:false}))

  }

  uploadImage(image){
    let {user} = this.props.navigation.state.params
    let {id} = user

    axios.patch(`http://localhost:4000/api/users/${id}`, {user: {user_card: image}}).then(data => Alert.alert("Card Saved", "This card will now be set as your default card"))

    user.user_card = image
    console.log('user after uploading image - ',user)
  }

  removeImage(){
    let {user} = this.props.navigation.state.params

    user.user_card = "blank"
    console.log('user after remove image - ', user)
    this.setState({
      user
    })
  }

  componentDidMount() {
    let {user} = this.props.navigation.state.params
    this.setState({
      user
    })
  }

  render () {
    console.log("CardsScreen Loaded!", this.props.navigation.state.params.user)
    
    let {navigate} = this.props.navigation
    let {goBack} = this.props.navigation
    let {user} = this.props.navigation.state.params
    let {user_card} = this.state

    // console.log("testing state cardscreen ", this.state.user_card)

    return (
      <ImageBackground style={styles.backgroundImage}>
        <Header style={{backgroundColor:'#1280BC'}}>
          <Left>
            <Button transparent
              onPress={() => navigate('ProfileScreen', {user})}>
              <Icon style={styles.tabText} name='arrow-back' />
              {/* <Text>Go Back!</Text> */}
            </Button>
          </Left>
          <Body>
          <Title style={{color:"white"}}>My Card</Title>
          </Body>
          <Right/>
        </Header>


        <KeyboardAvoidingView behavior='position'>
            <Spinner color='blue' animating={this.state.animating} style={{position: 'absolute', alignSelf: 'center'}}/>
          { user.user_card === "blank" ?
          <View style={{position: "absolute", alignSelf: "center", alignItems: 'center',  backgroundColor:"white", top: 200, width: 300, height: 150}}>

            <Text style={{marginTop: 10}}>No Card Currenlty Selected!</Text>
            <TouchableOpacity style={{marginTop: 10}}  onPress={this.show.bind(this)}>
              <Text style={{color: "blue"}}>Choose Card to Send</Text>
            </TouchableOpacity>
            {/* <Button danger rounded style={styles.buttonStyle} onPress={() => goBack()} ><Text>Go Back</Text></Button> */}
            <Button success rounded style={styles.buttonTwoStyle} onPress={() => alert('Please select a card')}><Text> Upload</Text></Button>
          </View>
        :
        <View style={{alignItems: 'center'}}>
          <Image source={SwipeUp} style={{position: 'absolute', top: 100, alignSelf: 'center', height: 80, width: 80}}/>
          <Text style={{position: 'absolute', top: 75, alignSelf: 'center'}}>Swipe Up to Send</Text>
        <ScrollView style={{height: 175, width: 300, position: 'relative', top: 200}}>
        <GestureRecognizer
          onSwipeUp={() => this.onSwipeUp(user.user_card)}>
          <Image source={{uri: user.user_card}} style={{alignSelf: 'center', height: 150, width: 300}}/>
          </GestureRecognizer>
          </ScrollView>
          <Button danger rounded style={styles.buttonStyleWithImage} onPress={() => this.removeImage()} ><Text>Remove</Text></Button>
          <Button success rounded style={styles.buttonTwoStyleWithImage}
            onPress={() => this.uploadImage(user.user_card)} ><Text> Upload</Text></Button>
          </View>

    }
        </KeyboardAvoidingView>
      {/* <FooterScreen navigation={this.props.navigation}/> */}
      </ImageBackground>
    )
  }
  show() {
    let {user} = this.props.navigation.state.params
    console.log("pushed it!")
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        let source = 'data:image/jpeg;base64,' + response.data

        // this.setState({user_card: 'data:image/jpeg;base64,'+response.data})
        user.user_card = source
        this.setState({
          user
        })
        console.log('user after image select', user)
      }
    })
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

export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen)
