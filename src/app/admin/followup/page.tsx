"use client";

import { useState, useEffect } from "react";
import { Loader, AlertCircle, Phone, CheckCircle, Clock } from "lucide-react";

interface Followup {
  _id: string;
  memberId: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    serialNumber: string;
  };
  consecutiveAbsences: number;
  lastAttendedDate?: string;
  followupStatus: string;
  followupSmsSent: boolean;
  followupSmsSentDate?: string;
  notes?: string;
  createdAt: string;
}

export default function FollowupPage() {
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFollowups();
  }, []);

  const fetchFollowups = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/followup");
      if (!response.ok) throw new Error("Failed to fetch follow-ups");

      const data = await response.json();
      setFollowups(data);
    } catch (error) {
      console.error("Error fetching follow-ups:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (followupId: string, status: string) => {
    try {
      setUpdatingId(followupId);

      const response = await fetch("/api/followup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followupId, status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      await fetchFollowups();
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-black text-brand-primary">
          Member Follow-up
        </h1>
        <p className="text-brand-dark-light mt-1">
          Members who missed 2+ consecutive services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Total Follow-ups
              </p>
              <h3 className="text-3xl font-black text-red-600 mt-2">
                {followups.length}
              </h3>
            </div>
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Pending
              </p>
              <h3 className="text-3xl font-black text-yellow-600 mt-2">
                {followups.filter((f) => f.followupStatus === "pending").length}
              </h3>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Contacted
              </p>
              <h3 className="text-3xl font-black text-brand-accent mt-2">
                {
                  followups.filter((f) => f.followupStatus === "contacted")
                    .length
                }
              </h3>
            </div>
            <CheckCircle className="text-brand-accent" size={24} />
          </div>
        </div>
      </div>

      {followups.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <CheckCircle className="mx-auto mb-4 text-brand-accent" size={64} />
          <h3 className="font-heading text-xl font-black text-brand-dark mb-2">
            No Follow-ups Needed!
          </h3>
          <p className="text-brand-dark-light">
            All members are attending regularly. Great job!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {followups.map((followup) => (
            <div
              key={followup._id}
              className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-brand-dark text-lg">
                      {followup.memberId.firstName} {followup.memberId.lastName}
                    </h3>
                    {followup.memberId.serialNumber && (
                      <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded">
                        {followup.memberId.serialNumber}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-brand-dark-light">
                      <Phone size={14} />
                      {followup.memberId.phoneNumber}
                    </div>

                    <div className="flex items-center gap-2">
                      <AlertCircle size={14} className="text-red-600" />
                      <span className="text-red-600 font-bold">
                        {followup.consecutiveAbsences} consecutive absences
                      </span>
                    </div>

                    {followup.followupSmsSent &&
                      followup.followupSmsSentDate && (
                        <div className="flex items-center gap-2 text-brand-accent">
                          <CheckCircle size={14} />
                          <span>
                            SMS sent on{" "}
                            {new Date(
                              followup.followupSmsSentDate,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={followup.followupStatus}
                    onChange={(e) => updateStatus(followup._id, e.target.value)}
                    disabled={updatingId === followup._id}
                    className="px-4 py-2 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary font-bold"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <a
                    href={`tel:${followup.memberId.phoneNumber}`}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-lg hover:bg-brand-accent-dark transition-colors font-bold"
                  >
                    <Phone size={16} />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
