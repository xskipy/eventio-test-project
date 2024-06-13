import { useAuth } from "@/contexts/AuthContext";
import useMutation from "@/hooks/useMutation";
import ErrorResponse from "@/types/api/ErrorResponse";
import Event from "@/types/Event";
import devLog from "@/utils/devLog";
import { useQueryClient } from "@tanstack/react-query";

const useEvent = (id: string) => {
  const queryClient = useQueryClient();
  const { userData } = useAuth();

  const { mutate: joinEvent } = useMutation<Event, ErrorResponse, void>(
    [`events/${id}/attendees/me`],
    "POST",
    {
      onMutate: () => {
        if (!userData) return;

        const previousEvents = queryClient.getQueryData<Event[]>(["events"]);
        if (!previousEvents) return;

        const eventIndex = previousEvents?.findIndex((ev) => ev.id === id);

        if (!eventIndex) return;

        previousEvents[eventIndex].attendees.push(userData);

        queryClient.setQueryData<Event[]>(["events"], () => previousEvents);
      },
      onSuccess: () => {
        devLog("info", "Joined the event!");
        queryClient.refetchQueries({ queryKey: ["events"] });
      },
      onError: () => {
        devLog("error", "Something went wrong joining the event");
      },
    }
  );

  const { mutate: leaveEvent } = useMutation<Event, ErrorResponse, void>(
    [`events/${id}/attendees/me`],
    "DELETE",
    {
      onSuccess: () => {
        devLog("info", "Left the event!");
        queryClient.refetchQueries({ queryKey: ["events"] });
      },
      onError: () => {
        devLog("error", "Something went wrong leaving the event");
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
