import Text from "@/components/Text";
import { breakpoints, colors } from "@/constants/theme";
import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

const Paper: FC<ViewProps> = ({ children, style, ...rest }) => (
  <View style={[styles.container, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: colors.background.secondary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    marginTop: breakpoints.margin,
    borderRadius: 8,
  },
});

export default Paper;
