import Button from "@/components/Button";
import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import ErrorIcon from "@/assets/images/icons/error.svg";
import { breakpoints } from "@/constants/theme";
import Layout from "@/components/screens/Layout";
import { FC } from "react";

interface ErrorProps {
  title: string;
  subtitle: string;
  buttonTitle: string;
  onButtonPress: () => void;
}

const Error: FC<ErrorProps> = ({ title, subtitle, buttonTitle, onButtonPress }) => (
  <Layout>
    <Layout type="centered">
      <ErrorIcon width={80} height={80} />
      <Text style={styles.title} type="title">
        {title}
      </Text>
      <Text type="subtitle">{subtitle}</Text>
    </Layout>
    <View style={styles.buttonContainer}>
      <Button type="black" onPressOut={onButtonPress} title={buttonTitle} />
    </View>
  </Layout>
);

export default Error;

const styles = StyleSheet.create({
  title: { marginTop: 30 },
  buttonContainer: {
    justifyContent: "flex-end",
    paddingBottom: breakpoints.padding,
  },
});
