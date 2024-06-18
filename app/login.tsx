import LoginForm from "@/components/forms/LoginForm";
import Layout from "@/components/screens/Layout";
import Text from "@/components/Text";
import { StyleSheet, Image } from "react-native";

const LoginScreen = () => {
  return (
    <Layout type="alignedCenter">
      <Image style={styles.logo} source={require("../assets/images/logo-dark.png")} />
      <Text type="title">Sign in to Eventio.</Text>
      <Text style={styles.subtitle} type="subtitle">
        Enter your details below..
      </Text>
      <LoginForm />
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
