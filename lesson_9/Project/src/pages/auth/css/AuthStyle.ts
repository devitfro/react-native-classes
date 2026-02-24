import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const AuthStyle = StyleSheet.create({
  authContainer: {
    padding: 10.0,
    borderColor: textColor,
    borderRadius: 10.0,
    borderWidth: 1,
    marginTop: 120.0,
    marginLeft: 20.0,
    marginRight: 20.0,
  },
  authRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30.0,
    marginVertical: 7.0,
  },
  authRowText: {
    color: textColor,
    flex: 1,
  },
  authRowInput: {
    borderWidth: 1.0,
    borderColor: textColor,
    borderRadius: 5.0,
    flex: 3,
    maxWidth: '65%',
    minWidth: '65%',
    color: textColor,
    padding: 10.0,
  },
  authButton: {
    borderWidth: 1.0,
    borderColor: textColor,
    borderRadius: 5.0,
    maxWidth: '45%',
    marginHorizontal: '25%',
    marginTop: 25.0,
    padding: 20.0,
    backgroundColor: '#209a94',
  }, 
  authButtonText: {
    // color: textColor,
    textAlign: 'center',
  },
});

export default AuthStyle;