import {StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {globalStyles} from "../../constants/styles";

export default function ExpenseForm({id, onCancel, expense, onSubmit}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: expense?.amount.toString() || '',
      isValid: true
    },
    date: {
      value: expense?.date.toISOString().slice(0, 10) || '',
      isValid: true
    },
    description: {
      value: expense?.description || '',
      isValid: true
    }
  });

  function inputChangedHandler(inputIdentifier, entered) {
    setInputValues((prev) => ({...prev, [inputIdentifier]: {value: entered, isValid: true}}));
  }

  function validateFields() {
    const descriptionCondition = inputValues?.description.value.trim().length > 0;
    const amountCondition = !isNaN(+inputValues?.amount.value) && +inputValues?.amount.value > 0;
    const dateCondition = new Date(inputValues?.date.value).toString() !== 'Invalid Date';
    if (!amountCondition || !dateCondition || !descriptionCondition) {
      setInputValues((prev) => ({
        amount: {value: prev.amount.value, isValid: amountCondition},
        description: {value: prev.description.value, isValid: descriptionCondition},
        date: {value: prev.date.value, isValid: dateCondition},
      }))
      return;
    }
    onSubmit({
      description: inputValues?.description.value,
      amount: +inputValues?.amount.value,
      date: new Date(inputValues?.date.value)
    });
  }


  return <View style={styles.form}>
    <Text style={styles.titleStyle}>Your Expense</Text>
    <View style={styles.inputsRow}>
      <Input label='amount' style={{flex: 1}} invalid={!inputValues.amount.isValid} textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: inputChangedHandler.bind(this, 'amount'),
        value: inputValues?.amount.value
      }}/>
      <Input label='date' style={{flex: 1}} invalid={!inputValues.date.isValid} textInputConfig={{
        placeholder: "YYYY-MM-DD",
        maxLength: 10,
        onChangeText: inputChangedHandler.bind(this, 'date'),
        value: inputValues?.date.value
      }}/>
    </View>
    <Input label='description' invalid={!inputValues.description.isValid} textInputConfig={{
      multiline: true, onChangeText: inputChangedHandler.bind(this, 'description'), value: inputValues.description.value
    }}/>
    {(!inputValues.amount.isValid || !inputValues.description.isValid || !inputValues.date.isValid) &&
      <Text style={styles.errorText}>form invalid</Text>}
    <View style={styles.buttonsContainer}>
      <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
      <Button style={styles.button} onPress={validateFields}>{id ? "Update" : "Add"}</Button>
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
  }, errorText: {
    textAlign: "center",
    color: globalStyles.colors.error500,
    margin: 7
  }
})