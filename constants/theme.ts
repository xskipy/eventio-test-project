import { TextStyle } from "react-native";

export const colors = {
  primary: "#000000",
  secondary: "#72727B",
  tertiary: "#A7A7B9",
  error: "#F40000",
  green: "#22D486",
  black: "#323C46",
  white: "#FFF",
  background: {
    primary: "#F9F9FB",
    secondary: "#FFFFFF",
  },
  tabs: {
    active: "#000000",
    inactive: "#72727B",
  },
  status: {
    disabled: "#E4E4EA",
  },
};

export const breakpoints = {
  padding: 24,
  margin: 16,
};

export const hitSlop = 10;

// Pick needs to be used because of specific type of StackScreen.options.headerTitleStyle
export const headerTitleStyle: Pick<TextStyle, "fontFamily" | "fontWeight" | "fontSize"> = {
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: 18,
};
