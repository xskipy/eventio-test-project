import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "@/components/Link";
import Text from "@/components/Text";
import { breakpoints } from "@/constants/theme";
import { View, Image, KeyboardAvoidingView } from "react-native";

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
      <Input placeholder="Email" />
      <Input placeholder="Password" type="password" />
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
          onPressOut={() => console.log("clicked")}
          title="SIGN IN"
        />
        <Text style={{ marginTop: 16, textAlign: "center" }} type="subtitle">
          Don't have an account? <Link to="signup">Sign up</Link>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
