import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Home from '../../pages/home/Home';
import AppStyle from "./AppStyle";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>
        <View style={AppStyle.appBar}>
          <Text style={AppStyle.appBarTitle}>Header!</Text>
        </View>

        <View style={AppStyle.main}>
          <Home />
        </View>

        <View style={AppStyle.navBar}>
          <View style={AppStyle.navBarBttn}>
            <Text style={AppStyle.navBarBttnTitle}>HOME</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
