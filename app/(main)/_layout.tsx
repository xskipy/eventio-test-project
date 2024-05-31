import { Stack } from "expo-router";
  
const MainLayout = () => {

  return (
    <Stack>
      <Stack.Screen options={{ title: 'Events' }} name="index" />
    </Stack>
  );
}

export default MainLayout;