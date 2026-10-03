import { useState } from "react";
import Hero from "../components/Hero";
import EventCategories from "../components/EventCategories";
import TrendingArtists from "../components/TrendingArtists";
import HomeCta from "../components/HomeCta";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Event Categories Section (11 categories with custom 3D icons) */}
      <EventCategories
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) =>
          setSelectedCategory((prev) => (prev === catId ? null : catId))
        }
      />

      {/* 3. Trending Artists Section */}
      <TrendingArtists />

      {/* 4. Call to Action Banner */}
      <HomeCta />
    </>
  );
}

export default Home;
