import Paper from "@/components/Paper";
import UserData from "@/types/UserData";
import { FC } from "react";
import Text from "@/components/Text";
import { StyleSheet, View } from "react-native";
import Pill from "@/components/Pill";

interface AttendeesProps {
  data: UserData[];
}

const Attendees: FC<AttendeesProps> = ({ data }) => {
  return (
    <Paper>
      <Text type="paperTitle">Attendees</Text>
      <View style={styles.pillsContainer}>
        {data.map((attendee) => (
          <Pill key={attendee.id} text={`${attendee.firstName} ${attendee.lastName}`} />
        ))}
      </View>
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
