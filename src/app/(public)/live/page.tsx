import { Metadata } from "next";
import LiveClient from "./LiveClient";

export const metadata: Metadata = {
  title: "Live Stream",
  description:
    "Join Gospel Power International Church live services online. Experience powerful worship, teachings, and the presence of God from anywhere in the world.",
};

export default function AboutPage() {
  return <LiveClient />;
}
