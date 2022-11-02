import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../context/ExpensesContext";
import {getDateMinusDays} from "../utils/utils";

export default function RecentExpenses() {
  const {expenses} = useContext(ExpensesContext);
  return <ExpensesOutput expenses={expenses.filter(e => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7)
    return (e.date >= date7DaysAgo) && (e.date <= today);
  })} expensePeriod="Last 7 Days"/>
}