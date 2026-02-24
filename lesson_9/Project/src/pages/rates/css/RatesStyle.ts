import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const RatesStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    color: textColor,
    width: '100%',
    textAlign: 'center',
  },
  rateItem: {
    margin: 5.0,
    padding: 5.0,
    backgroundColor: '#233142',
    borderColor: '#222831',
    borderWidth: 1.0,
    borderRadius: 5.0,
  },
  rateText: {
    color: textColor,

  },
});

export default RatesStyle;