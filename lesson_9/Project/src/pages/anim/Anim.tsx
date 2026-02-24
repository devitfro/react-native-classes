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

  const scaleValue = useRef(new Animated.Value(1)).current;

  const scalePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.25,
        useNativeDriver: true,
        duration: 300,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.0,
        useNativeDriver: true,
        duration: 300,
      }),
    ]).start();
  };

  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotatePress = () => {
      Animated.sequence([  
          Animated.timing(rotateValue, {
              toValue: 1,
              useNativeDriver: true,
              duration: 300,
          }),
          Animated.timing(rotateValue, {
              toValue: 0,
              useNativeDriver: true,
              duration: 300,
          }),
      ]).start();
  };

  const rotateDeg = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],  // Map 0 to 0deg, 1 to 45deg
  });

  const translateValue = useRef(new Animated.Value(0)).current;
  const transOpacityValue = useRef(new Animated.Value(1)).current;

  const translatePress = () => {
    Animated.parallel([
      Animated.sequence([  
        Animated.timing(translateValue, {
          toValue: 30,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(translateValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
        }),
      ]),
      Animated.sequence([  
        Animated.timing(transOpacityValue, {
          toValue: 0.25,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(transOpacityValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 300,
        }),
      ]),
    ]).start();
  };

  const translateValueRight = useRef(new Animated.Value(0)).current;
  const translateValueLeft = useRef(new Animated.Value(0)).current;
  const translateValueTop = useRef(new Animated.Value(0)).current;
  const translateValueBottom = useRef(new Animated.Value(0)).current;
  const scaleAnimValue = useRef(new Animated.Value(1)).current;
  const opacityAnimValue = useRef(new Animated.Value(0.6)).current;
  const rotateAnimValue = useRef(new Animated.Value(0)).current;

  const translateX = Animated.add(translateValueRight, translateValueLeft);
  const translateY = Animated.add(translateValueTop, translateValueBottom);

  const rotateAnimDeg = rotateAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'], 
  });

  const animationPress = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(translateValueRight, {
          toValue: 30,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueTop, {
          toValue: -30,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacityAnimValue, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(scaleAnimValue, {
          toValue: 0.75,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(rotateAnimValue, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueLeft, {
          toValue: -30,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueBottom, {
          toValue: 30,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueLeft, {
          toValue: -60,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueBottom, {
          toValue: 60,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(scaleAnimValue, {
          toValue: 1.0,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacityAnimValue, {
          toValue: 1.0,
          useNativeDriver: true,
          duration: 300,
        }),
        Animated.timing(rotateAnimValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueTop, {
          toValue: -60,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(translateValueRight, {
          toValue: 60,
          useNativeDriver: true,
          duration: 500,
        }),
      ])
    ]).start();
  }
  
  return(
  <View style={AnimStyle.animLayout}>
    <View style={AnimStyle.animRow}>
      <View style={AnimStyle.animItem}>
        <Pressable onPress={opacityPress}>
          <Animated.View style={{ opacity: opacityValue }}>
            <View style={AnimStyle.animBlock}></View>
          </Animated.View>
        </Pressable>
        <Text style={AnimStyle.animLabel}>Fade out (зникнення)</Text>
      </View>

      <View style={AnimStyle.animItem}>
        <Pressable onPress={opacity2Press}>
          <Animated.View style={{ opacity: opacity2Value }}>
            <View style={AnimStyle.animBlock}></View>
          </Animated.View>
        </Pressable>
        <Text style={AnimStyle.animLabel}>Fade in (поява)</Text>
      </View>
    </View>

    <View style={AnimStyle.animRow}>
      <View style={AnimStyle.animItem}>
        <Pressable onPress={scalePress}>
          <Animated.View style={{ transform: [{ scaleX: scaleValue }, { scaleY: scaleValue }] }}>
            <View style={AnimStyle.animBlock}></View>
          </Animated.View>
        </Pressable>
        <Text style={AnimStyle.animLabel}>Scale (масштаб)</Text>
      </View>

      <View style={AnimStyle.animItem}>
        <Pressable onPress={rotatePress}>
          <Animated.View style={{ transform: [{ rotate: rotateDeg }]}} >
            <View style={AnimStyle.animBlock}></View>
          </Animated.View>
        </Pressable>
        <Text style={AnimStyle.animLabel}>Rotate (поворот)</Text>
      </View>
    </View>

    <View style={AnimStyle.animRow}>
        <View style={AnimStyle.animItem}>
          <Pressable onPress={translatePress}>
            <Animated.View style={{ opacity: transOpacityValue, transform: [{ translateX: translateValue }]}} >
              <View style={AnimStyle.animBlock}></View>
            </Animated.View>
          </Pressable>
          <Text style={AnimStyle.animLabel}>Translate (зміщення)</Text>
        </View>

        <View style={AnimStyle.animItem}>
          <Pressable onPress={animationPress}>
            <Animated.View style={{ 
              opacity: opacityAnimValue,
              transform: [
                { translateX },
                { translateY }, 
                { scaleX: scaleAnimValue }, 
                { scaleY: scaleAnimValue },
                { rotate: rotateAnimDeg }] 
              }}>
              <View style={AnimStyle.animBlock}></View>
            </Animated.View>
          </Pressable>
          <Text style={AnimStyle.animLabel}>Animation (анімація)</Text>
        </View>
    </View>
  </View>
  )
};