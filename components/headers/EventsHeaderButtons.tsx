import { StyleSheet, View } from "react-native";
import GridIcon from "@/assets/images/icons/grid.svg";
import LinesIcon from "@/assets/images/icons/lines.svg";
import { breakpoints, colors } from "@/constants/theme";
import { useEvents } from "@/contexts/EventsContext";
import { EventsLayout } from "@/types/EventsContext";
import IconButton from "@/components/IconButton";

const EventsHeaderButtons = () => {
  const { layout, setLayout } = useEvents();

  const getIconColor = (type: EventsLayout): string =>
    layout === type ? colors.primary : colors.tertiary;

  const onSetLayout = (newLayout: EventsLayout) => () => {
    setLayout(newLayout);
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon={<GridIcon width={24} height={24} fill={getIconColor("grid")} />}
        onPress={onSetLayout("grid")}
      />
      <IconButton
        icon={<LinesIcon width={24} height={24} fill={getIconColor("lines")} />}
        onPress={onSetLayout("lines")}
      />
    </View>
  );
};

export default EventsHeaderButtons;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: breakpoints.margin,
    gap: breakpoints.margin,
  },
});
