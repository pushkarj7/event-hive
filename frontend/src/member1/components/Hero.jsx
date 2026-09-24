import EventInfo from "../components/EventInfo"
import HeroImageGallery from "../components/HeroImageGallery"
function Hero(){
    return(
      <section>
        <button>Back to Home</button>
        <EventInfo />
        <HeroImageGallery />
      </section>
    );
}
export default Hero;