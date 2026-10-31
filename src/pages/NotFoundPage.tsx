import { Link } from "react-router-dom";
import { Eyebrow } from "../components/Eyebrow";

export function NotFoundPage() {
  return (
    <main className="page-main site-container site-container--narrow">
      <section className="page-heading">
        <Eyebrow>404 · Sidan hittades inte</Eyebrow>
        <h1>Här var det tomt.</h1>
        <p>Adressen verkar inte leda någonstans.</p>
        <Link className="text-link" to="/">Till startsidan</Link>
      </section>
    </main>
  );
}
