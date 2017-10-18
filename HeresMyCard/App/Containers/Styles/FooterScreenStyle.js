import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  footerStyle: {
    backgroundColor: "#4F3222",
    position: 'absolute',
    bottom: 0
  },
   tabStyle: {
     color: "white"
   }
})
