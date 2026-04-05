import { Metadata } from "next";
import MinistriesLive from "./MinistriesLive";

export const metadata: Metadata = {
  title: "Our Ministries",
  description:
    "Explore the various worship centres of Gospel Power International Church. Discover where you belong and get involved in impactful service and spiritual growth.",
};

export default function AboutPage() {
  return <MinistriesLive />;
}
