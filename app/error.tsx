import Button from "@/components/Button";
import SignupForm from "@/components/forms/SignupForm";
import Text from "@/components/Text";
import { View } from "react-native";
import ErrorIcon from "@/assets/images/icons/error.svg";
import { breakpoints } from "@/constants/theme";

// TODO: Properly style ErrorPage
const ErrorScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ErrorIcon />
        <Text type="title">Something went wrong</Text>
        <Text type="subtitle">Something went wrong, please try it again.</Text>
      </View>
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
    </View>
  );
};

export default ErrorScreen;
