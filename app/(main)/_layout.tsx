import { colors } from "@/constants/theme";
import { Tabs } from "expo-router";
import CalendarIcon from "@/assets/images/icons/calendar.svg";
import UserIcon from "@/assets/images/icons/user.svg";
import PlusIcon from "@/assets/images/icons/plus.svg";

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        // contentStyle: {
        //   padding: breakpoints.padding,
        //   backgroundColor: colors.white,
        // },
        tabBarActiveTintColor: colors.tabs.active,
        tabBarInactiveTintColor: colors.tabs.inactive,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-event"
        options={{
          title: "Add Event",
          tabBarIcon: ({ color }) => <PlusIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
