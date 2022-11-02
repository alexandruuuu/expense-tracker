import {StyleSheet, Text, View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {globalStyles} from "../../constants/styles";

export default function ExpensesOutput({expenses, expensePeriod}) {
  return <View style={styles.container}>
    <ExpensesSummary expenseTotal={expenses.reduce((arr, cur) => arr + cur?.amount, 0)}
                     periodName={expensePeriod}/>
    {expenses.length ? <ExpensesList expenses={expenses}/> : <Text style={styles.infoText}>NO EXPENSES</Text>}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: globalStyles.colors.primary700
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15
  }
})