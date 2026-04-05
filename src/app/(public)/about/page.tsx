import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Gospel Power International Church, our mission, vision, and global impact.",
};

export default function AboutPage() {
  return <AboutClient />;
}
