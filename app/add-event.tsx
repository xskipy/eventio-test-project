import { breakpoints } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import CreateEventForm from "@/components/forms/CreateEventForm";
import Layout from "@/components/screens/Layout";

const AddEventScreen = () => (
  <Layout type="alignedCenter" style={styles.container}>
    <CreateEventForm />
  </Layout>
);

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    padding: breakpoints.padding,
  },
});
