import { Mail, MapPin, type LucideIcon } from "lucide-react";
import { SlSocialInstagram } from "react-icons/sl";

type ContactDetail = {
  icon: LucideIcon | typeof SlSocialInstagram;
  label: string;
  value: string;
  href?: string;
  ariaLabel?: string;
};

export const contactDetails: Record<string, ContactDetail> = {
  email: {
    icon: Mail,
    label: "E-post",
    value: "info@muafanny.se",
    href: "mailto:info@muafanny.se",
    ariaLabel: "Skicka e-post till Fanny Ehrnholm",
  },

  instagram: {
    icon: SlSocialInstagram,
    label: "Instagram",
    value: "@fannyehrnholm",
    href: "https://www.instagram.com/fannyehrnholm",
    ariaLabel: "Följ Fanny Ehrnholm på Instagram",
  },

  location: {
    icon: MapPin,
    label: "Utgår från",
    value: "Stockholm, Kungsholmen",
  },
};