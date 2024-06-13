import UserData from "@/types/UserData";

interface Event {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  capacity: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  attendees: UserData[];
  owner: UserData;
}

export default Event;
