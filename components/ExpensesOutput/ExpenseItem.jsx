import {Pressable, StyleSheet, Text, View} from "react-native";
import {globalStyles} from "../../constants/styles";
import {useNavigation} from "@react-navigation/native";

export default function ExpenseItem({amount, date, description, id}) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("Manage Expense", {
      expenseId: id
    });
  }

  return (<Pressable onPress={pressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: globalStyles.colors.primary500,
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        justifyContent: "space-between",
        elevation: 3,
        shadowColor: globalStyles.colors.gray500,
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
      }}>
        <View style={{flexDirection: "column"}}>
          <Text style={{
            color: globalStyles.colors.primary50,
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 5
          }}>{description}</Text>
          <Text style={{
            color: globalStyles.colors.primary50,
            fontSize: 13,
            marginBottom: 5
          }}>{date.toLocaleDateString()}</Text>
        </View>
        <View style={{
          backgroundColor: "white",
          paddingVertical: 4,
          paddingHorizontal: 12,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          minWidth: 80
        }}>
          <Text style={{
            color: globalStyles.colors.primary500,
            fontWeight: "bold"
          }}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  }
})