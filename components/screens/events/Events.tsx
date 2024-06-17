import Event from "@/components/screens/events/Event";
import { breakpoints } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventsContext";
import { FC, useCallback, useEffect, useMemo } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import EventType from "@/types/Event";

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
  }, [displayEvents, events, filteredEvents]);

  const renderEvent: ListRenderItem<EventType> = useCallback(
    ({ item }) => <Event data={item} />,
    []
  );

  return (
    <FlatList
      style={{
        marginTop: breakpoints.margin,
      }}
      onRefresh={refetch}
      ListHeaderComponent={header}
      ListEmptyComponent={isLoading ? <ActivityIndicator /> : null}
      refreshing={isLoading}
      data={data}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id}
      extraData={events}
    />
  );
};

export default Events;
