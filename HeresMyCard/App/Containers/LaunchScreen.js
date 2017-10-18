import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import FooterScreen from './FooterScreen'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    let {navigate} = this.props.navigation
    let {goBack} = this.props.navigation
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              Still the launch screen!?!?
            </Text>
          </View>
          <Button
            title="To Homepage"
            onPress={() => navigate('HomeScreen')}
          />
          <DevscreensButton />
        </ScrollView>
        <FooterScreen navigation={this.props.navigation}/>
      </View>
    )
  }
}
