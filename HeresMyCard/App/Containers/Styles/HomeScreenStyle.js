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
  middleizeContent: {
    marginTop: 90,
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    alignSelf: 'center'
  },
  buttonPosition: {
    marginTop: 75,
    width: 200,
    alignSelf: 'center'
  },
  bgColorWhite: {
    backgroundColor: "#DCDCE8"
  }
})
