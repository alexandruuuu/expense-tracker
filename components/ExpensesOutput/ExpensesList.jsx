import {FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({expenses}) {
  return <FlatList data={expenses} renderItem={({item}) => <ExpenseItem {...item}/>}
                   keyExtractor={(item) => item?.id}/>
}