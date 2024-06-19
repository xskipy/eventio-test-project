import React, { useMemo } from "react";
import Text from "@/components/Text";
import {
  TouchableHighlight,
  StyleSheet,
  TouchableHighlightProps,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/constants/theme";

export type ButtonTypes = "primary" | "red" | "black" | "inactive" | "gray";

export interface ButtonProps extends TouchableHighlightProps {
  type?: ButtonTypes;
  title: string;
  loading?: boolean;
  size?: "s" | "l";
}

const Button: React.FC<ButtonProps> = ({
  type = "primary",
  title,
  style,
  size = "l",
  loading = false,
  ...rest
}) => {
  const btnStyle = useMemo(
    () => [
      styles.button,
      { backgroundColor: getButtonColor(type) },
      size === "s" ? styles.small : undefined,
      style,
    ],
    [style, type, size]
  );

  if (loading)
    return (
      <View style={btnStyle}>
        <ActivityIndicator color={colors.white} />
      </View>
    );

  return (
    <TouchableHighlight style={btnStyle} {...rest}>
      <Text style={[styles.text, { color: getTextColor(type) }]}>{title}</Text>
    </TouchableHighlight>
  );
};

const getButtonColor = (type: ButtonTypes) => {
  switch (type) {
    default:
      return colors.green;
    case "primary":
      return colors.green;
    case "red":
      return colors.error;
    case "black":
      return colors.black;
    case "inactive":
      return colors.white;
    case "gray":
      return colors.status.disabled;
  }
};

const getTextColor = (type: ButtonTypes) => {
  switch (type) {
    default:
      return colors.white;
    case "inactive":
      return colors.tertiary;
    case "gray":
      return colors.tertiary;
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 96,
  },
  text: {
    color: colors.white,
    fontWeight: 700,
  },
  small: {
    padding: 8,
  },
});

export default Button;
