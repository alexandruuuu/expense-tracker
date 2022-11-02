import {StyleSheet, Text, TextInput, View} from "react-native";
import {globalStyles} from "../../constants/styles";

export default function Input({label, style, textInputConfig}) {
  return <View style={[styles.inputContainer, style]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput {...textInputConfig} style={[styles.input, textInputConfig?.multiline && styles.inputMultiline]}/>
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: globalStyles.colors.primary100,
    marginBottom: 5
  },
  input: {
    backgroundColor: globalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: globalStyles.colors.primary700
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top"
  }
})