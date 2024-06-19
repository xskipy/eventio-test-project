import Event from "@/components/screens/events/Event";
import { render, screen } from "@testing-library/react-native";
import eventMock from "@/mocks/eventDataMock";
import { useAuth } from "@/contexts/AuthContext";
import useEvent from "@/hooks/useEvent";
import { useEvents } from "@/contexts/EventsContext";

jest.mock("@/contexts/AuthContext");
jest.mock("@/hooks/useEvent");
jest.mock("@/contexts/EventsContext");

const mockUseEvent = useEvent as jest.MockedFunction<typeof useEvent>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseEvents = useEvents as jest.MockedFunction<typeof useEvents>;

describe("Event (layout = grid)", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      accessToken: null,
      setAccessToken: jest.fn(),
      refreshToken: null,
      setRefreshToken: jest.fn(),
      authLoading: false,
      isUserLoggedIn: jest.fn().mockReturnValue(false),
      userData: null,
      setUserData: jest.fn(),
      refreshSession: jest.fn().mockResolvedValue(null),
      isTokenExpired: jest.fn().mockResolvedValue(false),
      logoutUser: jest.fn(),
    });

    mockUseEvent.mockReturnValue({
      joinEvent: jest.fn(),
      leaveEvent: jest.fn(),
      editEvent: jest.fn(),
    });

    mockUseEvents.mockReturnValue({
      layout: "lines",
      setLayout: jest.fn(),
      filter: "all",
      setFilter: jest.fn(),
      events: [],
      filteredEvents: [],
      isLoading: false,
      refetch: jest.fn(),
    });
    render(<Event data={eventMock} />);
  });

  test("should render event title", async () => {
    const component = screen.getByTestId("event-title");
    expect(component).toBeTruthy();
  });

  test("should NOT render event description", async () => {
    const component = screen.queryByTestId("event-description");
    expect(component).toBeFalsy();
  });

  test("should render event button", async () => {
    const component = screen.getByTestId("event-button");
    expect(component).toBeTruthy();
  });

  test("should render event start", async () => {
    const component = screen.getByTestId("event-start");
    expect(component).toBeTruthy();
  });

  test("should render event author", async () => {
    const component = screen.getByTestId("event-author");
    expect(component).toBeTruthy();
  });
  test("should NOT render event capacity", async () => {
    const component = screen.queryByTestId("event-capacity");
    expect(component).toBeFalsy();
  });
});
