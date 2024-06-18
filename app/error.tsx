import Button from "@/components/Button";
import SignupForm from "@/components/forms/SignupForm";
import Text from "@/components/Text";
import { View } from "react-native";
import ErrorIcon from "@/assets/images/icons/error.svg";
import { breakpoints } from "@/constants/theme";
import Layout from "@/components/screens/Layout";

// TODO: Properly style ErrorPage
const ErrorScreen = () => {
  return (
    <Layout>
      <Layout type="centered">
        <ErrorIcon />
        <Text type="title">Something went wrong</Text>
        <Text type="subtitle">Something went wrong, please try it again.</Text>
      </Layout>
      <View
        style={{
          // flex: 1,
          justifyContent: "flex-end",
          paddingBottom: breakpoints.padding,
        }}
      >
        <Button
          type="black"
          // onPressOut={}
          title="Try again"
        />
      </View>
    </Layout>
  );
};

export default ErrorScreen;
