import Events from "@/components/screens/events/Events";
import ProfileHeader from "@/components/screens/profile/ProfileHeader";
import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import EventsHeaderButtons from "@/components/headers/EventsHeaderButtons";
import { breakpoints } from "@/constants/theme";
import Layout from "@/components/screens/Layout";

const ProfileScreen = () => {
  return (
    <Layout>
      <Events
        displayEvents="attending"
        header={
          <>
            <ProfileHeader />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>My events</Text>
              <EventsHeaderButtons />
            </View>
          </>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginLeft: breakpoints.margin,
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 24,
  },
  headerContainer: {
    marginTop: breakpoints.margin,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProfileScreen;
