import { Pressable, Text, View } from 'react-native';
import AnimStyle from '../anim/css/AnimStyle';
import { Animated } from 'react-native';
import { useRef } from 'react';

let opacityValue = new Animated.Value(1);

export default function Anim() {

  const opacityPress = () => {
    Animated.timing(opacityValue, {
      toValue: 0.0,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  };

  const opacity2Value = useRef(new Animated.Value(1)).current;

  const opacity2Press = () => {
    Animated.sequence([
      Animated.timing(opacity2Value, {
        toValue: 0.0,
        useNativeDriver: true,
        duration: 20,
    }),
      Animated.timing(opacity2Value, {
        toValue: 1.0,
        useNativeDriver: true,
        duration: 1000,
    })
    ]).start();
  };
  
  return(
    <View style={AnimStyle.animLayout}>
      <View style={AnimStyle.animRow}>

        <View style={AnimStyle.animItem}>
          <Pressable onPress={opacityPress}>
            <Animated.View style={{opacity: opacityValue}}>
              <View style={AnimStyle.animBlock}></View>
            </Animated.View>
          </Pressable>
          <Text style={AnimStyle.animLabel}>Fade out (зникнення)</Text>
        </View>

        <View style={AnimStyle.animItem}>
          <Pressable onPress={opacity2Press}>
            <Animated.View style={{opacity: opacity2Value}}>
              <View style={AnimStyle.animBlock}></View>
            </Animated.View>
          </Pressable>
          <Text style={AnimStyle.animLabel}>Fade in (поява)</Text>
        </View>
      </View>

      <View style={AnimStyle.animRow}>
        <View style={AnimStyle.animItem}></View>
        <View style={AnimStyle.animItem}></View>
      </View>

      <View style={AnimStyle.animRow}>
        <View style={AnimStyle.animItem}></View>
        <View style={AnimStyle.animItem}></View>
      </View>
    </View>
  )
};