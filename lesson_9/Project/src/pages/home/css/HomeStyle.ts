import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const HomeStyle = StyleSheet.create({
  homeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  homeLabel: {
    color: textColor,
    fontSize: 22.0,
  },
  homeImage: {
    width: 45,
    height: 45,
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
    padding: 10.0,
    minWidth: '80%',
    marginBottom: 20,
  }
});

export default HomeStyle;