import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./css/CalcStyle";
import CalcButton from "./ui/button/CalcButton";
import CalcButtonType from "../calc/ui/button/CalcButtonType";
import ICalcButtonData from "./ui/button/ICalcButtonData";
import { useState } from "react";

export default function Calc() {
  const { width, height } = useWindowDimensions();
  const [result, setResult] = useState<string>('');
  const [expression, setExpression] = useState<string>('0');

  const dotSymbol = ',';
  const shortSpace = '\u2009';

  const digitClick = (btn: ICalcButtonData) => {
    var exp = expression.replace(/\s/g, '').replace('-', '');

    if (exp.replace(dotSymbol, '').length >= 16) return;
  
    if (exp === '0') {
      exp = '';
    }

    exp += btn.text;

    const [integerPart, decimalPart] = exp.split(dotSymbol);

    // додаємо пробіли
    const groups: string[] = [];
    var l = integerPart.length;

    while(l > 0) {
      groups.unshift(integerPart.slice(Math.max(0, l - 3), l));
      l -= 3;
    }
    const formattedInteger = groups.join(shortSpace);
    const finalResult = decimalPart ? `${formattedInteger}${dotSymbol}${decimalPart}` : formattedInteger;

    setExpression(finalResult);
  };

  const clearResult = (btn: ICalcButtonData) => {
    setResult('');
    setExpression('0');
  }

  const backspaceClick = (_: ICalcButtonData) => {
    let exp = expression.replace(/\s/g, '');

    exp = exp.slice(0, -1);

    if (exp.length === 0) exp = '0';

    const [integerPart, decimalPart] = exp.split(dotSymbol);

    const groups: string[] = [];
    let l = integerPart.length;
    while (l > 0) {
      groups.unshift(integerPart.slice(Math.max(0, l - 3), l));
      l -= 3;
    }
    const formattedInteger = groups.join(shortSpace);
    const finalResult = decimalPart ? `${formattedInteger}${dotSymbol}${decimalPart}` : formattedInteger;

    setExpression(finalResult);
}

  const dotClick = (btn: ICalcButtonData) => {
    // десятична кома (точка)
    // якщо на рез. '0', то буде '0,'
    // якщо кома є, то ігнор
    if (!expression.includes(btn.text)) {
      setExpression(expression + btn.text);
    }
  };

  const portraitView = () => (
    <View style={CalcStyle.calcContainer}>
      <Text style={CalcStyle.expression}>{expression}</Text>
      <Text style={[CalcStyle.result, {fontSize: (result.length <= 12 ? 50 : 50 - (result.length - 12) ** (0.75) * 4.5 )}]}>{result}</Text>

      <View style={CalcStyle.memoryRow}>
        <CalcButton data={{ text: 'MC', buttonType: CalcButtonType.memory, isActive: false }} />
        <CalcButton data={{ text: 'MR', buttonType: CalcButtonType.memory, isActive: false }} />
        <CalcButton data={{ text: 'M+', buttonType: CalcButtonType.memory, isActive: true }} />
        <CalcButton data={{ text: 'M-', buttonType: CalcButtonType.memory, isActive: true }} />
        <CalcButton data={{ text: 'MS', buttonType: CalcButtonType.memory, isActive: true }} />
        <CalcButton data={{ text: 'M˅', buttonType: CalcButtonType.memory, isActive: false }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '%', buttonType: CalcButtonType.operation, action: (btn: ICalcButtonData) => console.log(btn.text) }} />
        <CalcButton data={{ text: 'CE', buttonType: CalcButtonType.operation }} />
        <CalcButton data={{ text: 'C', buttonType: CalcButtonType.operation, action: clearResult }} />
        <CalcButton data={{ text: '⌫', buttonType: CalcButtonType.operation, action: backspaceClick }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '¹⁄ₓ', buttonType: CalcButtonType.digit }} />
        <CalcButton data={{ text: 'x²', buttonType: CalcButtonType.digit }} />
        <CalcButton data={{ text: '²√x', buttonType: CalcButtonType.digit }} />
        <CalcButton data={{ text: '÷', buttonType: CalcButtonType.operation }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '7', buttonType: CalcButtonType.digit, action: digitClick }} />
        <CalcButton data={{ text: '8', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '9', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: 'x', buttonType: CalcButtonType.operation }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '4', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '5', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '6', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '-', buttonType: CalcButtonType.operation }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '1', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '2', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '3', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '+', buttonType: CalcButtonType.operation }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '+/-', buttonType: CalcButtonType.digit }} />
        <CalcButton data={{ text: '0', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: dotSymbol, buttonType: CalcButtonType.digit, action: dotClick }} />
        <CalcButton data={{ text: '=', buttonType: CalcButtonType.equal }} />
      </View>
    </View>
  );

  const landscapeView = () => (
    <View style={CalcStyle.calcContainer}>
      <View style={CalcStyle.containerResExpMem}>
        <View style={CalcStyle.containerExpMem}>
          <Text style={CalcStyle.expression}>3 - 9 =</Text>
          <View style={CalcStyle.memoryRow}>
            <CalcButton data={{ text: 'MC', buttonType: CalcButtonType.memory, isActive: false }} />
            <CalcButton data={{ text: 'MR', buttonType: CalcButtonType.memory, isActive: false }} />
            <CalcButton data={{ text: 'M+', buttonType: CalcButtonType.memory, isActive: true }} />
            <CalcButton data={{ text: 'M-', buttonType: CalcButtonType.memory, isActive: true }} />
            <CalcButton data={{ text: 'MS', buttonType: CalcButtonType.memory, isActive: true }} />
            <CalcButton data={{ text: 'M˅', buttonType: CalcButtonType.memory, isActive: false }} />
          </View>
        </View>

        <Text style={CalcStyle.result}>-6</Text>
      </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: '%', buttonType: CalcButtonType.operation, action: (btn: ICalcButtonData) => console.log(btn.text) }} />
          <CalcButton data={{ text: '÷', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: '7', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '8', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '9', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: 'C', buttonType: CalcButtonType.operation }} />
        </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: '¹⁄ₓ', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: 'x', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: '4', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '5', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '6', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: 'CE', buttonType: CalcButtonType.operation }} />
        </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: 'x²', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: '-', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: '1', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '2', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '3', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '⌫', buttonType: CalcButtonType.operation }} />
        </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: '²√x', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: '+', buttonType: CalcButtonType.operation }} />
          <CalcButton data={{ text: '+/-', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '0', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: ',', buttonType: CalcButtonType.digit }} />
          <CalcButton data={{ text: '=', buttonType: CalcButtonType.equal }} />
        </View>

    </View>

    
      

      
  );

  return width < height ? portraitView() : landscapeView();
}
