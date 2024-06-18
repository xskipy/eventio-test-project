import Layout from "@/components/screens/Layout";
import { ActivityIndicator } from "react-native";

const Spinner = () => (
  <Layout type="centered">
    <ActivityIndicator size="large" />
  </Layout>
);

export default Spinner;
