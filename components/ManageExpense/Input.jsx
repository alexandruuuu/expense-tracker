import {StyleSheet, Text, TextInput, View} from "react-native";
import {globalStyles} from "../../constants/styles";

export default function Input({invalid, label, style, textInputConfig}) {
  return <View style={[styles.inputContainer, style]}>
    <Text style={[styles.label, invalid && styles.errorLabel]}>{label}</Text>
    <TextInput {...textInputConfig}
               style={[styles.input, textInputConfig?.multiline && styles.inputMultiline, invalid && styles.invalidInput]}/>
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
  errorLabel: {
    color: globalStyles.colors.error500
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
  },
  invalidInput: {
    backgroundColor: globalStyles.colors.error50
  }
})