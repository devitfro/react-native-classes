import { Alert, Button, Text, Touchable, TouchableOpacity, View } from "react-native";
import AuthStyle from "./css/AuthStyle";
import { TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { textColor } from "../../features/values/colors";
import AppContext from "../../features/context/AppContext";
import { ButtonTypes, FirmButton } from "../../features/ui/button/FirmButton";
import SignedUpView from "./ui/SignUpView";
import SignedInView from "./ui/SignInView";

function PageSwitchWidget({pageMode, setPageMode}: {pageMode:string, setPageMode:React.Dispatch<React.SetStateAction<string>>}) {
  return(
    <View style={AuthStyle.pageSwitch}>
      <FirmButton title="Вхід" 
                  style={AuthStyle.pageSwitchButton} 
                  buttonType={pageMode == 'SignUp' ? ButtonTypes.primary : ButtonTypes.success}
                  action={() => setPageMode('SignIn')}/>
      <FirmButton title="Реєстрація" 
                  style={AuthStyle.pageSwitchButton} 
                  buttonType={pageMode == 'SignUp' ? ButtonTypes.success : ButtonTypes.primary}
                  action={() => setPageMode('SignUp')} />
    </View>
  )
}

function SignedView() {
  const {user, setUser} = useContext(AppContext);

  const signOutClick = () => {
    setUser(null);
  };

  return (
    <View style={AuthStyle.userContainer}>
        <View style={AuthStyle.userRow}>
          <Text style={AuthStyle.userRowText}>Вітання, {user!.name}</Text>
        </View>
        <TouchableOpacity style={AuthStyle.userButton} onPress={signOutClick}>
          <Text style={[AuthStyle.authButtonText, {color: textColor}]}>Вихід</Text>
        </TouchableOpacity> 
     </View>
  );
};

export default function Auth() {
  const {user} = useContext(AppContext);
  const [pageMode, setPageMode] = useState('SignUp');

return (!!user 
  ? <SignedView />
  : <View style={AuthStyle.userContainer}>

      <PageSwitchWidget pageMode={pageMode} setPageMode={setPageMode}/>

      {pageMode == 'SignIn' 
      ? <SignedInView />
      : <SignedUpView setPageMode={setPageMode}/>}

    </View>
  )
};