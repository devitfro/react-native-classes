import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { textColor } from "../../../../features/values/colors";
import ICalcButtonData from "./ICalcButtonData";
import CalcButtonType from "./CalcButtonType";

export default function CalcButton({ data }: { data: ICalcButtonData }) {
  const isDisabled = data.buttonType === CalcButtonType.disabled && !data.isActive;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => data.action?.(data)}
      style={[
        styles.calcBttn,
        data.buttonType === CalcButtonType.digit && styles.digitButton,
        data.buttonType === CalcButtonType.operation && styles.operButton,
        data.buttonType === CalcButtonType.equal && styles.equalButton,
        data.buttonType === CalcButtonType.disabled && styles.disabledButton,
        data.buttonType === CalcButtonType.memory &&
          (data.isActive ? styles.memoryActive : styles.memoryInactive),
      ]}
    >
      <Text
        style={[
          styles.calcBttnText,
          isDisabled && styles.memoryTextInactive,
        ]}
      >
        {data.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  calcBttn: {
    flex: 1,
    margin: 1.5,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcBttnText: {
    color: textColor,
    fontSize: 18,
  },
   digitButton: {
    backgroundColor: '#444',
  },
  operButton: {
    backgroundColor: '#393939',
  },
  equalButton: {
    backgroundColor: '#56caff',
  },
  memoryActive: {
    backgroundColor: '#2f2f2f',
  },
  memoryInactive: {
    backgroundColor: '#2f2f2f',
    opacity: 0.35,
  },
  memoryTextInactive: {
    color: '#777',
  },
  disabledButton: {
    backgroundColor: '#2f2f2f',
    color: '#777',
    opacity: 0.85,
  },
});