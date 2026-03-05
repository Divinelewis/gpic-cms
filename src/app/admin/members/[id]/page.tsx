"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const memberId = unwrappedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    phoneNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    gender: "MALE",
    membershipDate: "",
    isActive: true,
    notes: "",
  });

  useEffect(() => {
    fetchMember();
  }, [memberId]);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/members/${memberId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch member");
      }

      const data = await response.json();

      // Format dates for input fields
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        otherName: data.otherName || "",
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
        address: data.address || "",
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: data.gender || "MALE",
        membershipDate: data.membershipDate
          ? new Date(data.membershipDate).toISOString().split("T")[0]
          : "",
        isActive: data.isActive ?? true,
        notes: data.notes || "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update member");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/members");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this member? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/members/${memberId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      alert("Member deleted successfully");
      router.push("/admin/members");
    } catch (err: any) {
      alert(err.message || "Failed to delete member");
    } finally {
      setDeleting(false);
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
          <p className="text-brand-dark-light">Loading member...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.firstName) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="font-heading text-2xl font-black text-brand-dark mb-2">
            Error Loading Member
          </h2>
          <p className="text-brand-dark-light mb-4">{error}</p>
          <Link
            href="/admin/members"
            className="inline-block px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/members"
          className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary-dark font-bold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Members
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserPlus className="text-brand-primary" size={32} />
            <div>
              <h1 className="font-heading text-3xl font-black text-brand-primary">
                Edit Member
              </h1>
              <p className="text-brand-dark-light">Update member information</p>
            </div>
          </div>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={20} />
                <span>Delete Member</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-brand-accent/10 border border-brand-accent rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-brand-accent flex-shrink-0" size={20} />
          <p className="text-brand-accent font-medium">
            Member updated successfully! Redirecting...
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-fade-in">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-8"
      >
        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6 pb-3 border-b-2 border-brand-sky">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Doe"
              />
            </div>

            {/* Other Name */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Other Name
              </label>
              <input
                type="text"
                name="otherName"
                value={formData.otherName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="Middle name (optional)"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            {/* Membership Date */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Membership Date *
              </label>
              <input
                type="date"
                name="membershipDate"
                value={formData.membershipDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6 pb-3 border-b-2 border-brand-sky">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="+234 123 456 7890"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-brand-dark mb-2">
                Home Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors resize-none"
                placeholder="Enter full address"
              />
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6 pb-3 border-b-2 border-brand-sky">
            Member Status
          </h2>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 text-brand-accent focus:ring-brand-accent border-brand-sky rounded"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-bold text-brand-dark cursor-pointer"
            >
              Active Member
            </label>
          </div>
          <p className="text-sm text-brand-dark-light mt-2">
            Inactive members will not receive SMS notifications or appear in
            active member counts
          </p>
        </div>

        {/* Additional Information Section */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6 pb-3 border-b-2 border-brand-sky">
            Additional Notes
          </h2>

          <div>
            <label className="block text-sm font-bold text-brand-dark mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors resize-none"
              placeholder="Any additional information about the member..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                <span>Update Member</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="px-6 py-4 border-2 border-brand-primary text-brand-primary font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
