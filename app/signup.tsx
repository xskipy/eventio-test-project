import SignupForm from "@/components/forms/SignupForm";
import Text from "@/components/Text";
import { View, Image, ScrollView } from "react-native";

const Signup = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
      style={{
        flex: 1,
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
    </ScrollView>
  );
};

export default Signup;
