import { FC, PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

interface LayoutProps extends PropsWithChildren {
  type?: "default" | "centered" | "alignedCenter";
  style?: ViewStyle;
}

const Layout: FC<LayoutProps> = ({ type = "default", style, children }) => (
  <View
    style={[
      type === "default" ? styles.default : undefined,
      type === "centered" ? styles.centered : undefined,
      type === "alignedCenter" ? styles.alignedCenter : undefined,
      style,
    ]}
  >
    {children}
  </View>
);

export default Layout;

const styles = {
  default: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alignedCenter: {
    flex: 1,
    alignItems: "center",
  },
};
