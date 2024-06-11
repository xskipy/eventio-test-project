import { ActivityIndicator, View } from "react-native";
import Text from "@/components/Text";
import { useEffect, useState } from "react";
import AuthResponse from "@/types/api/AuthResponse";
import { getFromStorage } from "@/utils/storage";

const ProfileHeader = () => {
  /// load the data from storage;
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState<AuthResponse>();

  useEffect(() => {
    setLoading(true);
    getFromStorage("userData")
      .then((storageUserData) => {
        if (!storageUserData) return;

        const transformedData = JSON.parse(storageUserData);

        setUserData(transformedData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text>{`${userData?.firstName} ${userData?.lastName}`}</Text>
            <Text>{userData?.email}</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileHeader;
