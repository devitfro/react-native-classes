import { StyleSheet } from "react-native"
import { textColor } from "../../../features/values/colors";

const ChatStyle = StyleSheet.create({
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messagesScroller: {
    flex: 1,
    backgroundColor: 'white',

  },
  messagesContainer: {

  },
  sendBlock: {
    width: '100%',
    height: 50.0, 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5.0,
  },
  sendInput: {
    flex: 1,
  },
  sendButton: {
    width: 42.0, 
    height: 42.0, 
  },
  sendButtonImage: {
    width: 42.0, 
    height: 42.0, 
    tintColor: textColor
  },
 })

 export default ChatStyle;