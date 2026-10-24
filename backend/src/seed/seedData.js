import "dotenv/config";
import connectDB from "../config/db.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

// Exact 15 events matching the frontend eventsData.js (Home & Events section)
const homeEvents = [
  {
    title: "EDM Night 2026",
    category: "Music",
    artist: "DJ Alex, DJ Nova, The Vibe",
    location: "City Arena, Delhi",
    date: new Date("2026-10-25T20:00:00Z"),
    price: 999,
    totalSeats: 400,
    availableSeats: 350,
    status: "upcoming",
    image: "/artists/dj-nova.jpg",
    description:
      "Get ready for the biggest EDM night of the year! Featuring top DJs, immersive visuals, laser shows, and an unforgettable atmosphere.",
  },
  {
    title: "Tech Summit 2026",
    category: "Tech",
    artist: "Industry Keynote Speakers & CTOs",
    location: "India Expo Centre, Noida",
    date: new Date("2026-11-20T10:00:00Z"),
    price: 1499,
    totalSeats: 500,
    availableSeats: 420,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description:
      "Explore the frontiers of AI, Web3, and Cloud Architecture with keynotes from global tech leaders, networking lounges, and venture pitching.",
  },
  {
    title: "Food & Wine Festival",
    category: "Food",
    artist: "Master Chefs & Acoustic Ensembles",
    location: "Riverside Park, Jaipur",
    date: new Date("2026-12-15T11:00:00Z"),
    price: 799,
    totalSeats: 350,
    availableSeats: 290,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    description:
      "Indulge in artisanal culinary delights, vintage vineyard wine tastings, live acoustic sets, and masterclasses led by Michelin-trained chefs.",
  },
  {
    title: "Cricket League Finals",
    category: "Sports",
    artist: "Top Championship Teams",
    location: "Eden Gardens, Kolkata",
    date: new Date("2027-01-16T14:00:00Z"),
    price: 1299,
    totalSeats: 800,
    availableSeats: 650,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    description:
      "Witness the grand championship clash of the season! Feel the electrifying stadium roar with front-row stadium action and world-class cricket.",
  },
  {
    title: "Arijit Singh Symphony Live",
    category: "Music",
    artist: "Arijit Singh & 40-Piece Symphony",
    location: "DY Patil Stadium, Mumbai",
    date: new Date("2026-11-15T19:00:00Z"),
    price: 1999,
    totalSeats: 600,
    availableSeats: 500,
    status: "upcoming",
    image: "/artists/arijit-singh.jpg",
    description:
      "An unforgettable evening of soulful melodies, grand orchestral arrangements, and heartfelt anthems performed live by Arijit Singh.",
  },
  {
    title: "Standup Comedy Special with Zakir",
    category: "Comedy",
    artist: "Zakir Khan",
    location: "Sirifort Auditorium, Delhi",
    date: new Date("2026-11-22T19:30:00Z"),
    price: 899,
    totalSeats: 450,
    availableSeats: 380,
    status: "upcoming",
    image: "/artists/zakir-khan.jpg",
    description:
      "Laugh till your stomach hurts with relatable storytelling, sharp observational wit, and humorous life lessons in this brand-new special.",
  },
  {
    title: "Global Art & Photography Biennale",
    category: "Arts",
    artist: "International Contemporary Artists",
    location: "Kala Ghoda Art Gallery, Mumbai",
    date: new Date("2026-12-05T10:00:00Z"),
    price: 499,
    totalSeats: 300,
    availableSeats: 260,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
    description:
      "Featuring over 300 international contemporary painters, sculptors, and digital installation artists showcasing boundary-pushing visual arts.",
  },
  {
    title: "Sunburn Beach Electronic Carnival",
    category: "Music",
    artist: "International Headliner DJs",
    location: "Vagator Coastal Arena, Goa",
    date: new Date("2026-12-28T16:00:00Z"),
    price: 2499,
    totalSeats: 700,
    availableSeats: 580,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    description:
      "Dance under the stars by the Arabian Sea! Multiple stages, global headline DJs, sunset chillout zones, and awe-inspiring pyrotechnics.",
  },
  {
    title: "AI & Robotics Developer Conclave",
    category: "Tech",
    artist: "AI Researchers & Robotics Engineers",
    location: "BIEC Centre, Bengaluru",
    date: new Date("2027-01-10T09:00:00Z"),
    price: 1899,
    totalSeats: 400,
    availableSeats: 320,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description:
      "Hands-on machine learning workshops, humanoid robotics demonstrations, generative agent architecture talks, and live hackathon challenges.",
  },
  {
    title: "Sunidhi Chauhan - I Am Home World Tour",
    category: "Music",
    artist: "Sunidhi Chauhan",
    location: "Jio World Garden, Mumbai",
    date: new Date("2026-11-29T19:00:00Z"),
    price: 1299,
    totalSeats: 550,
    availableSeats: 430,
    status: "upcoming",
    image: "/artists/sunidhi-chauhan.jpg",
    description:
      "Witness the powerhouse performer Sunidhi Chauhan live in a high-octane 2.5 hour spectacle with unmatched vocal range and dazzling stage production.",
  },
  {
    title: "Jasleen Royal - Heeriye Tour 2026",
    category: "Music",
    artist: "Jasleen Royal",
    location: "Birla Auditorium, Jaipur",
    date: new Date("2026-12-05T19:30:00Z"),
    price: 999,
    totalSeats: 350,
    availableSeats: 290,
    status: "upcoming",
    image: "/artists/jasleen-royal.jpg",
    description:
      "An intimate acoustic musical evening featuring chart-topping anthems like Heeriye, Din Shagna Da, and soulful folk melodies.",
  },
  {
    title: "Harsh Gujral - Jo Bolta Hai Wohi Hota Hai",
    category: "Comedy",
    artist: "Harsh Gujral",
    location: "Kala Academy, Goa",
    date: new Date("2026-12-12T20:00:00Z"),
    price: 699,
    totalSeats: 350,
    availableSeats: 280,
    status: "upcoming",
    image: "/artists/harsh-gujral.jpg",
    description:
      "Get ready for tears of laughter with Harsh Gujral's unmatched crowd banter and relatable observational humor in this blockbuster comedy special.",
  },
  {
    title: "Anoushka Shankar - Classical Sitar & Symphony",
    category: "Theatre",
    artist: "Anoushka Shankar",
    location: "Science City Auditorium, Kolkata",
    date: new Date("2026-12-18T19:00:00Z"),
    price: 1199,
    totalSeats: 400,
    availableSeats: 340,
    status: "upcoming",
    image: "/artists/anoushka-shankar.jpg",
    description:
      "Nine-time Grammy nominee Anoushka Shankar presents a sublime blend of Indian classical ragas and contemporary orchestral symphony.",
  },
  {
    title: "Prateek Kuhad - Silhouettes Acoustic Tour",
    category: "Music",
    artist: "Prateek Kuhad",
    location: "Royal Opera House, Mumbai",
    date: new Date("2027-01-08T19:30:00Z"),
    price: 1399,
    totalSeats: 300,
    availableSeats: 240,
    status: "upcoming",
    image: "/artists/prateek-kuhad.jpg",
    description:
      "Soul-stirring poetry, acoustic guitar strums, and intimate melodies by international indie sensation Prateek Kuhad.",
  },
  {
    title: "Mughal-E-Azam The Musical",
    category: "Theatre",
    artist: "Mughal-E-Azam The Musical",
    location: "Bal Gandharva Rang Mandir, Pune",
    date: new Date("2027-01-16T18:30:00Z"),
    price: 1599,
    totalSeats: 500,
    availableSeats: 410,
    status: "upcoming",
    image: "/artists/mughal-e-azam.jpg",
    description:
      "Directed by Feroz Abbas Khan with Manish Malhotra costumes, featuring 350+ live dancers, authentic Kathak recitals, and mesmerizing live singing.",
  },
];

async function seed() {
  try {
    await connectDB();

    // Prefer the admin account as the event organizer
    let organizer = await User.findOne({
      $or: [{ email: process.env.ADMIN_EMAIL }, { role: "admin" }, { role: "organizer" }],
    });

    if (!organizer) {
      organizer = await User.create({
        name: process.env.ADMIN_NAME || "Event Hive Admin",
        email: process.env.ADMIN_EMAIL || "admin@eventhive.in",
        password: process.env.ADMIN_PASSWORD || "AdminPassword123!",
        role: "admin",
        isActive: true,
      });
    }


    console.log(`Using organizer/admin: ${organizer.name} (${organizer.email} - ${organizer._id})`);

    // Clean up existing events to avoid duplicates and ensure clean sync
    await Event.deleteMany({});
    console.log("Cleared existing events collection.");

    const toInsert = homeEvents.map((evt) => ({
      ...evt,
      organizer: organizer._id,
    }));

    const inserted = await Event.insertMany(toInsert);
    console.log(`Successfully seeded ${inserted.length} exact home/frontend events into MongoDB Atlas!`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
