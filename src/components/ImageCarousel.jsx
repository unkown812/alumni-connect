import "./imageCarousel.css";

// Import images from src/assets
import campus1 from "../assets/vpm-campus-1.jpg";
import campus2 from "../assets/vpm-campus-2.jpg";
import alumniEvent from "../assets/vpm-alumni-event-1.jpg";
import convocation from "../assets/vpm-convocation-1.jpg";
import robotics from "../assets/vpm-labs-robotics.jpg";
import workshop from "../assets/vpm-workshop-automation.jpg";
import meetup from "../assets/vpm-industry-meetup.jpg";

const slides = [
  { src: campus1, caption: "Campus View" },
  { src: campus2, caption: "Main Building" },
  { src: alumniEvent, caption: "Alumni Meet" },
  { src: convocation, caption: "Convocation" },
  { src: robotics, caption: "Robotics Lab" },
  { src: workshop, caption: "Automation Workshop" },
  { src: meetup, caption: "Industry Meetup" },
];

export default function ImageCarousel() {
  return (
    <section className="carousel">
      <div className="carousel-header">
        <h3>📸 Highlights</h3>
      </div>
      <div className="carousel-track">
        {slides.map((s, i) => (
          <figure className="card" key={i}>
            <img src={s.src} alt={s.caption} loading="lazy" />
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}