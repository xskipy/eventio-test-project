import LoginForm from "@/components/forms/LoginForm";
import Text from "@/components/Text";
import { View, Image } from "react-native";

const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 32,
          height: 32,
          marginTop: 56,
          marginBottom: 40,
        }}
        source={require("../assets/images/logo-dark.png")}
      />
      <Text type="title">Sign in to Eventio.</Text>
      <Text style={{ marginTop: 16 }} type="subtitle">
        Enter your details below..
      </Text>
      <LoginForm />
    </View>
  );
};

export default Login;
