import React from "react";
import Text from "@/components/Text";
import { TouchableHighlight, StyleSheet, TouchableHighlightProps } from "react-native";
import { colors } from "@/constants/theme";

type ButtonTypes = "primary" | "red" | "black";

interface ButtonProps extends TouchableHighlightProps {
  type?: ButtonTypes;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ type = "primary", title, style, ...rest }) => (
  <TouchableHighlight
    style={[styles.button, { backgroundColor: getButtonColor(type) }, style]}
    {...rest}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableHighlight>
);

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
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontWeight: 700,
  },
});

export default Button;
