import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import AppContext from "../../features/context/AppContext";

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
                action: () => {}
              },
              {
                title: 'no',
                action: () => {}
              },
            ]

          })}>
          <Text style={styles.textStyle}>Show Modal</Text>
    </Pressable>
  </>;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
