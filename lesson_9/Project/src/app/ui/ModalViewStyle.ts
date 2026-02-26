import { StyleSheet } from "react-native";
import { textColor } from "../../features/values/colors";

const ModalViewStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 7.0,
    padding: 25.0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    position: 'absolute',
    right: 10.0,
    fontWeight: 700,
  },
  buttonCloseText: {
    color: '#f95959',
    fontSize: 24.0,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 5.0,
    textAlign: 'center',
    color: '#233142',
    fontWeight: 600,
    fontSize: 16.0,
  },
  modalText: {
    marginBottom: 15.0,
    textAlign: 'center',
    color: '#113f67',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5.0,
  },
});

export default ModalViewStyle;
