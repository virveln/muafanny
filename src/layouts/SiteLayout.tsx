import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollToTop } from "../components/features/ScrollToTop";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";

export function SiteLayout() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const [pageAnnouncement, setPageAnnouncement] = useState("");

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    document.getElementById("main-content")?.focus({ preventScroll: true });
    setPageAnnouncement(document.title);
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Hoppa till huvudinnehåll
      </a>
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {pageAnnouncement}
      </div>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
