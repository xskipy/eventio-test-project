import { hitSlop } from "@/constants/theme";
import React, { FC } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  icon: React.ReactElement;
  onPress?: () => void;
  style?: ViewStyle;
}

const IconButton: FC<IconButtonProps> = ({ icon, onPress, style }) => (
  <TouchableOpacity style={style} hitSlop={hitSlop} activeOpacity={0.5} onPressOut={onPress}>
    {icon}
  </TouchableOpacity>
);

export default IconButton;
