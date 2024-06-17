import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from "react-native";

import { colors } from "@/constants/theme";
import { FC } from "react";

export interface TextProps extends RNTextProps {
  type?: "default" | "title" | "semiBold" | "bold" | "subtitle" | "link" | "error" | "paperTitle";
}

const Text: FC<TextProps> = ({ style, type = "default", ...rest }) => (
  <RNText
    style={[
      { fontFamily: "Inter" },
      type === "default" ? styles.default : undefined,
      type === "title" ? styles.title : undefined,
      type === "semiBold" ? styles.semiBold : undefined,
      type === "bold" ? styles.bold : undefined,
      type === "subtitle" ? styles.subtitle : undefined,
      type === "link" ? styles.link : undefined,
      type === "error" ? styles.error : undefined,
      type === "paperTitle" ? styles.paperTitle : undefined,
      style,
    ]}
    {...rest}
  />
);

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
  paperTitle: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 24,
  },
});

export default Text;
