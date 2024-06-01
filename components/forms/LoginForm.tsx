import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Text from "@/components/Text";
import { breakpoints } from "@/constants/theme";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";

const LoginForm = () => {
  const methods = useForm();

  // todo: fix types
  const onLogin = (values: any) => {
    console.log("values", { values });
  };

  return (
    <FormProvider {...methods}>
      <Input required validation={"email"} name="email" placeholder="Email" />
      <Input required name="password" placeholder="Password" type="password" />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          paddingBottom: breakpoints.padding,
        }}
      >
        <Button
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
