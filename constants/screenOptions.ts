import { breakpoints, colors, headerTitleStyle } from "@/constants/theme";

export const tabsOptions = {
  tabBarActiveTintColor: colors.tabs.active,
  tabBarInactiveTintColor: colors.tabs.inactive,
  tabBarShowLabel: false,
  headerTransparent: true,
  headerTitleStyle: headerTitleStyle,
  tabBarStyle: {
    height: 72,
  },
  headerStatusBarHeight: 44,
};

export const tabsContainerStyle = {
  padding: breakpoints.padding,
  backgroundColor: colors.background.primary,
  paddingTop: 96,
};

export const stackOptions = {
  contentStyle: {
    padding: breakpoints.padding,
    backgroundColor: colors.white,
  },
  headerShown: false,
};
