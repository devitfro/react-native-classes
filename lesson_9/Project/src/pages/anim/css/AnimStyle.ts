import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const AnimStyle = StyleSheet.create({
  animLayout: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5.0,
  },
  animRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  animItem: {
    flex: 1,
    margin: 5.0,
    backgroundColor: '#d0d0d0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  animBlock: {
    width: 100.0,
    height: 100.0,
    backgroundColor: '#385170',

  },
  animLabel: {
    color: '#385170',
    fontWeight: 900,
  },
});

export default AnimStyle;