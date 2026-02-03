import { StyleSheet } from "react-native";
import {textColor, textTitleColor } from '../../features/values/colors';

const AppStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142d4c',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  appBar: { // header
    paddingVertical: 10, // dp - (dip) - density (independed) pixel
    backgroundColor: '#ececec',
    width: '100%',
  },
  appBarTitle: {
    color: textTitleColor,
    fontWeight: 700,
    textAlign: 'center',
  },
  main: { 
    flex: 1,
    width: '100%',
    backgroundColor: '#385170',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBar: { // footer
    width: '100%',
    backgroundColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  // navBarBttn: {
  //   backgroundColor:'#9fd3c7',
  //   borderColor: '#385170',
  //   borderWidth: 1.5,
  //   borderRadius: 4,
  //   elevation: 4,
  //   paddingHorizontal: 24,
  //   paddingVertical: 8,
  //   width: '50%',
  // },
  // navBarBttnTitle: {
  //   color: textTitleColor,
  //   paddingVertical: 8,
  //   fontWeight: 700,
  //   textAlign: 'center'
  // }
});

export default AppStyle;