import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BackHandler, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import AppStyle from "./AppStyle";
import { Image } from "react-native";
import Home from '../../pages/home/Home';
import Calc from "../../pages/calc/Calc";
import Swipe from "../../pages/swipe/Swipe";
import IRouteInformation from "../../features/interfaces/IRouteInformation";
import AppContext from "../../features/context/AppContext";


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
            <TouchableOpacity onPress={() => popRoute()}>
              <Text style={AppStyle.appBackIcon}>&lt;</Text>
            </TouchableOpacity>
            <Text style={AppStyle.appBarTitle}>Calculator</Text>
          </View>
        }

        <AppContext.Provider value={{navigate}}>
          <View style={AppStyle.main}>
          {
            page.slug == 'home'? <Home />
            : page.slug == 'swipe' ? <Swipe />
            : page.slug == 'calc' ? <Calc />
            : <Text>404</Text>
          }
        </View>
        </AppContext.Provider>
        
        {width < height &&
          <View style={AppStyle.navBar}>
            <TouchableOpacity 
              onPress={() => navigate({slug: 'home'})}>
              <Image 
                source={require('../../features/assets/img/home.png')} 
                style={{width:28, height:32, tintColor:'grey'}}/>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigate({slug: 'calc'})}>
              <Image 
                source={require('../../features/assets/img/calc.png')} 
                style={{width:32, height:32, tintColor:'grey'}}/>
            </TouchableOpacity>
          </View>
        }
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
