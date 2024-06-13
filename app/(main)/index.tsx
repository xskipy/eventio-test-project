import Events from "@/components/screens/events/Events";
import Filter from "@/components/screens/events/Filter";
import { EventsProvider } from "@/contexts/EventsContext";
import { View } from "react-native";

const EventsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Events header={<Filter />} showFiltered />
    </View>
  );
};

export default EventsScreen;
