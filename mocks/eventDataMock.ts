import Event from "@/types/Event";

const eventDataMock: Event = {
  id: "event123",
  title: "Annual Tech Conference",
  description: "A conference discussing the latest in technology and innovation.",
  startsAt: "2024-07-10T09:00:00Z",
  capacity: 20,
  ownerId: "user1",
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-06-01T12:00:00Z",
  attendees: [
    {
      id: "user2",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
    },
    {
      id: "user3",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
    },
  ],
  owner: {
    id: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
};

export default eventDataMock;
