import {useContext, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {globalStyles} from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import {ExpensesContext} from "../context/ExpensesContext";

export default function ManageExpenses({navigation, route}) {
  const {addExpense, updateExpense, deleteExpense} = useContext(ExpensesContext)

  useEffect(() => {
    navigation.setOptions({
      title: !!route.params?.expenseId ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, route.params?.expenseId])

  function deleteExpenseHandler() {
    deleteExpense(route.params?.expenseId);
    navigation.goBack();
  }

  function confirmHandler() {
    if (!!route.params?.expenseId) {
      updateExpense(route.params?.expenseId, {description: 'crocs', amount: 20, date: new Date()})
    } else addExpense({description: 'crocs', amount: 20, date: new Date()})
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return <View style={styles.container}>
    <View style={styles.buttonsContainer}>
      <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
      <Button style={styles.button} onPress={confirmHandler}>{!!route.params?.expenseId ? "Update" : "Add"}</Button>
    </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})