import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthStyle from "../css/AuthStyle";
import { textColor } from "../../../features/values/colors";
import AppContext from "../../../features/context/AppContext";

import EditUserView from './EditUserView';

export default function SignedView() {
  const { user, setUser } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const signOutClick = () => setUser(null);

  return (
    <View style={AuthStyle.userContainer}>
      {isEditing ? (
        <EditUserView />
      ) : (
        <View style={AuthStyle.userRow}>
          <Text style={AuthStyle.userRowText}>Вітання, {user!.name}</Text>
          <Text style={AuthStyle.userRowText}>E-mail: {user!.email}</Text>
          <Text style={AuthStyle.userRowText}>Телефон: {user!.phone}</Text>
          <Text style={AuthStyle.userRowText}>Дата народження: {user!.birthdate.toDotted()}</Text>
        </View>
      )}

      <View style={AuthStyle.userButtonRow}>

        <TouchableOpacity style={AuthStyle.userButton} onPress={() => setIsEditing(!isEditing)}>
          <Text style={[AuthStyle.authButtonText, { color: textColor }]}>
            {isEditing ? "Скасувати" : "Редагувати"}
          </Text>
        </TouchableOpacity>

        {!isEditing && (
          <TouchableOpacity style={AuthStyle.userButton} onPress={signOutClick}>
            <Text style={[AuthStyle.authButtonText, { color: textColor }]}>Вихід</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}