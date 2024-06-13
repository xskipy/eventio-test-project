import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { useAuth } from "@/contexts/AuthContext";
import { colors } from "@/constants/theme";

// TODO: Redo this styling with Paper component
const ProfileHeader = () => {
  const { userData } = useAuth();

  const initials =
    `${userData?.firstName.charAt(0)}${userData?.lastName.charAt(0)}`.toLocaleUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text type="semiBold">{`${userData?.firstName} ${userData?.lastName}`}</Text>
      <Text type="subtitle">{userData?.email}</Text>
    </View>
  );
};

// TODO: fixup these styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 32,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#9E9E9E",
  },
});

export default ProfileHeader;
