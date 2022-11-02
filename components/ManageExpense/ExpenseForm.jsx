import {View} from "react-native";
import Input from "./Input";

export default function ExpenseForm() {
  return <View>
    <Input label='amount'/>
    <Input label='date'/>
    <Input label='expense'/>
  </View>
}