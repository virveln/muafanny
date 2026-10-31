import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/Eyebrow";

import "./AboutPage.css";

import ImgFanny from "../assets/fanny2.jpg";
import ValuesSection from "../components/about/ValuesSection";

export function AboutPage() {
  return (
    <div>
        <main className="page-main site-container site-container--narrow">
        {/* <section className="page-heading">
            <Eyebrow>Bakom penslarna</Eyebrow>
            <h1>Hej, jag är Fanny.</h1>
            <p>Makeupartist med kärlek till detaljer, människor och personliga uttryck.</p>
        </section>
        <section className="about-layout">
            <img src={ImgFanny} alt="Porträtt av Fanny" />
            <div>
            <h2>Du ska fortfarande känna igen dig.</h2>
            <p>För mig börjar en fin makeup med ett samtal. Jag vill förstå vad du tycker om, hur du vill känna dig och vad dagen betyder för dig.</p>
            <p>Sedan bygger vi en look tillsammans, med lyhördhet för både sammanhanget och de små detaljerna som gör den till din.</p>
            <Link className="text-link" to="/kontakt">Berätta om din idé <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
        </section> */}
        <section className="about-layout animation-fade-up">
            <img src={ImgFanny} alt="Porträtt av Fanny" />
            <div className="page-heading">
                <Eyebrow>Makeup artist · Hår stylist · Stockholm & överallt</Eyebrow>
                <h1>Hej, jag är <em>Fanny</em></h1>
                <p>För mig börjar en fin makeup med ett samtal. Jag vill förstå vad du tycker om, hur du vill känna dig och vad dagen betyder för dig.</p>
                <p>Sedan bygger vi en look tillsammans, med lyhördhet för både sammanhanget och de små detaljerna som gör den till din.</p>
                <Link className="text-link" to="/kontakt">Berätta om din idé <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
        </section>
        </main>
        <ValuesSection />
    </div>
  );
}
