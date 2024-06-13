import { StyleSheet, View, Alert, ActionSheetIOS } from "react-native";
import CogIcon from "@/assets/images/icons/cog.svg";
import { breakpoints } from "@/constants/theme";
import { Device } from "@/utils/deviceInfo";
import { useAuth } from "@/contexts/AuthContext";
import IconButton from "@/components/IconButton";

const ProfileHeaderButtons = () => {
  const { logoutUser } = useAuth();

  const onLogout = () => {
    logoutUser();
  };

  // TODO: Implementation
  const onEditProfile = () => {};

  const onOptionsPress = () => {
    if (Device.isAndroid) {
      Alert.alert("Profile Settings", "", [
        {
          text: "Edit profile",
          onPress: onEditProfile,
          style: "default",
        },
        {
          text: "Logout",
          onPress: onLogout,
          style: "destructive",
        },
        {
          text: "Cancel",
          // onPress: () => {},
          style: "cancel",
        },
      ]);
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Edit profile", "Logout", "Cancel"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            onEditProfile();
            return;

          case 1:
            onLogout();
            return;

          case 2:
            ActionSheetIOS.dismissActionSheet();
            return;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <IconButton onPress={onOptionsPress} icon={<CogIcon width={24} height={24} />} />
    </View>
  );
};

export default ProfileHeaderButtons;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: breakpoints.margin,
    gap: breakpoints.margin,
  },
});
