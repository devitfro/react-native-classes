import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { textColor } from "../../values/colors";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";

export const ButtonTypes = {
  primary: 'primary',
  success: 'success',
  danger: 'danger',
} as const;

export type ButtonTypes = typeof ButtonTypes[keyof typeof ButtonTypes];

export function FirmButton({buttonType, title, action, style} : {
  buttonType?: ButtonTypes, 
  title: string, 
  action?:() => void,
  style?: StyleProp<ViewStyle>
}) {
  if (!buttonType) {
    buttonType = ButtonTypes.primary;
  }

  return(
    <TouchableOpacity
      onPress={() => { if(action) action(); }}
      style={[styles.firmButton, 
        (buttonType == ButtonTypes.danger ? styles.danger 
        : buttonType == ButtonTypes.success ? styles.succes
        : styles.primary), style
        ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  firmButton: {
    borderRadius: 7.0,
    borderWidth: 1.0,
    padding: 5.0,
  },
  primary: {
    // backgroundColor: '#79c2d0',
    backgroundColor: '#38598b',
    borderColor: '#576A8F',
  },
  succes: {
    backgroundColor: '#6CA651',
    borderColor: '#839705',
  },
  danger: {
    backgroundColor: '#C3110C',
    borderColor: '#740A03',
  },
  buttonText: {
    color: textColor,
    textAlign: 'center'
  },
})