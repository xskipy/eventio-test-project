import Attendees from "@/components/screens/events/Attendees";
import Event from "@/components/screens/events/Event";
import Layout from "@/components/screens/Layout";
import useQuery from "@/hooks/useQuery";
import EventType from "@/types/Event";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

/**
 * Screen for displaying event details
 *
 * @todo Handle error/no data from event API
 */
const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { data: event, isLoading } = useQuery<EventType>([`events/${id}`]);

  if (isLoading)
    return (
      <Layout type="centered">
        <ActivityIndicator />
      </Layout>
    );

  // TODO: Properly handle no data
  if (!event) return null;

  return (
    <Layout>
      <Event data={event} disableDetailPress />
      <Attendees data={event.attendees} />
    </Layout>
  );
};

export default EventDetailsScreen;
