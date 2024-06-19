import AddEventScreen from "@/app/add-event";
import Layout from "@/components/screens/Layout";
import { breakpoints, colors } from "@/constants/theme";

/**
 * - This screen is currently a workaround for Android to display it as a tab
 * - Otherwise this component should be only used as a reference for file based router
 * @todo Investigate error on android and display modal the same way as on iOS
 */
const AndroidAddEventScreen = () => {
  return (
    <Layout style={{ backgroundColor: colors.background.secondary, margin: -breakpoints.padding }}>
      <AddEventScreen />
    </Layout>
  );
};

export default AndroidAddEventScreen;
