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
    flex: 0.8,
    textAlign: 'right',
    marginTop: 24,
    marginRight: 14,
    fontSize: 20,
    marginBottom: 12,
    textAlignVertical: 'bottom',
    color: textColor
  },
  result: {
    flex: 2,
    color: textColor,
    textAlign: 'right',
    marginRight: 14,
  },
  memoryRow: {
    flex: 1,
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
  // landscape styles
  containerResExpMem: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  containerExpMem: {
    flex: 3,
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default CalcStyle;