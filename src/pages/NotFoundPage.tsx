import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import { ArrowRight } from "lucide-react";
import { title } from "../data/title";

export function NotFoundPage() {
  return (
    <>
      <title>{title.notFound}</title>
      <main className="page-main site-container site-container--narrow">
        <section className="page-heading">
          <Eyebrow>404 · Sidan hittades inte</Eyebrow>
          <h1>Här var det tomt.</h1>
          <p>Adressen verkar inte leda någonstans.</p>
          <Link className="text-link" to="/">Till startsidan <ArrowRight size={17} aria-hidden="true" /></Link>
        </section>
      </main>
    </>
  );
}
