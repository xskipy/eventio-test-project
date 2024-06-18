import SignupForm from "@/components/forms/SignupForm";
import Text from "@/components/Text";
import { StyleSheet, Image, ScrollView } from "react-native";

const SignupScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
      <Image style={styles.logo} source={require("../assets/images/logo-dark.png")} />
      <Text type="title">Get started absolutely free..</Text>
      <Text style={styles.subtitle} type="subtitle">
        Enter your details below..
      </Text>
      <SignupForm />
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  logo: {
    width: 32,
    height: 32,
    marginTop: 56,
    marginBottom: 40,
  },
  subtitle: {
    marginTop: 16,
  },
});
