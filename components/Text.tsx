import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { colors } from "@/constants/theme";

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "semiBold" | "bold" | "subtitle" | "link" | "error";
};

const Text = ({ style, lightColor, darkColor, type = "default", ...rest }: TextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <RNText
      style={[
        { color, fontFamily: "Inter" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "semiBold" ? styles.semiBold : undefined,
        type === "bold" ? styles.bold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "error" ? styles.error : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

export const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.primary,
  },
  semiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 28,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    color: colors.secondary,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: colors.green,
  },
  error: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    color: colors.error,
  },
});

export default Text;
