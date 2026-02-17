import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const HomeStyle = StyleSheet.create({
  homeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: 'green'
  },
  homeLabel: {
    color: textColor,
    fontSize: 28.0,
  },
  homeImage: {
    width: 50,
    height: 50,
    tintColor: textColor,
    marginRight: 20,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: textColor,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20.0,
    padding: 20.0,
    minWidth: '80%',
    marginBottom: 20,
  }
});

export default HomeStyle;