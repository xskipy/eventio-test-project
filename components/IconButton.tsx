import { hitSlop } from "@/constants/theme";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";

interface IconButtonProps {
  icon: React.ReactElement;
  onPress?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ icon, onPress }) => (
  <TouchableOpacity hitSlop={hitSlop} activeOpacity={0.5} onPressOut={onPress}>
    {icon}
  </TouchableOpacity>
);

export default IconButton;
