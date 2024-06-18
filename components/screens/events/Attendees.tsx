import Paper from "@/components/Paper";
import UserData from "@/types/UserData";
import { FC } from "react";
import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import Pill from "@/components/Pill";
import { useAuth } from "@/contexts/AuthContext";

interface AttendeesProps {
  data: UserData[];
}

const Attendees: FC<AttendeesProps> = ({ data }) => {
  const { userData } = useAuth();

  const attendeeMap = (attendee: UserData) => {
    if (attendee.id === userData?.id) return <Pill key={userData.id} text="You" outline />;

    return <Pill key={attendee.id} text={`${attendee.firstName} ${attendee.lastName}`} />;
  };

  const sortUserFirst = (a: UserData, b: UserData) => {
    if (a.id === userData?.id) return -1;
    if (b.id === userData?.id) return 1;
    return 0;
  };

  return (
    <Paper>
      <Text type="paperTitle">Attendees</Text>
      <View style={styles.pillsContainer}>{data.sort(sortUserFirst).map(attendeeMap)}</View>
    </Paper>
  );
};

export default Attendees;

const styles = StyleSheet.create({
  pillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 24,
  },
});
