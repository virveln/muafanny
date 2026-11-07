import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../components/features/ScrollToTop";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
