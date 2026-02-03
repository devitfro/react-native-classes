import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const CalcStyle = StyleSheet.create({
  calcContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#222',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  expression: {
    flex: 0.5,
    textAlign: 'right',
    color: '#bbb',
    marginTop: 24,
    marginRight: 14,
    fontSize: 20,
  },
  result: {
    flex: 2,
    color: textColor,
    fontSize: 50,
    textAlign: 'right',
    marginRight: 14,
  },
  memoryRow: {
    flex: 0.8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonRow: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
});

export default CalcStyle;