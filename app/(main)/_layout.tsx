import { breakpoints, colors, headerTitleStyle } from "@/constants/theme";
import { router, Tabs } from "expo-router";
import CalendarIcon from "@/assets/images/icons/calendar.svg";
import UserIcon from "@/assets/images/icons/user.svg";
import PlusIcon from "@/components/PlusIcon";
import EventsHeaderButtons from "@/components/headers/EventsHeaderButtons";
import ProfileHeaderButtons from "@/components/headers/ProfileHeaderButtons";
import devLog from "@/utils/devLog";
import { EventsProvider } from "@/contexts/EventsContext";
// import PlusIcon from "@/assets/images/icons/plus.svg";

const MainLayout = () => {
  return (
    <EventsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.tabs.active,
          tabBarInactiveTintColor: colors.tabs.inactive,
          tabBarShowLabel: false,
          headerTransparent: true,
          headerTitleStyle: headerTitleStyle,
          tabBarStyle: {
            height: 72,
          },
          headerStatusBarHeight: 44,
        }}
        sceneContainerStyle={{
          padding: breakpoints.padding,
          backgroundColor: colors.background.primary,
          paddingTop: 96,
        }}
      >
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
              devLog("info", "show modal");
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
            tabBarIcon: ({ color }) => null,
            tabBarButton: () => null,
            // TODO: Add back button
            headerLeft: ProfileHeaderButtons,
          }}
        />
      </Tabs>
    </EventsProvider>
  );
};

export default MainLayout;
