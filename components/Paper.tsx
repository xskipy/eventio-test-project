import { breakpoints, colors } from "@/constants/theme";
import { FC } from "react";
import { Dimensions, StyleSheet, View, ViewProps } from "react-native";

const Paper: FC<ViewProps> = ({ children, style, ...rest }) => (
  <View style={[styles.container, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    // To correctly display shadows
    width: Dimensions.get("window").width - breakpoints.padding * 2 - 8,
    marginHorizontal: 4,

    // Shadows for android
    elevation: 2,

    padding: 20,
    backgroundColor: colors.background.secondary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: breakpoints.margin,
    borderRadius: 8,
  },
});

export default Paper;
