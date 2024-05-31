import { styles } from "@/components/Text";
import { Link as ExpoLink } from "expo-router";
import { PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
  to: string;
}

const Link = ({ children, to }: LinkProps) => (
  <ExpoLink style={styles.link} href={to}>
    {children}
  </ExpoLink>
);

export default Link;
