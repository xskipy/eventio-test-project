import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Text from "@/components/Text";
import { breakpoints } from "@/constants/theme";
import devLog from "@/utils/devLog";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";

const SignupForm = () => {
  const methods = useForm();

  // TODO: fix types
  const onSignup = (values: any) => {
    devLog("debug", "values", { values });
  };

  // TODO: fix keyboard view overlaying form
  // remove justify-bottom? add margin top
  // add scroll view
  return (
    <FormProvider {...methods}>
      <Input required name="firstname" placeholder="First name" />
      <Input required name="lastname" placeholder="Last name" />
      <Input required validation={"email"} name="email" placeholder="Email" />
      <Input required name="password" placeholder="Password" type="password" />
      <Input required name="repeatpassword" placeholder="Repeat password" type="password" />
      <KeyboardAvoidingView
        style={{
          marginTop: 40,
          // flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          paddingBottom: breakpoints.padding,
        }}
      >
        <Button
          style={{ paddingVertical: 18 }}
          onPressOut={methods.handleSubmit(onSignup)}
          title="SIGN IN"
        />
        <Text style={{ marginTop: 16, textAlign: "center" }} type="subtitle">
          Already have an account? <Link to="/login">Log in</Link>
        </Text>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default SignupForm;
