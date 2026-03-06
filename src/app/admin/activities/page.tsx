"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Loader,
  AlertCircle,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface Activity {
  _id: string;
  title: string;
  description: string;
  activityDate: string;
  activityTime: string;
  location: string;
  reminderSent: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/activities");

      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      const data = await response.json();
      setActivities(data);
    } catch (err: any) {
      setError(err.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete activity");
      }

      setActivities(activities.filter((a) => a._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete activity");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader
            className="animate-spin mx-auto mb-4 text-brand-primary"
            size={48}
          />
          <p className="text-brand-dark-light">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="font-heading text-2xl font-black text-brand-dark mb-2">
            Error Loading Activities
          </h2>
          <p className="text-brand-dark-light mb-4">{error}</p>
          <button
            onClick={fetchActivities}
            className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-black text-brand-primary">
            Activities & Events
          </h1>
          <p className="text-brand-dark-light mt-1">
            Manage church activities and send automated reminders
          </p>
        </div>
        <Link
          href="/admin/activities/add"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
        >
          <Plus size={20} />
          Create Activity
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-primary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Total Activities
              </p>
              <h3 className="text-3xl font-black text-brand-primary mt-2">
                {activities.length}
              </h3>
            </div>
            <Calendar className="text-brand-primary" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Upcoming Events
              </p>
              <h3 className="text-3xl font-black text-brand-accent mt-2">
                {
                  activities.filter(
                    (a) => new Date(a.activityDate) >= new Date(),
                  ).length
                }
              </h3>
            </div>
            <Clock className="text-brand-accent" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-secondary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Reminders Sent
              </p>
              <h3 className="text-3xl font-black text-brand-secondary mt-2">
                {activities.filter((a) => a.reminderSent).length}
              </h3>
            </div>
            <CheckCircle className="text-brand-secondary" size={24} />
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      {activities.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="mx-auto mb-4 text-brand-dark-light" size={64} />
          <h3 className="font-heading text-xl font-black text-brand-dark mb-2">
            No Activities Yet
          </h3>
          <p className="text-brand-dark-light mb-6">
            Create your first activity to get started
          </p>
          <Link
            href="/admin/activities/add"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            <Plus size={20} />
            Create Activity
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const isPast = new Date(activity.activityDate) < new Date();
            const activityDate = new Date(activity.activityDate);

            return (
              <div
                key={activity._id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${
                  isPast ? "opacity-60" : ""
                }`}
              >
                <div className="p-6">
                  {/* Title */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-lg font-black text-brand-primary pr-2">
                      {activity.title}
                    </h3>
                    {activity.reminderSent && (
                      <CheckCircle
                        className="text-brand-accent flex-shrink-0"
                        size={20}
                      />
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-brand-dark-light text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  {/* Date & Time */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar
                        className="text-brand-secondary flex-shrink-0"
                        size={16}
                      />
                      <span className="text-brand-dark font-medium">
                        {activityDate.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock
                        className="text-brand-secondary flex-shrink-0"
                        size={16}
                      />
                      <span className="text-brand-dark font-medium">
                        {activity.activityTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin
                        className="text-brand-secondary flex-shrink-0"
                        size={16}
                      />
                      <span className="text-brand-dark font-medium line-clamp-1">
                        {activity.location}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    {isPast ? (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-brand-accent/10 text-brand-accent">
                        Upcoming
                      </span>
                    )}
                    {activity.reminderSent && (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-brand-secondary/10 text-brand-secondary">
                        Reminder Sent
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-brand-sky">
                    <Link
                      href={`/admin/activities/${activity._id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-lg hover:bg-brand-accent hover:text-white transition-colors font-bold text-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(activity._id)}
                      disabled={deleteLoading === activity._id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-bold text-sm disabled:opacity-50"
                    >
                      {deleteLoading === activity._id ? (
                        <Loader className="animate-spin" size={16} />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
