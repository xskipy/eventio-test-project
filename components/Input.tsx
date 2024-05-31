import Text from "@/components/Text";
import { breakpoints, colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, TextInput, View, ViewStyle, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  initialValue?: string;
}

const Input = ({ initialValue, ...rest }: InputProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput {...rest} style={styles.input} value={value} onChangeText={setValue} />
      </View>
      <Text style={styles.error} type="error">
        test error
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingVertical: 14,
    fontFamily: "Inter",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    borderBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.tertiary,
  } as ViewStyle,
  container: {
    width: "100%",
    marginTop: breakpoints.margin,
  },
  error: {
    marginTop: 8,
  },
});
