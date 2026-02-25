import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const RatesStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitleText: {
    color: textColor,
    textAlign: 'center',
  },
  rateItem: {
    margin: 5.0,
    padding: 5.0,
    // backgroundColor: '#233142',
    backgroundColor: '#e7eaf6',
    borderColor: '#222831',
    borderWidth: 1.0,
    borderRadius: 5.0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  rateText: {
    color: '#113f67',
    fontWeight: 900,
  },

  rateTextDescr: {

  },
  // title bar
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50.0,
  },
  titleSearch: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10.0,
    borderColor: textColor,
    borderWidth: 1.0,
    borderRadius: 5.0,
    paddingLeft: 5.0,
  }, 
  titleSearchImg: {
    tintColor: textColor,
    height: 24.0,
    width: 24.0,
  },
  titleSearchInput: {
    marginLeft: 5.0,
    color: textColor,
  },
  titleDate: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10.0,
  },
  titleDateText: {
    color: textColor,
  },
});

export default RatesStyle;