import { breakpoints, colors, headerTitleStyle } from "@/constants/theme";
import { router, Tabs } from "expo-router";
import CalendarIcon from "@/assets/images/icons/calendar.svg";
import UserIcon from "@/assets/images/icons/user.svg";
import PlusIcon from "@/components/PlusIcon";
import EventsHeaderButtons from "@/components/headers/EventsHeaderButtons";
import ProfileHeaderButtons from "@/components/headers/ProfileHeaderButtons";
import { EventsProvider } from "@/contexts/EventsContext";
import HeaderBackButton from "@/components/headers/HeaderBackButton";
import { tabsContainerStyle, tabsOptions } from "@/constants/screenOptions";

const MainLayout = () => {
  return (
    <EventsProvider>
      <Tabs screenOptions={tabsOptions} sceneContainerStyle={tabsContainerStyle}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Events",
            tabBarIcon: ({ color }) => <CalendarIcon fill={color} />,
            headerRight: EventsHeaderButtons,
          }}
        />
        <Tabs.Screen
          name="add-event"
          options={{
            title: "Add Event",
            tabBarIcon: () => <PlusIcon />,
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              // Navigate to modal
              router.push("/add-event");
            },
          })}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <UserIcon fill={color} />,
            headerRight: ProfileHeaderButtons,
          }}
        />
        <Tabs.Screen
          name="details/[id]"
          options={{
            title: "Event details",
            tabBarIcon: () => null,
            tabBarButton: () => null,
            headerLeft: HeaderBackButton,
          }}
        />
      </Tabs>
    </EventsProvider>
  );
};

export default MainLayout;
