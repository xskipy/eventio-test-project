import { router } from "expo-router";
import Error from "@/components/screens/Error";

const ErrorScreen = () => {
  // TODO: Implement correct "TryAgain" functionality
  const onTryAgain = () => {
    router.replace("/");
  };

  return (
    <Error
      title="Something went wrong"
      subtitle="Something went wrong, please try it again.."
      onButtonPress={onTryAgain}
      buttonTitle="Try again"
    />
  );
};

export default ErrorScreen;
