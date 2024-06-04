import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Text from "@/components/Text";
import { breakpoints } from "@/constants/theme";
import useMutation from "@/hooks/useMutation";
import AuthResponse from "@/types/api/AuthResponse";
import LoginFormValues from "@/types/forms/LoginFormValues";
import setFormError from "@/utils/setFormError";
import { saveToStorage } from "@/utils/storage";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";

const LoginForm = () => {
  const methods = useForm<LoginFormValues>();
  const { mutate, status } = useMutation<AuthResponse, unknown, LoginFormValues>(
    ["auth/native"],
    "POST",
    {
      onSuccess: (data) => {
        console.log(`-----Succesfully logged in ${data.firstName} ${data.lastName}`);

        saveToStorage("userData", JSON.stringify(data));
        router.replace("/(main)");
      },
      onError: (err) => {
        console.log("-----Error logging in", { err });

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
    console.log("values", { ...values });
    mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <Input name="email" required validation="email" placeholder="Email" />
      <Input name="password" required placeholder="Password" type="password" />
      <KeyboardAvoidingView
        behavior="position"
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          paddingBottom: breakpoints.padding,
        }}
      >
        <Button
          loading={status === "pending"}
          style={{ paddingVertical: 18 }}
          onPressOut={methods.handleSubmit(onLogin)}
          title="SIGN IN"
        />
        <Text style={{ marginTop: 16, textAlign: "center" }} type="subtitle">
          Don't have an account? <Link to="signup">Sign up</Link>
        </Text>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default LoginForm;
