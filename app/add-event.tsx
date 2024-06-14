import { breakpoints, colors } from "@/constants/theme";
import Text from "@/components/Text";
import { View } from "react-native";
import CreateEventForm from "@/components/forms/CreateEventForm";
import { useEvents } from "@/contexts/EventsContext";

const AddEventScreen = () => {
  const { events } = useEvents();
  return (
    <View
      style={{
        flex: 1,
        padding: breakpoints.padding,
        alignItems: "center",
        backgroundColor: colors.background.secondary,
      }}
    >
      <View>
        <Text>Create new event</Text>
      </View>
      <CreateEventForm />
      <Text>event count: {events?.length}</Text>
    </View>
  );
};

export default AddEventScreen;
