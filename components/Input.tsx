import Text from "@/components/Text";
import { breakpoints, colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, TextInput, View, ViewStyle, TextInputProps } from "react-native";
import EyeIcon from "@/assets/images/icons/eye.svg";

interface InputProps extends Omit<TextInputProps, "value" | "secureTextEntry"> {
  initialValue?: string;
  type?: "text" | "password";
}

const Input = ({ initialValue, type = "text", ...rest }: InputProps) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(type === "password");

  const toggleSecureText = () => setSecureText(!secureText);

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused ? styles.focusedInput : undefined]}>
        {type === "password" && (
          // TODO: add highlight
          <EyeIcon
            onPress={toggleSecureText}
            style={styles.displayPasswordIcon}
            width={20}
            height={13}
          />
        )}
        <TextInput
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...rest}
          style={styles.input}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureText}
        />
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
    width: "90%",
    paddingVertical: 14,
    fontFamily: "Inter",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    borderBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.tertiary,
    position: "relative",
  } as ViewStyle,
  container: {
    width: "100%",
    marginTop: breakpoints.margin,
  },
  error: {
    marginTop: 8,
  },
  focusedInput: {
    borderBottomColor: colors.primary,
  },
  displayPasswordIcon: {
    position: "absolute",
    right: 0,
    bottom: 15, // half fontSize + half padding
  },
});
