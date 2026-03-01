import { useContext, useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthStyle from "../css/AuthStyle";
import { textColor } from "../../../features/values/colors";
import AppContext from "../../../features/context/AppContext";

export default function EditUserView() {
  const { user, setUser } = useContext(AppContext);

  const [name, setName] = useState(user!.name);
  const [email, setEmail] = useState(user!.email);
  const [phone, setPhone] = useState(user!.phone);
  const [birthdate, setBirthdate] = useState(user!.birthdate.toDotted());

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (
      name.trim().length > 0 &&
      emailRegex.test(email) &&
      phoneRegex.test(phone!) &&
      birthdate.trim().length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, email, phone, birthdate]);

  const saveClick = () => {
    if (!isValid) return;

    setUser({
      ...user!,
      name,
      email,
      phone,
      birthdate: new Date(birthdate.split('.').reverse().join('-')),
    });
  };

  return (
    <View style={AuthStyle.addUserInfoContainer}>
      <View style={AuthStyle.addUserInfoRow}>
        <Text>Name:</Text>
        <TextInput
          style={AuthStyle.userRowInput}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={AuthStyle.addUserInfoRow}>
        <Text>Email:</Text>
        <TextInput
          style={AuthStyle.userRowInput}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={AuthStyle.addUserInfoRow}>
        <Text>Phone:</Text>
        <TextInput
          style={AuthStyle.userRowInput}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={AuthStyle.addUserInfoRow}>
        <Text>Birthdate:</Text>
        <TextInput
          style={AuthStyle.userRowInput}
          value={birthdate}
          onChangeText={setBirthdate}
        />
      </View>

      <View style={AuthStyle.userButtonRow}>
        <TouchableOpacity
          style={[
            AuthStyle.userButton, { opacity: isValid ? 1 : 0.5 }
          ]}
          disabled={!isValid}
          onPress={saveClick}
        >
          <Text style={[AuthStyle.authButtonText, { color: textColor  }]}>
            Зберегти
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}