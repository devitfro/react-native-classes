import { Alert, Button, Text, Touchable, TouchableOpacity, View } from "react-native";
import AuthStyle from "./css/AuthStyle";
import { TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { textColor } from "../../features/values/colors";
import AppContext from "../../features/context/AppContext";


export default function Auth() {
  const [login, setLogin] = useState('user');
  const [password, setPassword] = useState('123');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  const [isInfo, setInfo] = useState(false);
  const {user, setUser} = useContext(AppContext);

  useEffect(() => {
    setFormValid(login.length > 2 && password.length > 2);
  }, [login, password]);

  const signInClick = () => {
    if(login == 'user' && password == '123') {
      setUser({
        name: 'User',
        token: '123',
      });
    }
  };

  const signOutClick = () => {
    setUser(null);
    setInfo(false);
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{9,15}$/.test(phone); // только цифры, 9-15 символов
  };

  const addInfoClick = () => {
    if (!user) return;

    if (!validateEmail(email)) {
      Alert.alert("Помилка", "Введіть правильний email");
      return;
    }

     if (!validatePhone(phone)) {
      Alert.alert("Помилка", "Введіть правильний номер телефону (9-15 цифр)");
      return;
    }

    setUser({
      ...user,
      email,
      phone
    });

    setInfo(false);
  };

  return (!!user 
    ? <View style={AuthStyle.userContainer}>
        <View style={AuthStyle.userRow}>
          <Text style={AuthStyle.userRowText}>Вітання, {user.name}</Text>
          <Text style={AuthStyle.userRowText}>Ваш email: {user.email}</Text>
          <Text style={AuthStyle.userRowText}>Ваш номер телефону: {user.phone}</Text>
        </View>

        <View style={AuthStyle.userButtonRow}>
          <TouchableOpacity style={AuthStyle.userButton} onPress={() => setInfo(true)}>
            <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Додати інформацію до свого профілю</Text>
          </TouchableOpacity>

          <TouchableOpacity style={AuthStyle.userButton} onPress={signOutClick}>
            <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Вихід</Text>
          </TouchableOpacity> 
        </View>

        {isInfo && (
          <View style={AuthStyle.addUserInfoContainer}>
            <View style={AuthStyle.addUserInfoRow}>
              <Text style={AuthStyle.userRowText}>Email</Text>
              <TextInput style={AuthStyle.userRowInput} value={email} onChangeText={setEmail}/>
            </View>

            <View style={AuthStyle.addUserInfoRow}>
              <Text style={AuthStyle.userRowText}>Номер телефону</Text>
              <TextInput style={AuthStyle.userRowInput} value={phone} onChangeText={setPhone}/>
            </View>

            <TouchableOpacity style={AuthStyle.userButton} onPress={addInfoClick}>
              <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Зберегти</Text>
            </TouchableOpacity>
        </View>
        )}
      </View>

    : <View style={AuthStyle.authContainer}>
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
    </View>
  );
}