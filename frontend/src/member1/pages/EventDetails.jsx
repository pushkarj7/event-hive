import EventDetailsHero from "../components/EventDetailsHero";
function EventDetails(){
     const event = {
    category: "Music",
    title: "Music & Live Concert",
    date: "28 September 2026",
    time: "7:00 PM - 10:00 PM",
    location: "New Delhi",
    rating: "4.8",
    price: "₹999",
    organizer: "Event Hive",
    description:
      "Experience an unforgettable evening filled with live music, amazing performances and great moments.",
    images: [
      "/images/event-1.jpg",
      "/images/event-2.jpg",
      "/images/event-3.jpg",
    ],
  };

  return <EventDetailsHero event={event} />;
}

export default EventDetails;