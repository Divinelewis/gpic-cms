"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Loader,
  TrendingUp,
  Save,
  Search,
} from "lucide-react";

interface Member {
  _id: string;
  serialNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
}

export default function AttendancePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    serviceType: "Sunday First Service",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/members");
      if (!response.ok) throw new Error("Failed to fetch members");

      const data = await response.json();
      setMembers(data.filter((m: Member) => m.isActive));
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (memberId: string) => {
    const newSelected = new Set(selectedMembers);
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId);
    } else {
      newSelected.add(memberId);
    }
    setSelectedMembers(newSelected);
  };

  const toggleAll = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map((m) => m._id)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          serviceType: formData.serviceType,
          attendeeIds: Array.from(selectedMembers),
          recordedBy: "Admin User",
        }),
      });

      if (!response.ok) throw new Error("Failed to save attendance");

      setSuccess(true);
      setSelectedMembers(new Set());

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save attendance. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const presentCount = selectedMembers.size;
  const absentCount = members.length - selectedMembers.size;

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-black text-brand-primary">
            Mark Attendance
          </h1>
          <p className="text-brand-dark-light mt-1">
            Record who attended service today
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/attendance/history"
            className="px-6 py-3 border-2 border-brand-primary text-brand-primary font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-colors"
          >
            View History
          </Link>
          <Link
            href="/admin/attendance/stats"
            className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white font-bold rounded-lg hover:bg-brand-accent-dark transition-colors"
          >
            <TrendingUp size={20} />
            Statistics
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-brand-accent/10 border border-brand-accent rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-brand-accent" size={24} />
          <p className="text-brand-accent font-bold">
            Attendance saved successfully! Follow-up messages sent to absent
            members.
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-primary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Total Members
              </p>
              <h3 className="text-3xl font-black text-brand-primary mt-2">
                {members.length}
              </h3>
            </div>
            <Users className="text-brand-primary" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Present
              </p>
              <h3 className="text-3xl font-black text-brand-accent mt-2">
                {presentCount}
              </h3>
            </div>
            <CheckCircle className="text-brand-accent" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Absent
              </p>
              <h3 className="text-3xl font-black text-red-600 mt-2">
                {absentCount}
              </h3>
            </div>
            <XCircle className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        {/* Date & Service Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-brand-dark mb-2">
              Service Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-dark mb-2">
              Service Type *
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) =>
                setFormData({ ...formData, serviceType: e.target.value })
              }
              required
              className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary"
            >
              <option value="Sunday First Service">
                Sunday First Service (8:00 AM)
              </option>
              <option value="Sunday Second Service">
                Sunday Second Service (10:30 AM)
              </option>
              <option value="Wednesday">Wednesday Bible Study</option>
              <option value="Friday">Friday Prayer Night</option>
              <option value="Special Event">Special Event</option>
            </select>
          </div>
        </div>

        {/* Search & Select All */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark-light"
              size={20}
            />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="px-6 py-3 border-2 border-brand-primary text-brand-primary font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-colors"
          >
            {selectedMembers.size === filteredMembers.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>

        {/* Members List */}
        <div className="border-2 border-brand-sky rounded-lg p-4 max-h-96 overflow-y-auto mb-6">
          {filteredMembers.length === 0 ? (
            <p className="text-center text-brand-dark-light py-8">
              No members found
            </p>
          ) : (
            <div className="space-y-2">
              {filteredMembers.map((member) => {
                const isSelected = selectedMembers.has(member._id);

                return (
                  <label
                    key={member._id}
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-brand-accent/10 border-2 border-brand-accent"
                        : "bg-brand-light hover:bg-brand-sky border-2 border-transparent"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMember(member._id)}
                      className="w-5 h-5 text-brand-accent focus:ring-brand-accent border-brand-sky rounded"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-brand-dark">
                          {member.firstName} {member.lastName}
                        </span>
                        {member.serialNumber && (
                          <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded">
                            {member.serialNumber}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-brand-dark-light">
                        {member.phoneNumber}
                      </p>
                    </div>

                    {isSelected && (
                      <CheckCircle className="text-brand-accent" size={24} />
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving || selectedMembers.size === 0}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader className="animate-spin" size={20} />
              Saving Attendance...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Attendance ({presentCount} Present, {absentCount} Absent)
            </>
          )}
        </button>
      </form>
    </div>
  );
}
