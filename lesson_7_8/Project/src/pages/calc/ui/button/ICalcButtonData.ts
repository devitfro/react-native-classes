import CalcButtonType from "./CalcButtonType";

export default interface ICalcButtonData {
  text: string,
  buttonType: CalcButtonType,
  isActive?: boolean,
  action?: (data:ICalcButtonData) => void, // TODO: remove "?" for production
};