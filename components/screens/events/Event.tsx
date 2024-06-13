import Paper from "@/components/Paper";
import { View, StyleSheet } from "react-native";
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

export interface EventProps {
  date: string;
  title: string;
  owner: UserData;
  description: string;
  attendees: UserData[];
  capacity: number;
  id: string;
}

const Event: FC<EventProps> = ({ date, title, owner, description, attendees, capacity, id }) => {
  const { userData } = useAuth();

  const { joinEvent, leaveEvent, editEvent } = useEvent(id);
  const { layout } = useEvents();

  const isAttending = attendees.some((attendee) => attendee.id === userData?.id);
  const isOwner = owner.id === userData?.id;

  const buttonProps = useMemo(() => {
    if (isOwner) {
      return { title: "Edit", onClick: editEvent, type: "gray" };
    }
    if (isAttending) {
      return { title: "Leave", onClick: leaveEvent, type: "red" };
    }

    return { title: "Join", onClick: joinEvent, type: "default" };
  }, [isOwner, isAttending]);

  const eventStart = getEventStartTime(date);

  const interactionButton = useMemo(
    () => (
      <Button
        size="s"
        // Not the cleanest solution
        type={buttonProps.type as ButtonProps["type"]}
        title={buttonProps.title}
        onPressOut={buttonProps.onClick}
      />
    ),
    [buttonProps]
  );

  return (
    <Paper style={[styles.container, layout === "lines" ? styles.lineLayout : undefined]}>
      <View style={[styles.header, layout === "lines" ? styles.lineHeader : undefined]}>
        <Text style={styles.date} type="subtitle">
          {eventStart}
        </Text>
        <Text style={styles.title} type="title">
          {title}
        </Text>
        <Text style={styles.author} type="subtitle">{`${owner.firstName} ${owner.lastName}`}</Text>
      </View>
      {layout === "grid" && (
        <>
          <Text style={styles.description} type="default">
            {description}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.attendence} type="subtitle">
              <UserIcon fill={colors.tertiary} style={styles.icon} />
              {attendees.length} of {capacity}
            </Text>
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
  icon: {
    marginRight: 10,
  },
  title: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 24,
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
