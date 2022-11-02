import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../context/ExpensesContext";

export default function AllExpenses() {
  const {expenses} = useContext(ExpensesContext);
  return <ExpensesOutput expenses={expenses} expensePeriod='Total expenses'/>
}