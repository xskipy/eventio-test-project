import IconButton from "@/components/IconButton";
import CloseIcon from "@/assets/images/icons/close.svg";
import { StyleSheet, View } from "react-native";
import { breakpoints } from "@/constants/theme";
import { router } from "expo-router";

const HeaderCloseButton = () => {
  const closeScreen = () => router.dismiss();

  return (
    <View style={styles.container}>
      <IconButton onPress={closeScreen} icon={<CloseIcon height={14} width={14} />} />
    </View>
  );
};

export default HeaderCloseButton;

const styles = StyleSheet.create({
  container: {
    marginRight: breakpoints.margin,
  },
});
