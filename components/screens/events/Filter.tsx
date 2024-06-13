import Button, { ButtonProps, ButtonTypes } from "@/components/Button";
import { useEvents } from "@/contexts/EventsContext";
import { Filter as FilterType } from "@/types/EventsContext";
import devLog from "@/utils/devLog";
import { View, StyleSheet } from "react-native";

const Filter = () => {
  const { setFilter, filter } = useEvents();

  const onSetFilter = (filter: FilterType) => () => {
    devLog("info", "Setting filter", filter);
    setFilter(filter);
  };

  const getBtnType = (type: FilterType): ButtonTypes => (filter === type ? "black" : "inactive");

  return (
    <View style={styles.container}>
      <Button
        onPressOut={onSetFilter("all")}
        style={styles.btn}
        size="s"
        type={getBtnType("all")}
        title="ALL"
      />
      <Button
        onPressOut={onSetFilter("future")}
        style={styles.btn}
        size="s"
        type={getBtnType("future")}
        title="FUTURE"
      />
      <Button
        onPressOut={onSetFilter("past")}
        style={styles.btn}
        size="s"
        type={getBtnType("past")}
        title="PAST"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  btn: {
    flex: 1,
  },
});

export default Filter;
