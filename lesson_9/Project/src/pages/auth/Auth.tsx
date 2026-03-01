import { Alert, Button, Text, Touchable, TouchableOpacity, View } from "react-native";
import AuthStyle from "./css/AuthStyle";
import { TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { textColor } from "../../features/values/colors";
import AppContext from "../../features/context/AppContext";
import { ButtonTypes, FirmButton } from "../../features/ui/button/FirmButton";
import SignedUpView from "./ui/SignUpView";
import SignedInView from "./ui/SignInView";
import SignedView from "./ui/SignedView";
import PageSwitchWidget from "./ui/PageSwitchWidget";

export default function Auth() {
  const {user} = useContext(AppContext);
  const [pageMode, setPageMode] = useState('SignIn');

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