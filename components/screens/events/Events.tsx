import Event from "@/components/screens/events/Event";
import { breakpoints } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventsContext";
import { FC, useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import EventType from "@/types/Event";
import Spinner from "@/components/Spinner";

interface EventsProps {
  header?: React.ReactElement;
  displayEvents?: "all" | "filtered" | "attending";
}

const Events: FC<EventsProps> = ({ displayEvents = "all", header }) => {
  const { events, filteredEvents, isLoading, refetch } = useEvents();
  const { userData } = useAuth();

  const data = useMemo(() => {
    switch (displayEvents) {
      case "attending":
        return events.filter((ev) => ev.attendees.some(({ id }) => id === userData?.id));
      case "filtered":
        return filteredEvents;
      default:
        return events;
    }
  }, [displayEvents, events, filteredEvents, userData]);

  const renderEvent: ListRenderItem<EventType> = useCallback(
    ({ item }) => <Event data={item} />,
    []
  );

  const isInitialLoading = data.length === 0 && isLoading;

  return (
    <FlatList
      style={styles.listContainer}
      contentContainerStyle={isInitialLoading ? styles.loadingContainer : undefined}
      onRefresh={refetch}
      ListHeaderComponent={header}
      ListEmptyComponent={isLoading ? <Spinner /> : null}
      refreshing={data.length === 0 ? false : isLoading}
      data={data}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id}
      extraData={events}
    />
  );
};

export default Events;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: breakpoints.margin,
  },
  loadingContainer: {
    flex: 1,
  },
});
