import { breakpoints } from "@/constants/theme";
import { View } from "react-native";
import CreateEventForm from "@/components/forms/CreateEventForm";

const AddEventScreen = () => (
  <View
    style={{
      flex: 1,
      padding: breakpoints.padding,
      alignItems: "center",
    }}
  >
    <CreateEventForm />
  </View>
);

export default AddEventScreen;
