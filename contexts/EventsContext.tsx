import IEventContext, { EventsLayout, Filter } from "@/types/EventsContext";
import EventType from "@/types/Event";

import { useState, createContext, useContext, FC, PropsWithChildren, useMemo } from "react";
import useQuery from "@/hooks/useQuery";
import { useQueryClient } from "@tanstack/react-query";

const EventContext = createContext({} as IEventContext);

export const EventsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>("all");
  const [layout, setLayout] = useState<EventsLayout>("grid");

  const { data: events, isLoading } = useQuery<EventType[]>(["events"]);
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.refetchQueries({ queryKey: ["events"] });
  };

  const filteredEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];
    if (filter === "all") return events;

    return events.filter((ev) => {
      if (filter === "future") return new Date(ev.startsAt).getTime() > new Date().getTime();
      if (filter === "past") return new Date(ev.startsAt).getTime() < new Date().getTime();
    });
  }, [events, filter]);

  return (
    <EventContext.Provider
      value={{
        filter,
        setFilter,
        layout,
        setLayout,
        events: events ?? [],
        refetch,
        isLoading,
        filteredEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
