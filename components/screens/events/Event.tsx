import Paper from "@/components/Paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "@/components/Text";
import Button, { ButtonProps } from "@/components/Button";
import { FC, useMemo } from "react";
import { breakpoints, colors } from "@/constants/theme";
import UserIcon from "@/assets/images/icons/user.svg";
import { useAuth } from "@/contexts/AuthContext";
import getEventStartTime from "@/utils/getEventStartTime";
import useEvent from "@/hooks/useEvent";
import { useEvents } from "@/contexts/EventsContext";
import EventType from "@/types/Event";
import { router } from "expo-router";

export interface EventProps {
  data: EventType;
  detailView?: boolean;
}

const Event: FC<EventProps> = ({ data, detailView = false }) => {
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
  }, [isOwner, isAttending, editEvent, leaveEvent, joinEvent]);

  const eventStart = getEventStartTime(startsAt);

  const navigateToDetail = () =>
    router.navigate({ pathname: "/(main)/details/[id]", params: { id: data.id } });

  const interactionButton = useMemo(
    () => (
      <Button
        testID="event-button"
        size="s"
        type={buttonProps.type}
        title={buttonProps.title}
        onPressOut={buttonProps.onPress}
      />
    ),
    [buttonProps]
  );

  const eventTitle = (
    <Text testID="event-title" type="paperTitle">
      {title}
    </Text>
  );

  const isLinesLayout = layout === "lines" && !detailView;

  return (
    <Paper style={[styles.container, isLinesLayout ? styles.lineLayout : undefined]}>
      <View style={[styles.header, isLinesLayout ? styles.lineHeader : undefined]}>
        <Text testID="event-start" style={styles.date} type="subtitle">
          {eventStart}
        </Text>
        {detailView ? (
          eventTitle
        ) : (
          <TouchableOpacity onPress={navigateToDetail}>{eventTitle}</TouchableOpacity>
        )}
        <Text
          testID="event-author"
          style={styles.author}
          type="subtitle"
        >{`${owner.firstName} ${owner.lastName}`}</Text>
      </View>
      {!isLinesLayout && (
        <>
          <Text testID="event-description" style={styles.description} type="default">
            {description}
          </Text>
          <View style={styles.footer}>
            <View style={styles.capacityContainer}>
              <UserIcon fill={colors.tertiary} />
              <Text testID="event-capacity" style={styles.attendence} type="subtitle">
                {attendees.length} of {capacity}
              </Text>
            </View>
            {interactionButton}
          </View>
        </>
      )}
      {isLinesLayout && <View style={styles.lineButton}>{interactionButton}</View>}
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
