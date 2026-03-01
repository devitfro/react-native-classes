import { View } from "react-native";
import { ButtonTypes, FirmButton } from "../../../features/ui/button/FirmButton";
import AuthStyle from "../css/AuthStyle";

export default function PageSwitchWidget({pageMode, setPageMode}: {pageMode:string, setPageMode:React.Dispatch<React.SetStateAction<string>>}) {
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