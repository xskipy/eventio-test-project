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

type ButtonTypes = "primary" | "red" | "black";

interface ButtonProps extends TouchableHighlightProps {
  type?: ButtonTypes;
  title: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "primary",
  title,
  style,
  loading = false,
  ...rest
}) => {
  const btnStyle = useMemo(
    () => [styles.button, { backgroundColor: getButtonColor(type) }, style],
    [style, type]
  );

  if (loading)
    return (
      <View style={btnStyle}>
        <ActivityIndicator color={colors.white} />
      </View>
    );

  return (
    <TouchableHighlight style={btnStyle} {...rest}>
      <Text style={styles.text}>{title}</Text>
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
