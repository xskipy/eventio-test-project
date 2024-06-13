import Event from "@/components/screens/events/Event";
import { breakpoints } from "@/constants/theme";
import { useEvents } from "@/contexts/EventsContext";
import useQuery from "@/hooks/useQuery";
import EventType from "@/types/Event";
import devLog from "@/utils/devLog";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";

interface EventsProps {
  header?: React.ReactElement;
  showFiltered?: boolean;
}

const Events: FC<EventsProps> = ({ showFiltered = false, header }) => {
  const { events, filteredEvents, isLoading, refetch } = useEvents();

  useEffect(() => {
    devLog("info", "Events data changed", { events, isLoading });
  }, [events, isLoading]);

  return (
    <FlatList
      style={{
        marginTop: breakpoints.margin,
      }}
      onRefresh={refetch}
      ListHeaderComponent={header}
      ListEmptyComponent={isLoading ? <ActivityIndicator /> : null}
      refreshing={isLoading}
      data={showFiltered ? filteredEvents : events}
      renderItem={({ item }) => (
        <Event
          date={item.startsAt}
          title={item.title}
          owner={item.owner}
          description={item.description}
          attendees={item.attendees}
          capacity={item.capacity}
          id={item.id}
        />
      )}
      keyExtractor={(data) => data.id}
    />
  );
};

export default Events;
