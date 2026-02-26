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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10.0,
    marginBottom: 20.0,
  },
  pageSwitchButton: {
    flex: 1, 
    marginHorizontal: 10.0,
  },
  authRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    minHeight: 42.0,
    paddingHorizontal: 5.0,
    paddingVertical: 10.0
  },
  authButton: {
    borderWidth: 1.0,
    borderColor: textColor,
    borderRadius: 5.0,
    maxWidth: '55%',
    minWidth: '55%',
    marginHorizontal: '25%',
    marginTop: 25.0,
    padding: 20.0,
    backgroundColor: '#209a94',
  }, 
  authButtonText: {
    textAlign: 'center',
  },
  userContainer: {
    padding: 10.0,
    borderColor: textColor,
    borderRadius: 10.0,
    borderWidth: 1,
    marginTop: 120.0,
    marginLeft: 20.0,
    marginRight: 20.0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  userRow: {
    width: '100%',
  },
  userRowText: {
    padding: 10.0,
    marginBottom: 10.0,
    fontSize: 14.0,
    color: textColor,
    // textDecorationLine: 'underline',
    // textDecorationColor: textColor,
  },
  userButtonRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0
  },
  userButton: {
    borderWidth: 1.0,
    borderColor: textColor,
    borderRadius: 5.0,
    padding: 20.0,
    backgroundColor: '#209a94',
    margin: 25.0,
    maxWidth: '50%'
  }, 
  userRowInput: {
    borderWidth: 1.0,
    borderColor: textColor,
    borderRadius: 5.0,
    flex: 3,
    maxWidth: '55%',
    minWidth: '55%',
    color: textColor,
    padding: 10.0,
  },
  addUserInfoContainer: {
    width: '100%',
  },
  addUserInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default AuthStyle;