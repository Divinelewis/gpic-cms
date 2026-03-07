"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Loader,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
} from "lucide-react";

interface AttendanceRecord {
  _id: string;
  date: string;
  serviceType: string;
  totalMen: number;
  totalWomen: number;
  totalYouths: number;
  totalChildren: number;
  totalPeoplePresent: number;
  totalPresent: number;
  totalAbsent: number;
  recordedBy: string;
  createdAt: string;
  attendees: Array<{
    memberId: {
      firstName: string;
      lastName: string;
      serialNumber: string;
    };
  }>;
}

export default function AttendanceHistoryPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/attendance?limit=50");
      if (!response.ok) throw new Error("Failed to fetch history");

      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this attendance record? This cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete record");

      // Remove from list
      setRecords(records.filter((r) => r._id !== id));
      alert("Attendance record deleted successfully");
    } catch (error) {
      alert("Failed to delete record. Please try again.");
    } finally {
      setDeletingId(null);
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
      {/* Header */}
      <div>
        <Link
          href="/admin/attendance"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-bold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Attendance
        </Link>

        <h1 className="font-heading text-3xl font-black text-brand-primary">
          Attendance History
        </h1>
        <p className="text-brand-dark-light mt-1">
          View and manage past attendance records ({records.length} total)
        </p>
      </div>

      {/* Records List */}
      {records.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calendar className="mx-auto mb-4 text-brand-dark-light" size={64} />
          <h3 className="font-heading text-xl font-black text-brand-dark mb-2">
            No Records Yet
          </h3>
          <p className="text-brand-dark-light">
            Start marking attendance to see history here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => {
            const isExpanded = expandedId === record._id;
            const recordDate = new Date(record.date);

            return (
              <div
                key={record._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-transparent hover:border-brand-primary transition-colors"
              >
                {/* Summary */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-bold text-brand-dark text-lg">
                          {recordDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </h3>
                        <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm font-bold rounded">
                          {record.serviceType}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-brand-dark-light">Total</p>
                          <p className="font-bold text-brand-primary text-xl">
                            {record.totalPeoplePresent}
                          </p>
                        </div>
                        <div>
                          <p className="text-brand-dark-light">Men</p>
                          <p className="font-bold text-lg">{record.totalMen}</p>
                        </div>
                        <div>
                          <p className="text-brand-dark-light">Women</p>
                          <p className="font-bold text-lg">
                            {record.totalWomen}
                          </p>
                        </div>
                        <div>
                          <p className="text-brand-dark-light">Youths</p>
                          <p className="font-bold text-lg">
                            {record.totalYouths}
                          </p>
                        </div>
                        <div>
                          <p className="text-brand-dark-light">Children</p>
                          <p className="font-bold text-lg">
                            {record.totalChildren}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/admin/attendance/edit/${record._id}`}
                        className="p-2 text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </Link>

                      <button
                        onClick={() => handleDelete(record._id)}
                        disabled={deletingId === record._id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === record._id ? (
                          <Loader className="animate-spin" size={20} />
                        ) : (
                          <Trash2 size={20} />
                        )}
                      </button>

                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : record._id)
                        }
                        className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-brand-sky">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Registered Members */}
                        <div>
                          <h4 className="font-bold text-brand-dark mb-3">
                            Registered Members ({record.totalPresent} Present)
                          </h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {record.attendees.length === 0 ? (
                              <p className="text-sm text-brand-dark-light italic">
                                No registered members marked present
                              </p>
                            ) : (
                              record.attendees.map((attendee, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 p-2 bg-brand-light rounded"
                                >
                                  <div className="w-6 h-6 bg-brand-accent/20 rounded-full flex items-center justify-center text-xs font-bold text-brand-accent">
                                    {attendee.memberId.firstName[0]}
                                    {attendee.memberId.lastName[0]}
                                  </div>
                                  <span className="text-sm">
                                    {attendee.memberId.firstName}{" "}
                                    {attendee.memberId.lastName}
                                  </span>
                                  {attendee.memberId.serialNumber && (
                                    <span className="text-xs text-brand-dark-light">
                                      ({attendee.memberId.serialNumber})
                                    </span>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Metadata */}
                        <div>
                          <h4 className="font-bold text-brand-dark mb-3">
                            Record Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-brand-light rounded">
                              <span className="text-brand-dark-light">
                                Recorded By:
                              </span>
                              <span className="font-bold">
                                {record.recordedBy}
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-brand-light rounded">
                              <span className="text-brand-dark-light">
                                Registered Absent:
                              </span>
                              <span className="font-bold text-red-600">
                                {record.totalAbsent}
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-brand-light rounded">
                              <span className="text-brand-dark-light">
                                Recorded On:
                              </span>
                              <span className="font-bold">
                                {new Date(record.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
