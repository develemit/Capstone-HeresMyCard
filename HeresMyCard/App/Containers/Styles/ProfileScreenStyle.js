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
  }
})
