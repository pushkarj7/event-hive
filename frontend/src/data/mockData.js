export const initialEvents = [
  { id: 1, title: "Tech Conference 2026", location: "New Delhi", price: 499, category: "Technology", date: "2026-10-12", rating: 4.5, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87", status: "Upcoming" },
  { id: 2, title: "Music Fest", location: "Mumbai", price: 999, category: "Concerts", date: "2026-10-18", rating: 4.9, image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a", status: "Upcoming" },
  { id: 3, title: "Sports Meetup", location: "Bangalore", price: 799, category: "Sports", date: "2026-10-24", rating: 4.7, image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402", status: "Upcoming" },
  { id: 4, title: "Art Exhibition", location: "New Delhi", price: 299, category: "Art", date: "2026-10-25", rating: 4.2, image: "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658", status: "Upcoming" },
  { id: 5, title: "Business Summit", location: "Hyderabad", price: 1299, category: "Business", date: "2026-11-02", rating: 4.8, image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca", status: "Upcoming" },
  { id: 6, title: "Theatre Night", location: "Kolkata", price: 599, category: "Theatre", date: "2026-11-05", rating: 4.4, image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf", status: "Upcoming" },
];

export const initialBookings = [
  { id: "#001", eventId: 1, event: "Tech Conference 2026", user: "Aman Kumar", date: "28 Sep 2026", tickets: 2, amount: "₹2,000", status: "Confirmed" },
  { id: "#002", eventId: 2, event: "Music Fest", user: "Priya Sharma", date: "27 Sep 2026", tickets: 4, amount: "₹4,800", status: "Confirmed" },
  { id: "#003", eventId: 3, event: "Sports Meetup", user: "Rahul Verma", date: "26 Sep 2026", tickets: 1, amount: "₹999", status: "Pending" },
  { id: "#004", eventId: 1, event: "Tech Conference 2026", user: "Neha Singh", date: "25 Sep 2026", tickets: 3, amount: "₹3,000", status: "Confirmed" },
];

export const weeklyBookings = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 46 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 54 },
  { day: "Fri", value: 48 },
  { day: "Sat", value: 66 },
  { day: "Sun", value: 59 },
];
