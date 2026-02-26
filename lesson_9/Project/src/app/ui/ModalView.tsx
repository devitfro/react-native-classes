import { Alert, Modal, Pressable, Text, View } from "react-native";
import styles from "./ModalViewStyle";
import { useState } from "react";
import IModalData from "../../features/interfaces/modal/IModalData";
import { ButtonTypes, FirmButton } from "../../features/ui/button/FirmButton";

export default function ModalView({modalData, setModalData} 
  : {modalData:IModalData|null, setModalData:React.Dispatch<React.SetStateAction<IModalData | null>>}) {

  const buttonsCount = modalData?.buttons?.length ?? 0;
  const isMultiRow = buttonsCount > 3;
   
  return <Modal
      animationType="slide"
      transparent={true}
      visible={modalData != null}
      onRequestClose={() => setModalData(null)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
           <Pressable
            style={styles.buttonClose}
            onPress={() => setModalData(null)}>
            <Text style={styles.buttonCloseText}>x</Text>
          </Pressable>

          <Text style={styles.modalTitle}>{modalData?.title}</Text>
          <Text style={styles.modalText}>{modalData?.message}</Text>

          {modalData && (modalData.buttons?.length ?? 0) > 0 && 
            <View style={[
              styles.buttonsRow, 
              isMultiRow && styles.buttonsMultiRow
            ]}>
              {modalData.buttons!.map((b, i) => 
                <FirmButton
                  key={i}
                  buttonType={b.buttonType}
                  title={b.title}
                  isMultiRow={isMultiRow}
                  action={() => {
                    if(b.action) b.action();
                    setModalData(null);
                  }}
                />
              )}
            </View>
          }
        
        </View>
      </View>
  </Modal>
}