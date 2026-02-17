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
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
});

export default AppStyle;