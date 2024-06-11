import Button from "@/components/Button";
import SignupForm from "@/components/forms/SignupForm";
import Text from "@/components/Text";
import { View } from "react-native";
import ErrorIcon from "@/assets/images/icons/error.svg";
import { breakpoints } from "@/constants/theme";
import { router } from "expo-router";

// TODO: Properly style NotFoundScreen
const NotFoundScreen = () => {
  const navigateHome = () => {
    // TODO: Navigate to events or Login
    router.navigate("/");
  };

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
        <Text type="title">Screen not found</Text>
        <Text type="subtitle">This screen doesn't exist.</Text>
      </View>
      <View
        style={{
          // flex: 1,
          justifyContent: "flex-end",
          paddingBottom: breakpoints.padding,
        }}
      >
        <Button type="black" onPressOut={navigateHome} title="Home" />
      </View>
    </View>
  );
};

export default NotFoundScreen;
