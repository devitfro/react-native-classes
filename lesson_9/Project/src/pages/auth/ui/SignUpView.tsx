import { use, useContext, useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import AuthStyle from "../css/AuthStyle";
import DatePicker from "react-native-date-picker";
import { ButtonTypes, FirmButton } from "../../../features/ui/button/FirmButton";
import AppContext from "../../../features/context/AppContext";
import { textColor } from "../../../features/values/colors";

interface IUserFormData {
  name: string,
  email: string,
  birthdate: Date|null,
  password: string,
  repeatePassword: string,
  phone?: string,
}

const emptyUserFormData = {
  name: '',
  email: '',
  birthdate: null,
  password: '',
  repeatePassword: '',
  phone: '',
}

const testUserFormData = {
  name: 'user',
  email: 'user2@test.com',
  birthdate: new Date('2000-03-03'),
  password: '123',
  repeatePassword: '123',
  phone: '+380912322347',
}

export default function SignedUpView({setPageMode}: {setPageMode:React.Dispatch<React.SetStateAction<string>>}) {
  const [userFormData, setUserFormData] = useState<IUserFormData>(testUserFormData);
  const [isOpen, setOpen] = useState<boolean>(false);
  // const [isFormValid, setFormValid] = useState(false);
  const {showModal} = useContext(AppContext);

  const isFormValid = (): boolean => {
    return (
      userFormData.name.trim().length >= 3 &&
      validateEmail(userFormData.email) &&
      !!userFormData.birthdate &&
      userFormData.password.length >= 4 &&
      userFormData.password === userFormData.repeatePassword &&
      validatePhone(userFormData.phone ?? "")
    );
  };

  // useEffect(() => {
  //   setFormValid(userFormData.name.length > 2 
  //     && userFormData.email.length > 5 
  //     && userFormData.birthdate != null 
  //     && userFormData.password.length > 2 
  //   );
  // }, [userFormData]);

  const validateEmail = (email: string) => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+\d{12}$/.test(phone);
  };

  const onSignUpButtonPress = () => {
    const errors: string[] = [];

    if (userFormData.name.trim().length < 3) {
      errors.push("Ім'я повинно містити мінімум 3 символи");
    }

    if (!validateEmail(userFormData.email)) {
      errors.push("Email має некоректний формат");
    }

    if (!userFormData.birthdate) {
      errors.push("Оберіть дату народження");
    }

    if (userFormData.password.length < 4) {
      errors.push("Пароль повинен містити мінімум 4 символи");
    }

    if (userFormData.password !== userFormData.repeatePassword) {
      errors.push("Паролі не співпадають");
    }

    if (!validatePhone(userFormData.phone ?? "")) {
      errors.push("Телефон повинен бути у форматі + та 12 цифр");
    }

    if (errors.length > 0) {
      showModal({
        title: "Помилка реєстрації",
        message: errors.join("\n"),
        buttons: [
          { title: "ОК", buttonType: ButtonTypes.danger }
        ]
      });
      return;
    }

    const sentData = {
      ...userFormData,
      birthdate: userFormData.birthdate?.toSqlDate()
    };

    fetch('https://chat.sodes.studio/user', {
      method: 'POST',
      body: JSON.stringify(sentData)
    }).then(r => r.json()).then(j => {
      if(j.status.code != 200) {
        showModal({
          title: 'Помилка реєстрації',
          message: j.status.message,
          buttons: [
            {title: 'Коригувати', buttonType: ButtonTypes.danger}
          ]
      });
    }
      else {
        showModal({
          title: 'Успішна реєстрація',
          message: 'Використовуйте дані для входу',
          buttons: [
            {title: 'Вхід', buttonType: ButtonTypes.success, action: () => setPageMode('SignIn')}
          ]
        })
      }
    });
  };

  return <>
    <View>
      <Text style={{marginBottom: 20.0, color: textColor}}>Реєстрація нового користувача</Text>
    </View>

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Ім'я</Text>
      <TextInput style={AuthStyle.authRowInput} 
                 value={userFormData.name} 
                 onChangeText={t => setUserFormData({...userFormData, name: t})}/>
    </View>

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Email</Text>
      <TextInput style={AuthStyle.authRowInput} 
                 value={userFormData.email} 
                 onChangeText={e => setUserFormData({...userFormData, email: e})}/>
    </View>

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Пароль</Text>
      <TextInput secureTextEntry={true} 
                 style={AuthStyle.authRowInput} 
                 value={userFormData.password} 
                 onChangeText={p => setUserFormData({...userFormData, password: p})}/>
    </View>

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Повторити пароль</Text>
      <TextInput secureTextEntry={true} 
                 style={AuthStyle.authRowInput} 
                 value={userFormData.repeatePassword} 
                 onChangeText={p => setUserFormData({...userFormData, repeatePassword: p})}/>
    </View>

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Дата народження</Text>
      <Text style={AuthStyle.authRowInput} onPress={() => setOpen(true)}>
        {userFormData.birthdate?.toDotted()}
      </Text>
    </View>

    <DatePicker
          modal
          open={isOpen}
          mode="date"
          date={userFormData.birthdate ?? new Date()}
          onConfirm={(date) => setUserFormData({...userFormData, birthdate: date})}
          onCancel={() => {
            setOpen(false);
            setUserFormData({...userFormData, birthdate: null})}}
    />

    <View style={AuthStyle.authRow}>
      <Text style={AuthStyle.authRowText}>Телефон</Text>
      <TextInput style={AuthStyle.authRowInput} 
                 value={userFormData.phone} 
                 onChangeText={ph => setUserFormData({...userFormData, phone: ph})}/>
    </View>

    <FirmButton buttonType={isFormValid() ? ButtonTypes.success : ButtonTypes.danger} title="Зареєструватися" 
                style={{margin: 20.0}}
                action={onSignUpButtonPress}/>
  </>;
};