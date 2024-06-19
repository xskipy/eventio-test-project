import Paper from "@/components/Paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "@/components/Text";
import Button, { ButtonProps } from "@/components/Button";
import { FC, useMemo } from "react";
import { breakpoints, colors } from "@/constants/theme";
import UserIcon from "@/assets/images/icons/user.svg";
import { useAuth } from "@/contexts/AuthContext";
import UserData from "@/types/UserData";
import getEventStartTime from "@/utils/getEventStartTime";
import useEvent from "@/hooks/useEvent";
import { useEvents } from "@/contexts/EventsContext";
import EventType from "@/types/Event";
import { router } from "expo-router";

export interface EventProps {
  data: EventType;
  disableDetailPress?: boolean;
}

const Event: FC<EventProps> = ({ data, disableDetailPress = false }) => {
  const { userData } = useAuth();
  const { startsAt, title, owner, description, attendees, capacity, id } = data;

  const { joinEvent, leaveEvent, editEvent } = useEvent(id);
  const { layout } = useEvents();

  const isAttending = attendees.some((attendee) => attendee.id === userData?.id);
  const isOwner = owner.id === userData?.id;

  const buttonProps: ButtonProps = useMemo(() => {
    if (isOwner) {
      return { title: "Edit", onPress: editEvent, type: "gray" };
    }
    if (isAttending) {
      return { title: "Leave", onPress: leaveEvent, type: "red" };
    }

    return { title: "Join", onPress: joinEvent, type: "primary" };
  }, [isOwner, isAttending]);

  const eventStart = getEventStartTime(startsAt);

  const navigateToDetail = () =>
    router.navigate({ pathname: "/(main)/details/[id]", params: { id: data.id } });

  const interactionButton = useMemo(
    () => (
      <Button
        size="s"
        type={buttonProps.type}
        title={buttonProps.title}
        onPressOut={buttonProps.onPress}
      />
    ),
    [buttonProps]
  );

  const eventTitle = <Text type="paperTitle">{title}</Text>;

  return (
    <Paper style={[styles.container, layout === "lines" ? styles.lineLayout : undefined]}>
      <View style={[styles.header, layout === "lines" ? styles.lineHeader : undefined]}>
        <Text style={styles.date} type="subtitle">
          {eventStart}
        </Text>
        {disableDetailPress ? (
          eventTitle
        ) : (
          <TouchableOpacity onPress={navigateToDetail}>{eventTitle}</TouchableOpacity>
        )}
        <Text style={styles.author} type="subtitle">{`${owner.firstName} ${owner.lastName}`}</Text>
      </View>
      {layout === "grid" && (
        <>
          <Text style={styles.description} type="default">
            {description}
          </Text>
          <View style={styles.footer}>
            <View style={styles.capacityContainer}>
              <UserIcon fill={colors.tertiary} />
              <Text style={styles.attendence} type="subtitle">
                {attendees.length} of {capacity}
              </Text>
            </View>
            {interactionButton}
          </View>
        </>
      )}
      {layout === "lines" && <View style={styles.lineButton}>{interactionButton}</View>}
    </Paper>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    gap: 4,
  },
  lineHeader: {
    flex: 2,
  },
  lineLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  lineButton: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    paddingVertical: breakpoints.padding,
  },
  capacityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  date: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    color: colors.tertiary,
  },
  author: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
    color: colors.secondary,
  },
  attendence: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 18,
    color: colors.secondary,
  },
});

export default Event;
