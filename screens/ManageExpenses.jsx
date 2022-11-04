import {useContext, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {globalStyles} from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import {ExpensesContext} from "../context/ExpensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpenseRequest, storeExpense, updateExpenseRequest} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageExpenses({navigation, route}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {expenses, addExpense, updateExpense, deleteExpense} = useContext(ExpensesContext);
  const [error, setError] = useState('');

  const selectedExpense = expenses.find((e) => e.id === route.params?.expenseId);

  useEffect(() => {
    navigation.setOptions({
      title: !!route.params?.expenseId ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, route.params?.expenseId])

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      deleteExpense(route.params?.expenseId);
      await deleteExpenseRequest(route.params?.expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense");
      setIsSubmitting(false);
    }
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    if (!!route.params?.expenseId) {
      try {
        updateExpense(route.params?.expenseId, expenseData);
        await updateExpenseRequest(route.params?.expenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError("Could not update expense");
        setIsSubmitting(false);
      }
    } else {
      try {
        let id = await storeExpense(expenseData).then((res) => {
          return res.data.name;
        })
        addExpense({
          id: id,
          ...expenseData
        })
        navigation.goBack();
      } catch (error) {
        setError("Could not add expense");
        setIsSubmitting(false);
      }
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function errorHandler() {
    setError("")
  }

  if (error && !isSubmitting) return <ErrorOverlay message={error} onConfirm={error}/>
    
  if (isSubmitting) return <LoadingOverlay/>

  return <View style={styles.container}>
    <ExpenseForm id={route.params?.expenseId} onCancel={cancelHandler} expense={selectedExpense}
                 onSubmit={confirmHandler}/>
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