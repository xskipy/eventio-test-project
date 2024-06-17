import Text from "@/components/Text";
import { colors } from "@/constants/theme";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface PillProps {
  text: string;
  outline?: boolean;
}

const Pill: FC<PillProps> = ({ text, outline }) => (
  <View style={[styles.pill, outline ? styles.outline : undefined]}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default Pill;

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 48,
    backgroundColor: colors.status.disabled,
  },
  outline: {
    borderStyle: "solid",
    borderColor: colors.tertiary,
    borderWidth: 1,
  },
  text: {
    color: colors.secondary,
  },
});
