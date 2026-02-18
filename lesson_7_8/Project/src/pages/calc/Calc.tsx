import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./css/CalcStyle";
import CalcButton from "./ui/button/CalcButton";
import CalcButtonType from "../calc/ui/button/CalcButtonType";
import ICalcButtonData from "./ui/button/ICalcButtonData";
import { useState } from "react";
import CalcOperations from "./model/CalcOperations";

const divZeroMessage = 'Cann\'t devide by zero!';
const dotSymbol = ',';
const addSymbol = '+';
const subSymbol = '-';
const mulSymbol = 'x';
const divSymbol = '÷';

const shortSpace = '\u2009';
const maxDigits = 16;

interface ICalcState {
  result: string,       
  expression: string,                      
  needClearResult: boolean,                      
  needClearExpression: boolean,                            
  isError: boolean,                          
  operation?: CalcOperations | undefined,  
  prevArgument?: number | undefined,        
};

const initialState:ICalcState = {
  result: "0",
  expression: "",
  needClearResult: false,        
  needClearExpression: false,
  isError: false,    
};

export default function Calc() {
  const { width, height } = useWindowDimensions();
  const [calcState, setCalcState] = useState<ICalcState>(initialState);

  const equalClick = (_:ICalcButtonData) => {
    if(calcState.operation) {
        setCalcState({...calcState,
          expression: calcState.expression + ' ' + calcState.result + ' =',
          needClearResult: true,
          needClearExpression: true,
          prevArgument: undefined,
          operation: undefined,
          result: numToResult( doOperationWithState() ),
        });
    }
  };

  const doOperationWithState = ():number => {
    const arg = resToNumber();
    return calcState.operation == CalcOperations.div ? calcState.prevArgument! / arg 
      :  calcState.operation == CalcOperations.mul ? calcState.prevArgument! * arg 
      :  calcState.operation == CalcOperations.add ? calcState.prevArgument! + arg 
      :  calcState.operation == CalcOperations.sub ? calcState.prevArgument! - arg 
      :  Number.NaN
  };

  const digitClick = (btn: ICalcButtonData) => {
      let res = calcState.needClearResult || calcState.result === "0" || calcState.isError
          ? ""
          : calcState.result.replace(/\s/g, '');

      if (calcState.needClearExpression) {
          calcState.needClearExpression = false;
      }

      if (res.replace(dotSymbol, '').length >= maxDigits) return;

      res += btn.text;

      const [integerPart, decimalPart] = res.split(dotSymbol);
      const groups: string[] = [];
      let l = integerPart.length;
      while (l > 0) {
          groups.unshift(integerPart.slice(Math.max(0, l - 3), l));
          l -= 3;
      }
      const formattedInteger = groups.join(shortSpace);
      const finalResult = decimalPart ? `${formattedInteger}${dotSymbol}${decimalPart}` : formattedInteger;

      setCalcState({
          ...calcState,
          result: finalResult,      // с пробелами для визуала
          needClearResult: false,
          isError: false
      });
  };

  const operationClick = (btn: ICalcButtonData) => {
      const op = btn.text == divSymbol ? CalcOperations.div
          : btn.text == mulSymbol ? CalcOperations.mul
          : btn.text == addSymbol ? CalcOperations.add
          : btn.text == subSymbol ? CalcOperations.sub
          : undefined;

      if (!op) return;

      let prevArg = calcState.prevArgument ?? resToNumber();
      let exp = calcState.expression;

      if (calcState.operation) {
          prevArg = doOperationWithState();
      }

      // В expression числа без пробелов, только пробел вокруг операции
      exp = `${prevArg}${btn.text}`;

      setCalcState({
          ...calcState,
          prevArgument: prevArg,
          operation: op,
          expression: exp, // чисто для вычислений
          needClearResult: true
      });
  };

  const backspaceClick = (_: ICalcButtonData) => {
      setCalcState(prevState => {
          let res = prevState.result.replace(/\s/g, '');
          let exp = prevState.expression.replace(/\s/g, '');

          // Если нужно очистить выражение — очищаем
          if (prevState.needClearExpression) {
              prevState.needClearExpression = false;
              prevState.expression = "";
              prevState.result = "0";
              return { ...prevState };
          }

          // Если нужно очистить результат — сбрасываем
          if (prevState.needClearResult) {
              prevState.needClearResult = false;
              prevState.result = "0";
              return { ...prevState };
          }

          // Удаляем последнюю цифру
          res = res.slice(0, -1);
          if (res.length === 0) res = "0";

          // Форматируем с пробелами для отображения
          const [integerPart, decimalPart] = res.split(dotSymbol);
          const groups: string[] = [];
          let l = integerPart.length;
          while (l > 0) {
              groups.unshift(integerPart.slice(Math.max(0, l - 3), l));
              l -= 3;
          }
          const formattedInteger = groups.join(shortSpace);
          const finalResult = decimalPart ? `${formattedInteger}${dotSymbol}${decimalPart}` : formattedInteger;

          prevState.result = finalResult;
          prevState.expression = finalResult;

          return { ...prevState };
      });
  };

  const dotClick = (btn:ICalcButtonData) => {
      // десятична кома (точка):
      // якщо на рез. "0", то він не стирається, буде "0,"
      // якщо у рез. вже є кома, то натиснення ігнорується
      // Символ коми відповідає тексту на кнопці
      const newState = {...calcState};

      if(calcState.needClearExpression) {
        newState.expression = "";
        newState.needClearExpression = false;
      }

      if(calcState.needClearResult) {
        newState.result = "0" + dotSymbol;
        newState.needClearResult = false;
      }
      else if(! calcState.result.includes(btn.text)) {
          newState.result = calcState.result + btn.text;
      }
      setCalcState(newState);
  };

  const inverseClick = (_:ICalcButtonData) => {
    var arg = resToNumber();
    setCalcState({...calcState, 
      expression: `1/(${calcState.result})`,
      needClearExpression: true,
      needClearResult: true,
      isError: arg == 0,
      result: arg == 0
        ? divZeroMessage
        : numToResult(1.0 / arg)
    });
  };

  const clearClick = (_:ICalcButtonData) => {
    setCalcState({...calcState, 
      expression: "",
      isError: false,
      result: "0",
      operation: undefined,
      prevArgument: undefined
    });
  }

  const resToNumber = (): number => {
    const res = calcState.result.replace(shortSpace, '').replace(dotSymbol, '.').replace(subSymbol, '-');
    return Number(res);
  };

  const numToResult = (num: number): string => {
    var res = num.toString();
    if(num >= 1e-6) {   // <= 9.9e-7 автоматично спрацьовує ехр-форма
      res = res.substring(0, maxDigits + 1);   // +1 - на символ коми
    }
    res = res.replace('.', dotSymbol);
    return res;
  };

  const percentClick = (_: ICalcButtonData) => {
    const arg = resToNumber();
    const result = arg / 100;
    setCalcState({
        ...calcState,
        result: numToResult(result),
        expression: `${calcState.result}%`,
        needClearResult: true,
        needClearExpression: true
    });
  };

  const squareClick = (_: ICalcButtonData) => {
    const arg = resToNumber();
    const result = arg ** 2;
    setCalcState({
        ...calcState,
        result: numToResult(result),
        expression: `sqr(${calcState.result})`,
        needClearResult: true,
        needClearExpression: true
    });
  };

  const sqrtClick = (_: ICalcButtonData) => {
    const arg = resToNumber();
    if (arg < 0) {
        setCalcState({
          ...calcState,
          result: "NaN",
          expression: `√(${calcState.result})`,
          isError: true,
          needClearResult: true,
          needClearExpression: true
        });
      return;
    }

    const result = Math.sqrt(arg);
      setCalcState({
          ...calcState,
          result: numToResult(result),
          expression: `√(${calcState.result})`,
          needClearResult: true,
          needClearExpression: true
    });
  };

  const portraitView = () => (
    <View style={CalcStyle.calcContainer}>
      <Text style={CalcStyle.expression}>{calcState.expression}</Text>
      <Text style={[CalcStyle.result, {fontSize: (calcState.result.length <= 12 ? 50 : 50 - (calcState.result.length - 12) ** (0.75) * 4.5 )}]}>{calcState.result}</Text>

      <View style={CalcStyle.memoryRow}>
        <CalcButton data={{ text: 'MC', buttonType: CalcButtonType.memory, isActive: false }} />
        <CalcButton data={{ text: 'MR', buttonType: CalcButtonType.memory, isActive: false }} />
        <CalcButton data={{ text: 'M+', buttonType: CalcButtonType.memory, isActive: true }} />
        <CalcButton data={{ text: 'M-', buttonType: CalcButtonType.memory, isActive: true }} />
        <CalcButton data={{ text: 'MS', buttonType: CalcButtonType.memory, isActive: true }} />
        <CalcButton data={{ text: 'M˅', buttonType: CalcButtonType.memory, isActive: false }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '%', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: percentClick }} />
        <CalcButton data={{ text: 'CE', buttonType: CalcButtonType.operation }} />
        <CalcButton data={{ text: 'C', buttonType: CalcButtonType.operation, action: clearClick }} />
        <CalcButton data={{ text: '⌫', buttonType: CalcButtonType.operation, action: backspaceClick }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '¹⁄ₓ', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: inverseClick }} />
        <CalcButton data={{ text: 'x²', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: squareClick }} />
        <CalcButton data={{ text: '²√x', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: sqrtClick }} />
        <CalcButton data={{ text: divSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '7', buttonType: CalcButtonType.digit, action: digitClick }} />
        <CalcButton data={{ text: '8', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '9', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: mulSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '4', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '5', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '6', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: divSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '1', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '2', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: '3', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: addSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
      </View>

      <View style={CalcStyle.buttonRow}>
        <CalcButton data={{ text: '+/-', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation }} />
        <CalcButton data={{ text: '0', buttonType: CalcButtonType.digit, action: digitClick  }} />
        <CalcButton data={{ text: dotSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: dotClick }} />
        <CalcButton data={{ text: '=', buttonType: CalcButtonType.equal, action: equalClick }} />
      </View>
    </View>
  );

  const landscapeView = () => (
    <View style={CalcStyle.calcContainer}>
      <View style={CalcStyle.containerResExpMem}>
        <View style={CalcStyle.containerExpMem}>
          <Text style={CalcStyle.expression}>{calcState.expression}</Text>
          <View style={CalcStyle.memoryRow}>
            <CalcButton data={{ text: 'MC', buttonType: CalcButtonType.memory, isActive: false }} />
            <CalcButton data={{ text: 'MR', buttonType: CalcButtonType.memory, isActive: false }} />
            <CalcButton data={{ text: 'M+', buttonType: CalcButtonType.memory, isActive: true }} />
            <CalcButton data={{ text: 'M-', buttonType: CalcButtonType.memory, isActive: true }} />
            <CalcButton data={{ text: 'MS', buttonType: CalcButtonType.memory, isActive: true }} />
            <CalcButton data={{ text: 'M˅', buttonType: CalcButtonType.memory, isActive: false }} />
          </View>
        </View>

        <Text style={[CalcStyle.result, {fontSize: (calcState.result.length <= 12 ? 50 : 50 - (calcState.result.length - 12) ** (0.75) * 4.5 )}]}>{calcState.result}</Text>
      </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: '%', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: percentClick }} />
          <CalcButton data={{ text: divSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
          <CalcButton data={{ text: '7', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '8', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '9', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: 'C', buttonType: CalcButtonType.operation, action: clearClick }} />
        </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: '¹⁄ₓ', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: inverseClick }} />
          <CalcButton data={{ text: mulSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
          <CalcButton data={{ text: '4', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '5', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '6', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: 'CE', buttonType: CalcButtonType.operation }} />
        </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: 'x²', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: squareClick }} />
          <CalcButton data={{ text: subSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
          <CalcButton data={{ text: '1', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '2', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '3', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: '⌫', buttonType: CalcButtonType.operation, action: backspaceClick }} />
        </View>

        <View style={CalcStyle.buttonRow}>
          <CalcButton data={{ text: '²√x', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: sqrtClick }} />
          <CalcButton data={{ text: addSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick }} />
          <CalcButton data={{ text: '+/-', buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation }} />
          <CalcButton data={{ text: '0', buttonType: CalcButtonType.digit, action: digitClick }} />
          <CalcButton data={{ text: dotSymbol, buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.digit, action: dotClick }} />
          <CalcButton data={{ text: '=', buttonType: CalcButtonType.equal, action: equalClick }} />
        </View>
    </View>
  );

  return width < height ? portraitView() : landscapeView();
}

