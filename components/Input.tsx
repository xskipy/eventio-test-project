import Text from "@/components/Text";
import { breakpoints, colors } from "@/constants/theme";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextInputProps,
  KeyboardAvoidingView,
} from "react-native";
import EyeIcon from "@/assets/images/icons/eye.svg";
import ValidationType from "@/types/ValidationType";
import { Controller, useFormContext } from "react-hook-form";
import getErrorMessage from "@/utils/getErrorMessage";
import getInputRules from "@/utils/getInputRules";
import useKeyboardVisible from "@/hooks/useKeyboardVisible";
import IconButton from "@/components/IconButton";
interface InputProps extends Omit<TextInputProps, "value" | "secureTextEntry"> {
  initialValue?: string;
  type?: "text" | "password" | "number";
  name: string;
  validation?: ValidationType;
  required?: boolean;
}

/**
 * An Input component that allows user to input text / number / password
 * @requires FormProvider - Must be used withing Form context
 *
 */
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
  const { isKeyboardVisible } = useKeyboardVisible();

  const toggleSecureText = () => setSecureText(!secureText);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors[name]);
  const inputRules = getInputRules(validation, required);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={breakpoints.padding}
      enabled={isFocused && isKeyboardVisible}
      behavior="position"
      style={styles.container}
    >
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.focusedInput : undefined,
          errorMessage ? styles.errorInput : undefined,
        ]}
      >
        {type === "password" && (
          <IconButton
            onPress={toggleSecureText}
            style={styles.displayPasswordIcon}
            icon={<EyeIcon width={20} height={13} />}
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
              keyboardType={type === "number" ? "number-pad" : "default"}
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
    </KeyboardAvoidingView>
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
    backgroundColor: colors.white,
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
