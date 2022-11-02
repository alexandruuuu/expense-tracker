import {useContext, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {globalStyles} from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import {ExpensesContext} from "../context/ExpensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpenses({navigation, route}) {
  const {expenses, deleteExpense} = useContext(ExpensesContext)

  const selectedExpense = expenses.find((e) => e.id === route.params?.expenseId);

  useEffect(() => {
    navigation.setOptions({
      title: !!route.params?.expenseId ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, route.params?.expenseId])

  function deleteExpenseHandler() {
    deleteExpense(route.params?.expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return <View style={styles.container}>
    <ExpenseForm id={route.params?.expenseId} onCancel={cancelHandler} expense={selectedExpense}/>
    <View style={styles.deleteContainer}>
      {!!route.params?.expenseId ?
        <IconButton icon='trash' size={32} color={globalStyles.colors.error500} onPress={deleteExpenseHandler}/> : null}
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: globalStyles.colors.primary700
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: globalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center"
  },
})