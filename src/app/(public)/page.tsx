import HeroSlider from "@/components/client/HeroSlider";
import WelcomeSection from "@/components/client/WelcomeSection";
import ApostleEphr from "@/components/client/ApostleEphr";
import UpcomingEvents from "@/components/client/UpcomingEvents";
import ImageCarousel from "@/components/client/ImageCarousel";
import Cta from "@/components/client/Cta";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <WelcomeSection />
      <ApostleEphr />
      <UpcomingEvents />
      <ImageCarousel />
      <Cta />
    </>
  );
}
