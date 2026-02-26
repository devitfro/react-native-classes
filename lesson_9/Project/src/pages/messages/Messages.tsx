import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import AppContext from "../../features/context/AppContext";
import { ButtonTypes } from "../../features/ui/button/FirmButton";

export default function Messages() {
  const {showModal} = useContext(AppContext);
  
  return <>
   <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => showModal({
            title: 'Test title',
            message: 'Test message',
            buttons: [
              {
                title: 'yes',
                action: () => {},
                buttonType: ButtonTypes.success
              },
              {
                title: 'don\'t know',
                action: () => {},
                buttonType: ButtonTypes.primary
              },
              {
                title: 'no',
                action: () => {},
                buttonType: ButtonTypes.danger
              },
          
            ]

          })}>
          <Text style={styles.textStyle}>Show Modal</Text>
    </Pressable>
  </>;
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    borderRadius: 10.0,
    padding: 10,
    marginBottom: 20.0,
    marginTop: 20.0,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
    backgroundColor: '#79c2d0',
    borderColor: '#407088',
    borderWidth: 1.0,
    elevation: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
