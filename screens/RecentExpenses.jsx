import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../context/ExpensesContext";
import {getDateMinusDays} from "../utils/utils";
import {fetchExpenses} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const {expenses, setExpenses} = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses().then((result) => {
      try {
        setExpenses(result);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    })
  }, [])

  function errorHandler() {
    setError('')

  }

  if (error && !isLoading) return <ErrorOverlay message={error} onConfirm={errorHandler}/>

  if (isLoading) return <LoadingOverlay/>

  return <ExpensesOutput expenses={expenses?.filter(e => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7)
    return (e.date >= date7DaysAgo) && (e.date <= today);
  })} expensePeriod="Last 7 Days"/>
}