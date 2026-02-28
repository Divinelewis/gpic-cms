"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMember() {
  const router = useRouter();
  const [form, setForm] = useState({
    serialNumber: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/members", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/admin/members");
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl uppercase tracking-widest mb-8 font-light">
        Register Member
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            required={key !== "email"}
            className="w-full p-3 bg-neutral-900 rounded-lg"
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}

        <button className="bg-white text-black px-6 py-3 rounded-lg uppercase tracking-widest text-sm">
          Save Member
        </button>
      </form>
    </div>
  );
}
