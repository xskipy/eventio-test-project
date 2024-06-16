import CreateEventValues from "@/types/forms/CreateEventValues";

interface CreateEventRequest extends Omit<CreateEventValues, "date" | "time"> {
  startsAt: string;
}

export default CreateEventRequest;
