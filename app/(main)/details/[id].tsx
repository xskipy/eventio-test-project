import Attendees from "@/components/screens/events/Attendees";
import Event from "@/components/screens/events/Event";
import useQuery from "@/hooks/useQuery";
import EventType from "@/types/Event";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: event, isLoading } = useQuery<EventType>([`events/${id}`]);

  // TODO: Style properly
  if (isLoading) return <ActivityIndicator />;

  // TODO: Properly handle no data
  if (!event) return null;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Event data={event} disableDetailPress />
      <Attendees data={event.attendees} />
    </View>
  );
};

export default EventDetailsScreen;
