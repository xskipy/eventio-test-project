import { useAuth } from "@/contexts/AuthContext";
import useMutation from "@/hooks/useMutation";
import ErrorResponse from "@/types/api/ErrorResponse";
import Event from "@/types/Event";
import devLog from "@/utils/devLog";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useEvent = (id: string) => {
  const queryClient = useQueryClient();
  const { userData } = useAuth();

  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["events"] });
    queryClient.invalidateQueries({ queryKey: [`events/${id}`] });
  }, [queryClient, id]);

  const optimisticQueryUpdate = useCallback(
    (type: "left" | "joined") => {
      devLog("info", "Event Optimistic update", type);
      if (!userData) return;

      const previousEvents = queryClient.getQueryData<Event[]>(["events"]);
      if (!previousEvents) return;

      const eventIndex = previousEvents?.findIndex((ev) => ev.id === id);

      if (eventIndex === -1) return;

      if ((type = "left")) {
        const userIdIndex = previousEvents[eventIndex].attendees.findIndex(
          (attendee) => attendee.id === userData.id
        );
        previousEvents[eventIndex].attendees.splice(userIdIndex);
      }
      if ((type = "joined")) {
        previousEvents[eventIndex].attendees.push(userData);
      }

      queryClient.setQueryData<Event[]>(["events"], () => previousEvents);
      queryClient.setQueryData<Event>([`events/${id}`], () => previousEvents[eventIndex]);
    },
    [queryClient, userData, id]
  );

  const { mutate: joinEvent } = useMutation<Event, ErrorResponse, void>(
    [`events/${id}/attendees/me`],
    "POST",
    {
      onMutate: () => {
        optimisticQueryUpdate("joined");
      },
      onSuccess: () => {
        invalidateQueries();
      },
      onError: () => {
        // Invalidate because of Optimistic Update
        invalidateQueries();
      },
    }
  );

  const { mutate: leaveEvent } = useMutation<Event, ErrorResponse, void>(
    [`events/${id}/attendees/me`],
    "DELETE",
    {
      onSuccess: () => {
        invalidateQueries();
      },
      onMutate: () => {
        optimisticQueryUpdate("left");
      },
      onError: () => {
        // Invalidate because of Optimistic Update
        invalidateQueries();
      },
    }
  );

  const onJoinEvent = () => {
    joinEvent();
  };

  const onLeaveEvent = () => {
    leaveEvent();
  };

  // TODO: add implementation
  const editEvent = () => {
    devLog("info", "Editing event...");
  };

  return { joinEvent: onJoinEvent, leaveEvent: onLeaveEvent, editEvent };
};

export default useEvent;
