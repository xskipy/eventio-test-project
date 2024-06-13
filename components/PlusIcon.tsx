import { View, StyleSheet } from "react-native";
import Text from "@/components/Text";
import { colors } from "@/constants/theme";

const PlusIcon = () => (
  <View style={styles.oval}>
    <Text style={styles.plus}>+</Text>
  </View>
);

export default PlusIcon;

const styles = StyleSheet.create({
  oval: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 28,
  },
});
