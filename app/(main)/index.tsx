import Events from "@/components/screens/events/Events";
import Filter from "@/components/screens/events/Filter";
import Layout from "@/components/screens/Layout";

const EventsScreen = () => {
  return (
    <Layout>
      <Events header={<Filter />} displayEvents="filtered" />
    </Layout>
  );
};

export default EventsScreen;
