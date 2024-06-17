import { useAuth } from "@/contexts/AuthContext";
import useMutation from "@/hooks/useMutation";
import ErrorResponse from "@/types/api/ErrorResponse";
import Event from "@/types/Event";
import devLog from "@/utils/devLog";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const useEvent = (id: string) => {
  const queryClient = useQueryClient();
  const { userData } = useAuth();

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
    },
    [queryClient, userData]
  );

  const { mutate: joinEvent } = useMutation<Event, ErrorResponse, void>(
    [`events/${id}/attendees/me`],
    "POST",
    {
      onMutate: () => {
        optimisticQueryUpdate("joined");
      },
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["events"] });
      },
      onError: () => {
        // Invalidate because of Optimistic Update
        queryClient.invalidateQueries({ queryKey: ["events"] });
      },
    }
  );

  const { mutate: leaveEvent } = useMutation<Event, ErrorResponse, void>(
    [`events/${id}/attendees/me`],
    "DELETE",
    {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["events"] });
      },
      onMutate: () => {
        optimisticQueryUpdate("left");
      },
      onError: () => {
        // Invalidate because of Optimistic Update
        queryClient.invalidateQueries({ queryKey: ["events"] });
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
