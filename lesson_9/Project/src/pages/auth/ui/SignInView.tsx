import { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Buffer } from 'buffer';

import AuthStyle from "../css/AuthStyle";
import { textColor } from "../../../features/values/colors";
import AppContext from "../../../features/context/AppContext";

export default function SignedInView() { // Log in
  const [login, setLogin] = useState('exp_user@ukr.net'); 
  const [password, setPassword] = useState('123');
  const [isFormValid, setFormValid] = useState(false);
  const {setUser, showModal} = useContext(AppContext);
  // const {} = useContext(AppContext);

  const signInClick = () => {
    // реєстрація по стандарту http://datatracker.ietf.org/doc/html/rfc7617

    if(login.indexOf(':') >= 0) { // todo додати перевірку при реєстрації
      showModal({
        title: 'Автентифікація',
        message: 'Логін не може містити символ ":"'
      });
      return;
    }   
    
    // constructs the user-pass by concatenating the user-id, a single colon (":") character, and the password
    const user_pass = login + ':' + password;
    // encode + base64
    Buffer.from(user_pass, 'utf-8').toString('base64');

    const basic_credentials = Buffer.from(user_pass, 'utf-8').toString('base64');

    fetch('https://chat.sodes.studio/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + basic_credentials
      }
    }).then(r => r.json()).then(j => {
      console.log(j);
      if(j.status && j.status.code == 200) {
        j.data.birthdate = new Date(j.data.birthdate);
        setUser(j.data);
      }
      else {
        showModal({
          title: 'Автентифікація',
          message: 'Перевірте логін та пароль'
      });
      }
    });
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

function showModal(arg0: { title: string; message: string; }) {
  throw new Error("Function not implemented.");
}
