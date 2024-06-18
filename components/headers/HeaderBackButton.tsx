import IconButton from "@/components/IconButton";
import BackIcon from "@/assets/images/icons/back.svg";
import { StyleSheet, View } from "react-native";
import { breakpoints } from "@/constants/theme";
import { router } from "expo-router";

const HeaderBackButton = () => {
  const navigateBack = () => router.back();

  return (
    <View style={styles.container}>
      <IconButton onPress={navigateBack} icon={<BackIcon height={14} width={18} />} />
    </View>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  container: {
    marginLeft: breakpoints.margin,
    paddingHorizontal: breakpoints.padding,
  },
});
