import {StyleSheet, Text, View} from "react-native";
import {globalStyles} from "../../constants/styles";

export default function ExpensesSummary({expenseTotal, periodName}) {
  return <View style={styles.container}>
    <Text style={styles.period}>{periodName}</Text>
    <Text style={styles.sum}>${expenseTotal.toFixed(2)}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.primary50,
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 15,
    color: globalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalStyles.colors.primary500,
  }
})