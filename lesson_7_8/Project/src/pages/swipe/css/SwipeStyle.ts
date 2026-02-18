import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const SwipeStyle = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    display: 'flex',
    //flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  swipeField: {
    borderColor: textColor,
    borderWidth: 1,
    borderRadius: 12,
  },
  swipeTitle: {
    color: textColor
  },
});

export default SwipeStyle;