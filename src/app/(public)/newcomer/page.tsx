import { Metadata } from "next";
import NewcomerClient from "./NewcomerClient";

export const metadata: Metadata = {
  title: "New Here?",
  description:
    "Welcome to Gospel Power International Church. Get started as a new member, learn what to expect, and take your first step into our community.",
};

export default function AboutPage() {
  return <NewcomerClient />;
}
