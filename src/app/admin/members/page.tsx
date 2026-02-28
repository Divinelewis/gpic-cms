"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, UserPlus, Edit, Trash2, Phone, Mail } from "lucide-react";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinedDate: string;
  status: "active" | "inactive";
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchMembers = async () => {
    //   const res = await fetch('/api/members');
    //   const data = await res.json();
    //   setMembers(data);
    //   setLoading(false);
    // };
    // fetchMembers();

    // Mock data
    setTimeout(() => {
      setMembers([
        {
          id: "1",
          firstName: "John",
          lastName: "Mensah",
          email: "john.mensah@email.com",
          phone: "+233 24 123 4567",
          joinedDate: "2024-01-15",
          status: "active",
        },
        {
          id: "2",
          firstName: "Grace",
          lastName: "Osei",
          email: "grace.osei@email.com",
          phone: "+233 24 234 5678",
          joinedDate: "2024-02-10",
          status: "active",
        },
        {
          id: "3",
          firstName: "Emmanuel",
          lastName: "Kofi",
          email: "emmanuel.kofi@email.com",
          phone: "+233 24 345 6789",
          joinedDate: "2023-12-05",
          status: "inactive",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">Members</h1>
          <p className="text-brand-dark-light mt-1">
            Manage your church members
          </p>
        </div>
        <Link
          href="/admin/members/add"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors font-medium"
        >
          <UserPlus size={20} />
          Add New Member
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark-light"
            size={20}
          />
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-brand-sky rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-sky">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-brand-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sky">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-brand-light transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center font-bold text-brand-primary text-sm">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-brand-primary">
                          {member.firstName} {member.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-brand-dark-light">
                        <Mail size={14} />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-brand-dark-light">
                        <Phone size={14} />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-dark-light">
                    {new Date(member.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        member.status === "active"
                          ? "bg-brand-accent/10 text-brand-accent"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/members/${member.id}`}
                        className="p-2 text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 text-brand-dark-light">
            <p>No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
