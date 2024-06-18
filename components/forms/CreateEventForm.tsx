import Button from "@/components/Button";
import Input from "@/components/Input";
import useMutation from "@/hooks/useMutation";
import setFormError from "@/utils/setFormError";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import devLog from "@/utils/devLog";
import CreateEventValues from "@/types/forms/CreateEventValues";
import Event from "@/types/Event";
import CreateEventRequest from "@/types/api/CreateEventRequest";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import ErrorResponse from "@/types/api/ErrorResponse";
import convertToISO from "@/utils/convertToISO";

const CreateEventForm = () => {
  const methods = useForm<CreateEventValues>();
  const queryClient = useQueryClient();
  const { userData } = useAuth();

  const { mutate, status } = useMutation<Event, ErrorResponse, CreateEventRequest>(
    ["events"],
    "POST",
    {
      onSuccess: () => {
        devLog("info", `Succesfully created event`);
        queryClient.refetchQueries({ queryKey: ["events"] });

        devLog("info", `Navigating home`);
        router.replace("/(main)");
      },
      onError: (err) => {
        devLog("debug", "Error logging in", { err });

        // TODO: Revisit error logging here
        setFormError(methods, "capacity", "Oops! Something went wrong creating event. Try again.");
        queryClient.refetchQueries({ queryKey: ["events"] });
      },
      onMutate: (event) => {
        if (!userData) return;

        const currentEvents = queryClient.getQueryData<Event[]>(["events"]);
        const currentTime = new Date().toISOString();

        currentEvents?.push({
          ...event,
          id: `optimistic-${new Date().getTime()}`,
          owner: userData,
          ownerId: userData.id,
          attendees: [userData],
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        queryClient.setQueryData<Event[]>(["events"], () => currentEvents);
      },
      retry: false,
    }
  );

  const onCreateEvent = (values: CreateEventValues) => {
    mutate({
      title: values.title,
      description: values.description,
      capacity: values.capacity,
      startsAt: convertToISO(values.time, values.date),
    });
  };

  // TODO: TIME/DATE components could be added
  // for better user experience.
  return (
    <FormProvider {...methods}>
      <Input name="title" required placeholder="Title" />
      <Input name="description" required placeholder="Description" />
      <Input name="date" required validation="date" placeholder="Date" />
      <Input name="time" required validation="time" placeholder="Time" />
      <Input type="number" name="capacity" required placeholder="Capacity" />
      <View style={styles.buttonContainer}>
        <Button
          loading={status === "pending"}
          style={styles.button}
          onPressOut={methods.handleSubmit(onCreateEvent)}
          title="CREATE"
          size="l"
        />
      </View>
    </FormProvider>
  );
};

export default CreateEventForm;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
    width: "100%",
  },
  button: { paddingVertical: 18 },
});
