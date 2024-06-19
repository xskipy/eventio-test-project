import Layout from "@/components/screens/Layout";
import { colors } from "@/constants/theme";
import { ActivityIndicator } from "react-native";

const Spinner = () => (
  <Layout type="centered">
    <ActivityIndicator color={colors.black} size="large" />
  </Layout>
);

export default Spinner;
