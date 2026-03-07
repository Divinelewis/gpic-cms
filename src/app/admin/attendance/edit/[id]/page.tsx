"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader,
  CheckCircle,
  AlertCircle,
  Search,
  UserCheck,
  UserX,
} from "lucide-react";

interface Member {
  _id: string;
  serialNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
}

export default function EditAttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const recordId = unwrappedParams.id;
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    serviceType: "Sunday First Service",
    totalMen: 0,
    totalWomen: 0,
    totalYouths: 0,
    totalChildren: 0,
  });

  const totalPeoplePresent =
    formData.totalMen +
    formData.totalWomen +
    formData.totalYouths +
    formData.totalChildren;

  useEffect(() => {
    fetchData();
  }, [recordId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch attendance record
      const recordResponse = await fetch(`/api/attendance/${recordId}`);
      if (!recordResponse.ok) throw new Error("Failed to fetch record");

      const record = await recordResponse.json();

      setFormData({
        date: new Date(record.date).toISOString().split("T")[0],
        serviceType: record.serviceType,
        totalMen: record.totalMen || 0,
        totalWomen: record.totalWomen || 0,
        totalYouths: record.totalYouths || 0,
        totalChildren: record.totalChildren || 0,
      });

      // Set selected members
      const attendeeIds = record.attendees.map((a: any) => a.memberId._id);
      setSelectedMembers(new Set(attendeeIds));

      // Fetch all members
      const membersResponse = await fetch("/api/members");
      if (!membersResponse.ok) throw new Error("Failed to fetch members");

      const allMembers = await membersResponse.json();
      setMembers(allMembers.filter((m: Member) => m.isActive));
    } catch (err: any) {
      setError(err.message || "Failed to load data");
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

    if (totalPeoplePresent === 0) {
      alert("Please enter attendance count for at least one category");
      return;
    }

    if (totalPeoplePresent < selectedMembers.size) {
      alert(
        `Total people present (${totalPeoplePresent}) cannot be less than registered members checked (${selectedMembers.size})`,
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/attendance/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          serviceType: formData.serviceType,
          totalMen: formData.totalMen,
          totalWomen: formData.totalWomen,
          totalYouths: formData.totalYouths,
          totalChildren: formData.totalChildren,
          totalPeoplePresent: totalPeoplePresent,
          attendeeIds: Array.from(selectedMembers),
        }),
      });

      if (!response.ok) throw new Error("Failed to update attendance");

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/attendance/history");
      }, 1500);
    } catch (error) {
      alert("Failed to update attendance. Please try again.");
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

  const registeredPresent = selectedMembers.size;
  const registeredAbsent = members.length - selectedMembers.size;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="font-heading text-2xl font-black text-brand-dark mb-2">
            Error Loading Record
          </h2>
          <p className="text-brand-dark-light mb-4">{error}</p>
          <Link
            href="/admin/attendance/history"
            className="inline-block px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/attendance/history"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-bold mb-4"
        >
          <ArrowLeft size={20} />
          Back to History
        </Link>

        <h1 className="font-heading text-3xl font-black text-brand-primary">
          Edit Attendance Record
        </h1>
        <p className="text-brand-dark-light mt-1">
          Update attendance information
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-brand-accent/10 border border-brand-accent rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-brand-accent" size={24} />
          <p className="text-brand-accent font-bold">
            Attendance updated successfully! Redirecting...
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Registered Present
              </p>
              <h3 className="text-3xl font-black text-brand-accent mt-2">
                {registeredPresent}
              </h3>
            </div>
            <UserCheck className="text-brand-accent" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Registered Absent
              </p>
              <h3 className="text-3xl font-black text-red-600 mt-2">
                {registeredAbsent}
              </h3>
            </div>
            <UserX className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6 pb-3 border-b-2 border-brand-sky">
            Service Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Demographic Breakdown */}
        <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl shadow-sm p-6 border-2 border-brand-primary">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6">
            Attendance Breakdown by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-brand-sky">
              <label className="block text-sm font-bold text-brand-dark mb-2">
                👨 Men
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalMen}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalMen: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary text-xl font-bold text-brand-primary text-center"
              />
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-brand-sky">
              <label className="block text-sm font-bold text-brand-dark mb-2">
                👩 Women
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalWomen}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalWomen: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary text-xl font-bold text-brand-primary text-center"
              />
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-brand-sky">
              <label className="block text-sm font-bold text-brand-dark mb-2">
                🧑 Youths
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalYouths}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalYouths: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary text-xl font-bold text-brand-primary text-center"
              />
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-brand-sky">
              <label className="block text-sm font-bold text-brand-dark mb-2">
                👶 Children
              </label>
              <input
                type="number"
                min="0"
                value={formData.totalChildren}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalChildren: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary text-xl font-bold text-brand-primary text-center"
              />
            </div>
          </div>

          <div className="mt-6 p-6 bg-brand-primary rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">
                  TOTAL ATTENDANCE
                </p>
                <h3 className="text-4xl font-black mt-1">
                  {totalPeoplePresent}
                </h3>
              </div>
              <div className="text-right text-sm opacity-90">
                <p>Men: {formData.totalMen}</p>
                <p>Women: {formData.totalWomen}</p>
                <p>Youths: {formData.totalYouths}</p>
                <p>Children: {formData.totalChildren}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Members */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-4 pb-3 border-b-2 border-brand-sky">
            Mark Registered Members
          </h2>

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

          <div className="border-2 border-brand-sky rounded-lg p-4 max-h-96 overflow-y-auto">
            {filteredMembers.map((member) => {
              const isSelected = selectedMembers.has(member._id);

              return (
                <label
                  key={member._id}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors mb-2 ${
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
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving || totalPeoplePresent === 0}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader className="animate-spin" size={20} />
                Updating...
              </>
            ) : (
              <>
                <Save size={20} />
                Update Attendance
              </>
            )}
          </button>

          <Link
            href="/admin/attendance/history"
            className="px-6 py-4 border-2 border-brand-primary text-brand-primary font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-colors text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
