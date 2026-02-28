"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  TrendingUp,
  Calendar,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

interface RecentMember {
  id: string;
  name: string;
  joinedDate: string;
}

interface RecentActivity {
  id: string;
  title: string;
  date: string;
  attendees: number;
}

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  recentActivitiesCount: number;
  newThisMonth: number;
  memberGrowth: number;
  recentMembers: RecentMember[];
  recentActivities: RecentActivity[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call later
    setTimeout(() => {
      setStats({
        totalMembers: 342,
        activeMembers: 298,
        recentActivitiesCount: 12,
        newThisMonth: 18,
        memberGrowth: 5.2,
        recentMembers: [
          {
            id: "1",
            name: "John Mensah",
            joinedDate: "2024-02-20",
          },
          {
            id: "2",
            name: "Grace Osei",
            joinedDate: "2024-02-18",
          },
          {
            id: "3",
            name: "Emmanuel Kofi",
            joinedDate: "2024-02-15",
          },
          {
            id: "4",
            name: "Sarah Ama",
            joinedDate: "2024-02-14",
          },
        ],
        recentActivities: [
          {
            id: "1",
            title: "Sunday Service",
            date: "2024-02-25",
            attendees: 245,
          },
          {
            id: "2",
            title: "Bible Study",
            date: "2024-02-21",
            attendees: 89,
          },
          {
            id: "3",
            title: "Youth Meeting",
            date: "2024-02-20",
            attendees: 56,
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!stats) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">Dashboard</h1>
          <p className="text-brand-dark-light mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/members/add"
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors font-medium"
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
              <h3 className="text-3xl font-bold text-brand-primary mt-2">
                {stats.totalMembers}
              </h3>
            </div>
            <div className="p-3 bg-brand-primary/10 rounded-lg">
              <Users className="text-brand-primary" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-brand-accent text-sm">
            <TrendingUp size={16} />
            <span className="font-medium">+{stats.memberGrowth}%</span>
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
              <h3 className="text-3xl font-bold text-brand-accent mt-2">
                {stats.activeMembers}
              </h3>
            </div>
            <div className="p-3 bg-brand-accent/10 rounded-lg">
              <Activity className="text-brand-accent" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-brand-dark-light">
            <span className="font-medium">
              {Math.round((stats.activeMembers / stats.totalMembers) * 100)}%
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
              <h3 className="text-3xl font-bold text-brand-secondary mt-2">
                {stats.newThisMonth}
              </h3>
            </div>
            <div className="p-3 bg-brand-secondary/10 rounded-lg">
              <UserPlus className="text-brand-secondary" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-brand-dark-light">
            <span className="font-medium">+{stats.newThisMonth}</span> new
            registrations
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-brand-primary-light hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-brand-dark-light text-sm font-medium">
                Activities
              </p>
              <h3 className="text-3xl font-bold text-brand-primary-light mt-2">
                {stats.recentActivitiesCount}
              </h3>
            </div>
            <div className="p-3 bg-brand-primary-light/10 rounded-lg">
              <Calendar className="text-brand-primary-light" size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-brand-dark-light">
            This month&apos;s events
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-primary">
              Recent Members
            </h2>
            <Link
              href="/admin/members"
              className="text-brand-secondary hover:text-brand-secondary-dark font-medium text-sm flex items-center gap-1"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-brand-light rounded-lg hover:bg-brand-sky transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-secondary/20 rounded-full flex items-center justify-center font-bold text-brand-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-primary">
                      {member.name}
                    </h3>
                    <p className="text-sm text-brand-dark-light">
                      Joined {new Date(member.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/members/${member.id}`}
                  className="text-brand-accent hover:text-brand-accent-dark text-sm font-medium"
                >
                  View
                </Link>
              </div>
            ))}
          </div>

          {stats.recentMembers.length === 0 && (
            <div className="text-center py-12 text-brand-dark-light">
              <Users size={48} className="mx-auto mb-3 opacity-30" />
              <p>No recent members</p>
            </div>
          )}
        </div>

        {/* Recent Activities - Takes 1 column */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-primary">
              Recent Activities
            </h2>
            <Link
              href="/admin/activities"
              className="text-brand-secondary hover:text-brand-secondary-dark font-medium text-sm flex items-center gap-1"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 bg-brand-light rounded-lg hover:bg-brand-sky transition-colors"
              >
                <h3 className="font-semibold text-brand-primary mb-1">
                  {activity.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-dark-light">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                  <span className="text-brand-accent font-medium">
                    {activity.attendees} attendees
                  </span>
                </div>
              </div>
            ))}
          </div>

          {stats.recentActivities.length === 0 && (
            <div className="text-center py-12 text-brand-dark-light">
              <Calendar size={48} className="mx-auto mb-3 opacity-30" />
              <p>No recent activities</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
            <p className="text-brand-primary-light">
              Manage your church community efficiently
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/members/add"
              className="px-6 py-3 bg-white text-brand-primary rounded-lg hover:bg-brand-cream transition-colors font-medium"
            >
              Add Member
            </Link>
            <Link
              href="/admin/activities/add"
              className="px-6 py-3 bg-brand-secondary text-brand-primary rounded-lg hover:bg-brand-secondary-light transition-colors font-medium"
            >
              Create Activity
            </Link>
            <Link
              href="/admin/members"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              View All Members
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
