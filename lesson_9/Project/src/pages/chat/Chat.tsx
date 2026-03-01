import { Image, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import ChatStyle from "./css/ChatStyle";
import { ScrollView } from "react-native";
import { textColor } from "../../features/values/colors";
import { useEffect, useState } from "react";
import ICalcButtonData from "../calc/ui/button/ICalcButtonData";
import IChatMessage from "./orm/IChatMessage";
import ChatApi from "./api/ChatApi";

export default function Chat() {
  // chat.sodes.studio/post
  const [messages, setMessages] = useState<Array<IChatMessage>>([]);
  useEffect(() => {
    ChatApi.getMessages().then(setMessages);
  }, [])

   return (
    <View style={ChatStyle.chatContainer}>
      <ScrollView style={ChatStyle.messagesScroller}>
        <View style={ChatStyle.messagesContainer}>
          {messages.map(m => 
            <View key={m.post_id}>
              <Text>{m.post_at.toDotted()}</Text>
              <Text>{m.name}</Text>
              <Text>{m.content}</Text>
            </View>
          )}
        </View>

      </ScrollView>

      <View style={ChatStyle.sendBlock}>
        <TextInput style={ChatStyle.sendInput} 
                   placeholder="Введіть повідомлення"
                   placeholderTextColor={textColor}/>
        <TouchableOpacity style={ChatStyle.sendButton}>
          <Image source={require('../../features/assets/img/send.png')} 
          style={ChatStyle.sendButtonImage}/>
        </TouchableOpacity>
      </View>
    </View>
   )
}