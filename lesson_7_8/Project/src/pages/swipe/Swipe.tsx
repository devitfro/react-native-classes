import { Text, Touchable, useWindowDimensions } from "react-native";
import { View } from "react-native";
import SwipeStyle from "./css/SwipeStyle";
import { TouchableWithoutFeedback } from "react-native";
import { GestureResponderEvent } from "react-native";
import { endEvent } from "react-native/Libraries/Performance/Systrace";
import { useState } from "react";

var startEvent:GestureResponderEvent|null = null;
const minSwipeLength = 100; // dip
const minSwipeVelocity = 0.2; // 100 dip / 500 ms (time)

interface ISwipeData {
  eventDetails: string,
  eventMessage: string
}

export default function Swipe () {
  const {width, height} = useWindowDimensions();
  const [data, setData] = useState<ISwipeData>({
    eventDetails: '',
    eventMessage: '',
  });

  const shortSide = Math.min(width, height);
  const fieldSide = 0.94 * shortSide; // 94% от наименьшего размера (не 100% для отступов)
  const half = fieldSide / 2;
  const containerDirection = width < height ? 'column' : 'row';
  

  const beginGesture = (e:GestureResponderEvent) => {
    startEvent = e;
  }

  const endGesture = (e:GestureResponderEvent) => {
    if (startEvent != null) {
      const dx = e.nativeEvent.pageX - startEvent.nativeEvent.pageX;
      const dy = e.nativeEvent.pageY - startEvent.nativeEvent.pageY;
      const dt = e.nativeEvent.timestamp - startEvent.nativeEvent.timestamp;
      // const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      if(Math.abs(dx) > 2 * Math.abs(dy)) { // horizontal
        if(Math.abs(dx) / dt > minSwipeVelocity && Math.abs(dx) > minSwipeLength) {
          // data.eventMessage = 'horizontal';
          if(dx > 0) { // e.x1 ----------> e.x2 => dx > 0
            data.eventMessage = 'right';
          }
          else {
            data.eventMessage = 'left';
          }
        }
        else {
          data.eventMessage = 'horizontal but limited';
        }
      }
      else if (Math.abs(dy) > 2 * Math.abs(dx)) { // vertical
        if(Math.abs(dy) / dt > minSwipeVelocity && Math.abs(dy) > minSwipeLength) {
          if(dy > 0) {
            data.eventMessage = 'bottom';
          }
          else {
            data.eventMessage = 'top';
          }
        }
        else {
          data.eventMessage = 'vertical but limited';
        }
      }
      else { // not sure, diagonal
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        if (Math.abs(dx) / dt > minSwipeVelocity && Math.abs(dy) > minSwipeLength) {
          if (angle >= 0 && angle <= 90) {
            data.eventMessage = 'bottom-right';
          } 
          else if (angle > 90 && angle <= 180) {
            data.eventMessage = 'bottom-left';
          }
          else if (angle < 0 && angle >= -90) {
            data.eventMessage = 'top-right';
          } 
          else {
            data.eventMessage = 'top-left';
          }
        } else {
          data.eventMessage = 'diagonal but limited';
        }
      }
      setData({
        ...data,
        eventDetails: `dx = ${dx.toFixed(1)}, dy = ${dy.toFixed(1)}, dt = ${dt}`
      });

      startEvent = null;
    }
  }

  return (
    <View style={[SwipeStyle.swipeContainer, {flexDirection: containerDirection}]}>
      <Text style={SwipeStyle.swipeTitle}>Swipe {data.eventMessage}</Text>

      <TouchableWithoutFeedback
        onPressIn={beginGesture}
        onPressOut={endGesture}>
          <View style={[SwipeStyle.swipeField, {width: fieldSide, height: fieldSide}]}></View>
      </TouchableWithoutFeedback>

      <Text style={SwipeStyle.swipeTitle}>swipe {data.eventDetails}</Text>
    </View>
  )
};

