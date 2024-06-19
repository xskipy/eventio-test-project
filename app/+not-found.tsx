import { router } from "expo-router";
import Error from "@/components/screens/Error";

const NotFoundScreen = () => {
  const navigateHome = () => {
    router.navigate("/");
  };

  return (
    <Error
      title="Screen not found"
      subtitle="This screen doesn't exist."
      onButtonPress={navigateHome}
      buttonTitle="Try again"
    />
  );
};

export default NotFoundScreen;
