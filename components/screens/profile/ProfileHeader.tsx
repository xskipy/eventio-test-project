import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { useAuth } from "@/contexts/AuthContext";
import { colors } from "@/constants/theme";
import Paper from "@/components/Paper";

const ProfileHeader = () => {
  const { userData } = useAuth();

  const initials =
    `${userData?.firstName.charAt(0)}${userData?.lastName.charAt(0)}`.toLocaleUpperCase();

  return (
    <Paper style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text type="semiBold">{`${userData?.firstName} ${userData?.lastName}`}</Text>
      <Text type="subtitle">{userData?.email}</Text>
    </Paper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: (120 / 4) * 2,
  },
  avatar: {
    top: (-120 / 3) * 2,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.status.disabled,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -60,
  },
  avatarText: {
    color: colors.tertiary,
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 600,
  },
  name: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 24,
    marginBottom: 4,
  },
  email: {
    fontWeight: 400,
    fontSize: 16,
    color: colors.tertiary,
  },
});

export default ProfileHeader;
