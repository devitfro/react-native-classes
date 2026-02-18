import { StyleSheet } from "react-native";
import { textColor, textTitleColor } from "../../features/values/colors";

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
    paddingVertical: 10, // dp - (dip) - density (independed) pixelx
    backgroundColor: '#ececec',
    // backgroundColor: 'pink',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBackIcon: {
    color: textTitleColor,
    fontWeight: 700,
    fontSize: 25,
    marginLeft: 20,
  },
  appBarTitle: {
    width: '100%',
    color: textTitleColor,
    fontWeight: 700,
    textAlign: 'center',
  },
  main: { 
    flex: 1,
    width: '100%',
    backgroundColor: '#385170',
  },
  navBar: { // footer
    width: '100%',
    backgroundColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
});

export default AppStyle;