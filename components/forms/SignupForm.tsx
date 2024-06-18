import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Text from "@/components/Text";
import { breakpoints } from "@/constants/theme";
import devLog from "@/utils/devLog";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

/**
 * SignupForm component
 * @todo Hookup to API
 * @todo Stylize View properly
 * @todo Move styles into StyleSheet
 * @todo Error handling
 *
 */
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
      <KeyboardAvoidingView style={styles.buttonContainer}>
        <Button style={styles.button} onPressOut={methods.handleSubmit(onSignup)} title="SIGN IN" />
        <Text style={styles.text} type="subtitle">
          Already have an account? <Link to="/login">Log in</Link>
        </Text>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: breakpoints.padding,
  },
  button: { paddingVertical: 18 },
  text: { marginTop: 16, textAlign: "center" },
});
