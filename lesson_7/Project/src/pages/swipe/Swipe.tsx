import { Text, Touchable, useWindowDimensions } from "react-native";
import { View } from "react-native";
import SwipeStyle from "./css/SwipeStyle";
import { TouchableWithoutFeedback } from "react-native";
import { GestureResponderEvent } from "react-native";
import { endEvent } from "react-native/Libraries/Performance/Systrace";

var startEvent:GestureResponderEvent|null = null;
const minSwipeLength = 100; // dip
const minSwipeVelocity = 0.2; // 100 dip / 500 ms (time)

export default function Swipe () {
  const {width, height} = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const fieldSide = 0.94 * shortSide; // 94% от наименьшего размера (не 100% для отступов)
  const containerDirection = width < height ? 'column' : 'row';

  const beginGesture = (e:GestureResponderEvent) => {
    startEvent = e;
  }
  const endGesture = (e:GestureResponderEvent) => {
    if (startEvent != null) {
      const dx = e.nativeEvent.pageX - startEvent.nativeEvent.pageX;
      const dy = e.nativeEvent.pageY - startEvent.nativeEvent.pageY;
      const dt = e.nativeEvent.timestamp - startEvent.nativeEvent.timestamp;

      if(Math.abs(dx) > 2 * Math.abs(dy)) { // horizontal
        if(Math.abs(dx) / dt > minSwipeVelocity && Math.abs(dx) > minSwipeLength) {
          console.log('horizontal');
        }
        else {
          console.log('horizontal but limited');
        }
      }
      else if (Math.abs(dy) > 2 * Math.abs(dx)) { // vertical
        if(Math.abs(dy) / dt > minSwipeVelocity && Math.abs(dy) > minSwipeLength) {
          console.log('vertical');
        }
        else {
          console.log('vertical but limited');
        }
      }
      else { // not sure, diagonal
        console.log('not sure, diagonal');
        if (dx * dy > 0) {
          console.log("main diagonal");
        } else {
          console.log("anti-diagonal");
        }
      }
      console.log('dx - ', dx, 'dy - ', dy, 'dt - ', dt);

      startEvent = null;
    }
  }

  return (
    <View style={[SwipeStyle.swipeContainer, {flexDirection: containerDirection}]}>
      <Text style={SwipeStyle.swipeTitle}>Swipe</Text>

      <TouchableWithoutFeedback
        onPressIn={beginGesture}
        onPressOut={endGesture}>
          <View style={[SwipeStyle.swipeField, {width: fieldSide, height: fieldSide}]}></View>
      </TouchableWithoutFeedback>


      <View />
    </View>
  )
};

