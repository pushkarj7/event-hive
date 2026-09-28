import { Link } from "react-router-dom";
import EventInfo from "../components/EventInfo";
import HeroImageGallery from "../components/HeroImageGallery";

function EventDetailsHero({ event }) {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-8">
            {/* back to events */}
            <Link to="/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-primary">
                ← Back to Events
            </Link>
            {/* main hero */}
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
                {/* event info */}
                <EventInfo event={event} />
                {/* image gallery */}
                <HeroImageGallery images={event.images} />
            </div>
        </section>
    );
}
export default EventDetailsHero;