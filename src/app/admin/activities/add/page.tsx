"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AddActivityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    activityDate: "",
    activityTime: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create activity");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/activities");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/activities"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-bold mb-4 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Activities
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white" size={28} />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-black text-brand-primary">
              Create New Activity
            </h1>
            <p className="text-brand-dark-light">
              Schedule events and send automated reminders to all members
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-5 bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border-l-4 border-brand-accent rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-brand-accent flex-shrink-0" size={24} />
          <div>
            <p className="text-brand-accent font-bold text-lg">
              Activity Created Successfully!
            </p>
            <p className="text-brand-accent/80 text-sm">
              Reminders will be sent automatically 1 day before the event
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3 animate-fade-in">
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <div>
            <p className="text-red-600 font-bold">Error Creating Activity</p>
            <p className="text-red-600/80 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="mb-6 p-5 bg-gradient-to-r from-brand-secondary/10 to-brand-secondary/5 border-l-4 border-brand-secondary rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-brand-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="text-brand-secondary" size={18} />
          </div>
          <div>
            <h3 className="font-bold text-brand-dark mb-1">
              Automated SMS Reminders
            </h3>
            <p className="text-sm text-brand-dark-light leading-relaxed">
              All active members will automatically receive an SMS reminder{" "}
              <span className="font-bold text-brand-secondary">
                1 day before the event
              </span>{" "}
              during afternoon hours. Activities will be automatically removed
              from the system after they&apos;ve passed.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 border border-brand-sky/50"
      >
        {/* Activity Name/Theme Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-brand-sky">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="text-brand-primary" size={20} />
            </div>
            <h2 className="font-heading text-xl font-black text-brand-primary">
              Event Details
            </h2>
          </div>

          <div className="space-y-6">
            {/* Activity Title */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Event Name / Theme *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors text-lg font-medium"
                placeholder="e.g., Youth Conference 2024, Prayer Night, Easter Celebration"
              />
              <p className="text-xs text-brand-dark-light mt-2">
                Give your event a catchy, descriptive name
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3.5 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors resize-none"
                placeholder="Describe what the event is about, what to expect, and any special instructions..."
              />
              <p className="text-xs text-brand-dark-light mt-2">
                This will be included in the SMS reminder to members
              </p>
            </div>
          </div>
        </div>

        {/* Date & Time Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-brand-sky">
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <Calendar className="text-brand-secondary" size={20} />
            </div>
            <h2 className="font-heading text-xl font-black text-brand-primary">
              Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Date */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-brand-secondary" />
                Event Date *
              </label>
              <input
                type="date"
                name="activityDate"
                value={formData.activityDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3.5 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors font-medium"
              />
              <p className="text-xs text-brand-dark-light mt-2">
                Must be a future date
              </p>
            </div>

            {/* Activity Time */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2 flex items-center gap-2">
                <Clock size={16} className="text-brand-secondary" />
                Event Time *
              </label>
              <input
                type="time"
                name="activityTime"
                value={formData.activityTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors font-medium"
              />
              <p className="text-xs text-brand-dark-light mt-2">
                Select the start time
              </p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-brand-sky">
            <div className="w-10 h-10 bg-brand-accent/10 rounded-lg flex items-center justify-center">
              <MapPin className="text-brand-accent" size={20} />
            </div>
            <h2 className="font-heading text-xl font-black text-brand-primary">
              Location
            </h2>
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-dark mb-2">
              Venue / Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
              placeholder="e.g., Main Church Auditorium, Youth Center, Zoom Meeting"
            />
            <p className="text-xs text-brand-dark-light mt-2">
              Where will this event take place?
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t-2 border-brand-sky">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-primary to-brand-primary-dark text-white font-black rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={22} />
                <span>Creating Activity...</span>
              </>
            ) : (
              <>
                <Sparkles size={22} />
                <span>Create Activity</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-4 border-2 border-brand-primary text-brand-primary font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 p-4 bg-brand-light rounded-lg">
          <p className="text-sm text-brand-dark-light text-center">
            💡 <span className="font-bold">Pro Tip:</span> Members will receive
            SMS reminders automatically at 2:00 PM the day before the event
          </p>
        </div>
      </form>
    </div>
  );
}
