import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Text from "@/components/Text";
import { breakpoints } from "@/constants/theme";
import useMutation from "@/hooks/useMutation";
import AuthResponse from "@/types/api/AuthResponse";
import LoginFormValues from "@/types/forms/LoginFormValues";
import setFormError from "@/utils/setFormError";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { router } from "expo-router";
import devLog from "@/utils/devLog";
import { useAuth } from "@/contexts/AuthContext";
import ErrorResponse from "@/types/api/ErrorResponse";

const LoginForm = () => {
  const methods = useForm<LoginFormValues>();
  const { setUserData } = useAuth();

  const { mutate, status } = useMutation<AuthResponse, ErrorResponse, LoginFormValues>(
    ["auth/native"],
    "POST",
    {
      onSuccess: (data) => {
        devLog("info", `Succesfully logged in ${data.firstName} ${data.lastName}`);
        setUserData(data);

        devLog("info", `Navigating home`);
        router.replace("/(main)");
      },
      onError: (err) => {
        devLog("debug", "Error logging in", { err });

        setFormError(methods, "email", " ");
        setFormError(
          methods,
          "password",
          "Oops! That email and password combination is not valid."
        );
      },
      retry: false,
    }
  );

  const onLogin = (values: LoginFormValues) => {
    mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <Input name="email" required validation="email" placeholder="Email" autoCapitalize="none" />
      <Input
        name="password"
        required
        placeholder="Password"
        type="password"
        autoCapitalize="none"
      />
      <KeyboardAvoidingView behavior="position" style={styles.buttonContainer}>
        <Button
          loading={status === "pending"}
          style={styles.button}
          onPressOut={methods.handleSubmit(onLogin)}
          title="SIGN IN"
        />
        <Text style={styles.text} type="subtitle">
          Don't have an account? <Link to="signup">Sign up</Link>
        </Text>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: breakpoints.padding,
  },
  button: { paddingVertical: 18 },
  text: { marginTop: 16, textAlign: "center" },
});
