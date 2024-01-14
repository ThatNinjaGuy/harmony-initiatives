import { getFeaturedRooms } from "@/libs/apis";
import FeaturedRoom from "../components/FeaturedRooms/FeaturedRoom";
import Gallery from "../components/Gallery/Gallery";
import HeroSection from "../components/HeroSection/HeroSection";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import PageSearch from "../components/PageSearch/PageSearch";

// Central part of the screen for Homepage
const Home = async () => {
  const featuredRoom = await getFeaturedRooms();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRoom featuredRoom={featuredRoom} />
      <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
