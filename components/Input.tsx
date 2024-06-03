import Text from "@/components/Text";
import { breakpoints, colors } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, TextInput, View, ViewStyle, TextInputProps } from "react-native";
import EyeIcon from "@/assets/images/icons/eye.svg";
import ValidationType from "@/types/ValidationType";
import { Controller, useFormContext } from "react-hook-form";
import getErrorMessage from "@/utils/getErrorMessage";
import getInputRules from "@/utils/getInputRules";
interface InputProps extends Omit<TextInputProps, "value" | "secureTextEntry"> {
  initialValue?: string;
  type?: "text" | "password";
  name: string;
  validation?: ValidationType;
  required?: boolean;
}

const Input = ({
  name,
  initialValue = "",
  required = false,
  type = "text",
  validation,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(type === "password");

  const toggleSecureText = () => setSecureText(!secureText);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors[name]);
  const inputRules = getInputRules(validation, required);

  // TODO: check if keyboard avoiding view would be a better choice
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.focusedInput : undefined,
          errorMessage ? styles.errorInput : undefined,
        ]}
      >
        {type === "password" && (
          // TODO: add highlight
          <EyeIcon
            onPress={toggleSecureText}
            style={styles.displayPasswordIcon}
            width={20}
            height={13}
          />
        )}
        <Controller
          control={control}
          name={name}
          rules={inputRules}
          defaultValue={initialValue}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              {...rest}
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureText}
            />
          )}
        />
      </View>
      {errorMessage && (
        <Text style={styles.error} type="error">
          {errorMessage}
        </Text>
      )}
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
  errorInput: {
    borderBottomColor: colors.error,
  },
  displayPasswordIcon: {
    position: "absolute",
    right: 0,
    bottom: 15, // half fontSize + half padding
  },
});
