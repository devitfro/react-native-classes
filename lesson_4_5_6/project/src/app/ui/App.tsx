import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BackHandler, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import AppStyle from "./AppStyle";
import Home from '../../pages/home/Home';
import Calc from "../../pages/calc/Calc";
import { Image } from "react-native";
import { Touchable } from "react-native";

// /product?id=10500
interface IRouteInformation {
  slug: string, // product
  parameters?: Object // {'id': = 10500}
}

export default function App() {
  const [history, setHistory] = useState<Array<IRouteInformation>>([]);
  const [page, setPage] = useState<IRouteInformation>({slug: 'home'});
  const {width, height} = useWindowDimensions();

  const navigate = (route:IRouteInformation) => {
    console.log(history);
    if(route.slug != page.slug || route.parameters != page.parameters) {
      history.push(page);
      setPage(route);
      setHistory([...history]);
    }
  };

  const popRoute = () => { // back
    console.log(history);
    if(history.length > 0) {
      const prevRoute = history.pop()!;
      setPage(prevRoute);
      setHistory([...history]);
    }
    else {
      BackHandler.exitApp();
    }
  };

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      popRoute();
      return true; // stop propagation
    });

    return () => { listener.remove(); };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>
        {width < height &&
          <View style={AppStyle.appBar}>
            <Text style={AppStyle.appBarTitle}>Calculator</Text>
          </View>
        }
        
        <View style={AppStyle.main}>
          {
            page.slug == 'home'? <Home />
            : page.slug == 'calc' ? <Calc />
            : <Text>404</Text>
          }
        </View>

        {width < height &&
          <View style={AppStyle.navBar}>
            <TouchableOpacity 
              onPress={() => navigate({slug: 'home'})}>
              <Image 
                source={require('../assets/img/home.png')} 
                style={{width:28, height:32, tintColor:'grey'}}/>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigate({slug: 'calc'})}>
              <Image 
                source={require('../assets/img/calc.png')} 
                style={{width:32, height:32, tintColor:'grey'}}/>
            </TouchableOpacity>
          </View>
        }
        
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
