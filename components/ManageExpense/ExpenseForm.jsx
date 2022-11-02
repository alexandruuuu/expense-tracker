import {StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useContext, useState} from "react";
import Button from "../UI/Button";
import {ExpensesContext} from "../../context/ExpensesContext";
import {useNavigation} from "@react-navigation/native";

export default function ExpenseForm({id, onCancel, expense}) {
  const {addExpense, updateExpense} = useContext(ExpensesContext)
  const [inputValues, setInputValues] = useState({
    amount: expense?.amount.toString() || '',
    date: expense?.date.toISOString().slice(0, 10) || '',
    description: expense?.description || '',
  });
  
  const navigation = useNavigation();

  function inputChangedHandler(inputIdentifier, entered) {
    setInputValues((prev) => ({...prev, [inputIdentifier]: entered}));
  }

  function confirmHandler() {
    if (id) {
      updateExpense(id, {
        description: inputValues?.description,
        amount: +inputValues?.amount,
        date: new Date(inputValues?.date)
      })
    } else addExpense({
      description: inputValues?.description,
      amount: +inputValues?.amount,
      date: new Date(inputValues?.date)
    })
    navigation.goBack();
  }

  return <View style={styles.form}>
    <Text style={styles.titleStyle}>Your Expense</Text>
    <View style={styles.inputsRow}>
      <Input label='amount' style={{flex: 1}} textInputConfig={{
        keyboardType: 'decimal-pad', onChangeText: inputChangedHandler.bind(this, 'amount'), value: inputValues?.amount
      }}/>
      <Input label='date' style={{flex: 1}} textInputConfig={{
        placeholder: "YYYY-MM-DD",
        maxLength: 10,
        onChangeText: inputChangedHandler.bind(this, 'date'),
        value: inputValues?.date
      }}/>
    </View>
    <Input label='description' textInputConfig={{
      multiline: true, onChangeText: inputChangedHandler.bind(this, 'description'), value: inputValues.description
    }}/>
    <View style={styles.buttonsContainer}>
      <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
      <Button style={styles.button} onPress={confirmHandler}>{id ? "Update" : "Add"}</Button>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, form: {
    paddingTop: 40
  }, titleStyle: {
    fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center", paddingVertical: 24
  }, inputsRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  }, buttonsContainer: {
    flexDirection: "row", justifyContent: "center", alignItems: "center"
  }, button: {
    minWidth: 120, marginHorizontal: 8
  }
})