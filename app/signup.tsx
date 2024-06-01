import SignupForm from "@/components/forms/SignupForm";
import Text from "@/components/Text";
import { View, Image } from "react-native";

const Signup = () => {
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
      <Text type="title">Get started absolutely free..</Text>
      <Text style={{ marginTop: 16 }} type="subtitle">
        Enter your details below..
      </Text>
      <SignupForm />
    </View>
  );
};

export default Signup;
