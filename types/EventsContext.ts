import Event from "@/types/Event";

export type EventsLayout = "grid" | "lines";
export type Filter = "all" | "future" | "past";

interface EventsContext {
  layout: EventsLayout;
  setLayout: (layout: EventsLayout) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  events: Event[];
  filteredEvents: Event[];
  isLoading: boolean;
  refetch: () => void;
}

export default EventsContext;
