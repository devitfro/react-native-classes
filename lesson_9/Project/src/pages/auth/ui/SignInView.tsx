import { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthStyle from "../css/AuthStyle";
import { textColor } from "../../../features/values/colors";
import AppContext from "../../../features/context/AppContext";

export default function SignedInView() { // Log in
  const [login, setLogin] = useState('user');
  const [password, setPassword] = useState('123');
  const [isFormValid, setFormValid] = useState(false);
  const {setUser} = useContext(AppContext);

  const signInClick = () => {
    if(login == 'user' && password == '123') {
      setUser({
        name: 'user',
        token: '123',
      });
    }
  };

  useEffect(() => {
    setFormValid(login.length > 2 && password.length > 2);
  }, [login, password]);

  return <>
    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Логін</Text>
      <TextInput style={AuthStyle.authRowInput} value={login} onChangeText={setLogin}/>
    </View>

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Пароль</Text>
      <TextInput secureTextEntry={true} style={AuthStyle.authRowInput} value={password} onChangeText={setPassword}/>
    </View>

    <TouchableOpacity style={AuthStyle.authButton} onPress={isFormValid ? signInClick : undefined}>
      <Text style={[AuthStyle.authButtonText, {color: isFormValid ? textColor : '#757'}]}>Вхід</Text>
    </TouchableOpacity>
  </>;
};