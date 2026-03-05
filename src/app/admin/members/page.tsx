"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Loader,
  Users,
  AlertCircle,
} from "lucide-react";

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  email?: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: string;
  gender: string;
  membershipDate: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [searchTerm, filterStatus, members]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/members");

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers(data);
      setFilteredMembers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = members;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.phoneNumber.includes(searchTerm) ||
          member.email?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((member) =>
        filterStatus === "active" ? member.isActive : !member.isActive,
      );
    }

    setFilteredMembers(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await fetch(`/api/members/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      // Remove from local state
      setMembers(members.filter((m) => m._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete member");
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
          <p className="text-brand-dark-light">Loading members...</p>
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
            Error Loading Members
          </h2>
          <p className="text-brand-dark-light mb-4">{error}</p>
          <button
            onClick={fetchMembers}
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
            Members
          </h1>
          <p className="text-brand-dark-light mt-1">
            Manage your church members ({filteredMembers.length} total)
          </p>
        </div>
        <Link
          href="/admin/members/add"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
        >
          <UserPlus size={20} />
          Add New Member
        </Link>
      </div>

      {/* Statistics Cards */}
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
                Active Members
              </p>
              <h3 className="text-3xl font-black text-brand-accent mt-2">
                {members.filter((m) => m.isActive).length}
              </h3>
            </div>
            <Users className="text-brand-accent" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-secondary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                This Month
              </p>
              <h3 className="text-3xl font-black text-brand-secondary mt-2">
                {
                  members.filter((m) => {
                    const memberDate = new Date(m.membershipDate);
                    const now = new Date();
                    return (
                      memberDate.getMonth() === now.getMonth() &&
                      memberDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                }
              </h3>
            </div>
            <Users className="text-brand-secondary" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark-light"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-brand-sky rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`flex-1 px-4 py-3 font-bold rounded-lg transition-colors ${
                filterStatus === "all"
                  ? "bg-brand-primary text-white"
                  : "bg-brand-sky text-brand-dark hover:bg-brand-primary/10"
              }`}
            >
              All ({members.length})
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`flex-1 px-4 py-3 font-bold rounded-lg transition-colors ${
                filterStatus === "active"
                  ? "bg-brand-accent text-white"
                  : "bg-brand-sky text-brand-dark hover:bg-brand-accent/10"
              }`}
            >
              Active ({members.filter((m) => m.isActive).length})
            </button>
            <button
              onClick={() => setFilterStatus("inactive")}
              className={`flex-1 px-4 py-3 font-bold rounded-lg transition-colors ${
                filterStatus === "inactive"
                  ? "bg-red-600 text-white"
                  : "bg-brand-sky text-brand-dark hover:bg-red-50"
              }`}
            >
              Inactive ({members.filter((m) => !m.isActive).length})
            </button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto mb-4 text-brand-dark-light" size={48} />
            <p className="text-brand-dark-light text-lg">No members found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-brand-primary font-medium hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-brand-sky">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-primary">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-primary">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-primary">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-primary">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-brand-primary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-sky">
                {filteredMembers.map((member) => (
                  <tr
                    key={member._id}
                    className="hover:bg-brand-light transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center font-bold text-brand-primary text-sm">
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-brand-dark">
                            {member.firstName} {member.lastName}
                          </div>
                          {member.otherName && (
                            <div className="text-xs text-brand-dark-light">
                              {member.otherName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-brand-dark-light">
                          <Phone size={14} />
                          {member.phoneNumber}
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-2 text-brand-dark-light">
                            <Mail size={14} />
                            {member.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-dark-light">
                      {new Date(member.membershipDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          member.isActive
                            ? "bg-brand-accent/10 text-brand-accent"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/members/${member._id}`}
                          className="p-2 text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id)}
                          disabled={deleteLoading === member._id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deleteLoading === member._id ? (
                            <Loader className="animate-spin" size={18} />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
