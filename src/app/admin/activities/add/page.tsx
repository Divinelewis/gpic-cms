"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddActivity() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [activityDate, setActivityDate] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/activities", {
      method: "POST",
      body: JSON.stringify({ title, activityDate }),
    });

    router.push("/admin/activities");
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl uppercase tracking-widest mb-8 font-light">
        Add Activity
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Activity Title"
          required
          className="w-full p-3 bg-neutral-900 rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          required
          className="w-full p-3 bg-neutral-900 rounded-lg"
          onChange={(e) => setActivityDate(e.target.value)}
        />

        <button className="bg-white text-black px-6 py-3 rounded-lg uppercase tracking-widest text-sm">
          Save Activity
        </button>
      </form>
    </div>
  );
}
