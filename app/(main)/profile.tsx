import ProfileHeader from "@/components/screens/profile/ProfileHeader";
import { Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ProfileHeader />
      <Text>Profile Screen.</Text>
    </View>
  );
};

export default ProfileScreen;
