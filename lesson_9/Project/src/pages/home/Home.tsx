import { Image, Text, TouchableOpacity, View , ImageSourcePropType, ScrollView} from "react-native";
import { useContext } from "react";

import HomeStyle from "./css/HomeStyle";
import AppContext from "../../features/context/AppContext";

export default function Home() {
  return (
  <View style={HomeStyle.homeContainer}>
    <MenuItem title="Калькулятор" slug="calc" imgSrc={require('../../features/assets/img/calc.png')} />
    <MenuItem title="Жести: cвайпи" slug="swipe" imgSrc={require('../../features/assets/img/swipe.png')} />
    <MenuItem title="Анімації" slug="anim" imgSrc={require('../../features/assets/img/anim.png')} />
    <MenuItem title="Обмін валют" slug="rates" imgSrc={require('../../features/assets/img/rates.png')} />
    <MenuItem title="Повідомлення" slug="messages" imgSrc={require('../../features/assets/img/message.png')} />
  </View>
  )
};

function MenuItem({title, imgSrc, slug}:{title:string, imgSrc:ImageSourcePropType, slug:string}){
  const {navigate} = useContext(AppContext);

  return (
    <TouchableOpacity 
      onPress={() => navigate({slug})} 
      style={HomeStyle.menuItem}>

      <Image source={imgSrc} style={HomeStyle.homeImage}/>
      <Text style={HomeStyle.homeLabel}>{title}</Text>
    </TouchableOpacity> 
  )
};