import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backgroundImage:{
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  tabText: {
    color: "white"
  },
  buttonStyle: {
    position: 'relative',
    top: 100,
    width: 95,
    alignSelf: 'flex-start'
  },
  buttonTwoStyle: {
    position: 'relative',
    top: 100,
    width: 95,
    alignSelf: 'center'
  },
  buttonStyleWithImage: {
    position: 'relative',
    top: 225,
    width: 95,
    alignSelf: 'flex-start'
  },
  buttonTwoStyleWithImage: {
    position: 'relative',
    top: 184,
    width: 95,
    alignSelf: 'flex-end',
  }
})
