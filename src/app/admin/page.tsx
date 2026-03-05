"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  TrendingUp,
  Calendar,
  ChevronRight,
  UserPlus,
  Loader,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  newThisMonth: number;
  memberGrowth: number;
  recentMembers: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    membershipDate: string;
  }>;
  monthlyGrowth: Array<{
    month: string;
    count: number;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics");
      }

      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
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
          <p className="text-brand-dark-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
          <h2 className="font-heading text-2xl font-black text-brand-dark mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-brand-dark-light mb-4">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-black text-brand-primary">
            Dashboard
          </h1>
          <p className="text-brand-dark-light mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/members/add"
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors font-bold"
          >
            <UserPlus size={18} />
            Add Member
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Members */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-primary hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Total Members
              </p>
              <h3 className="text-3xl font-black text-brand-primary mt-2">
                {stats.totalMembers}
              </h3>
            </div>
            <div className="p-3 bg-brand-primary/10 rounded-lg">
              <Users className="text-brand-primary" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-brand-accent text-sm">
            <TrendingUp size={16} />
            <span className="font-bold">+{stats.memberGrowth}%</span>
            <span className="text-brand-dark-light">this month</span>
          </div>
        </div>

        {/* Active Members */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-accent hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Active Members
              </p>
              <h3 className="text-3xl font-black text-brand-accent mt-2">
                {stats.activeMembers}
              </h3>
            </div>
            <div className="p-3 bg-brand-accent/10 rounded-lg">
              <Activity className="text-brand-accent" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-brand-dark-light">
            <span className="font-bold">
              {stats.totalMembers > 0
                ? Math.round((stats.activeMembers / stats.totalMembers) * 100)
                : 0}
              %
            </span>{" "}
            of total members
          </div>
        </div>

        {/* New This Month */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-secondary hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                New This Month
              </p>
              <h3 className="text-3xl font-black text-brand-secondary mt-2">
                {stats.newThisMonth}
              </h3>
            </div>
            <div className="p-3 bg-brand-secondary/10 rounded-lg">
              <UserPlus className="text-brand-secondary" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-brand-dark-light">
            <span className="font-bold">+{stats.newThisMonth}</span> new
            registrations
          </div>
        </div>

        {/* Inactive Members */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Inactive Members
              </p>
              <h3 className="text-3xl font-black text-red-600 mt-2">
                {stats.inactiveMembers}
              </h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Users className="text-red-600" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-brand-dark-light">
            Needs attention
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-black text-brand-primary">
              Recent Members
            </h2>
            <Link
              href="/admin/members"
              className="text-brand-secondary hover:text-brand-secondary-dark font-bold text-sm flex items-center gap-1"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentMembers.length === 0 ? (
              <div className="text-center py-12 text-brand-dark-light">
                <Users size={48} className="mx-auto mb-3 opacity-30" />
                <p>No recent members</p>
              </div>
            ) : (
              stats.recentMembers.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between p-4 bg-brand-light rounded-lg hover:bg-brand-sky transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-secondary/20 rounded-full flex items-center justify-center font-black text-brand-primary">
                      {member.firstName[0]}
                      {member.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-primary">
                        {member.firstName} {member.lastName}
                      </h3>
                      <p className="text-sm text-brand-dark-light">
                        Joined{" "}
                        {new Date(member.membershipDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/members/${member._id}`}
                    className="text-brand-accent hover:text-brand-accent-dark text-sm font-bold"
                  >
                    View
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Monthly Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-xl font-black text-brand-primary">
              Monthly Growth
            </h2>
          </div>

          <div className="space-y-4">
            {stats.monthlyGrowth.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-brand-dark">
                    {data.month}
                  </span>
                  <span className="text-sm font-bold text-brand-primary">
                    {data.count}
                  </span>
                </div>
                <div className="w-full bg-brand-sky rounded-full h-2">
                  <div
                    className="bg-brand-primary h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalMembers > 0
                          ? (data.count / stats.totalMembers) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl font-black mb-2">
              Quick Actions
            </h2>
            <p className="text-white/80">
              Manage your church community efficiently
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/members/add"
              className="px-6 py-3 bg-white text-brand-primary rounded-lg hover:bg-brand-cream transition-colors font-bold"
            >
              Add Member
            </Link>
            <Link
              href="/admin/activities/add"
              className="px-6 py-3 bg-brand-secondary text-brand-primary rounded-lg hover:bg-brand-secondary-light transition-colors font-bold"
            >
              Create Activity
            </Link>
            <Link
              href="/admin/members"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-bold"
            >
              View All Members
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
