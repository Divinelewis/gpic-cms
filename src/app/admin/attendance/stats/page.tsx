"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp, Users, ArrowLeft, Loader, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface MonthlyStats {
  month: string;
  totalAttendance: number;
  totalMen: number;
  totalWomen: number;
  totalYouths: number;
  totalChildren: number;
  averageAttendance: number;
  recordCount: number;
}

export default function AttendanceStatsPage() {
  const [currentMonthData, setCurrentMonthData] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<MonthlyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Get current month data (for chart)
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const currentMonthResponse = await fetch(
        `/api/attendance?startDate=${firstDayOfMonth.toISOString()}&endDate=${lastDayOfMonth.toISOString()}&limit=100`,
      );

      if (currentMonthResponse.ok) {
        const currentData = await currentMonthResponse.json();

        // Format for weekly chart
        const weeklyData = currentData.map((record: any) => ({
          date: new Date(record.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          Men: record.totalMen,
          Women: record.totalWomen,
          Youths: record.totalYouths,
          Children: record.totalChildren,
          Total: record.totalPeoplePresent,
        }));

        setCurrentMonthData(weeklyData);
      }

      // Get 12-month summary
      const monthlyStats: MonthlyStats[] = [];

      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);

        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const response = await fetch(
          `/api/attendance?startDate=${monthStart.toISOString()}&endDate=${monthEnd.toISOString()}&limit=100`,
        );

        if (response.ok) {
          const records = await response.json();

          const totalMen = records.reduce(
            (sum: number, r: any) => sum + r.totalMen,
            0,
          );
          const totalWomen = records.reduce(
            (sum: number, r: any) => sum + r.totalWomen,
            0,
          );
          const totalYouths = records.reduce(
            (sum: number, r: any) => sum + r.totalYouths,
            0,
          );
          const totalChildren = records.reduce(
            (sum: number, r: any) => sum + r.totalChildren,
            0,
          );
          const totalAttendance = records.reduce(
            (sum: number, r: any) => sum + r.totalPeoplePresent,
            0,
          );

          monthlyStats.push({
            month: monthStart.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }),
            totalAttendance,
            totalMen,
            totalWomen,
            totalYouths,
            totalChildren,
            averageAttendance:
              records.length > 0
                ? Math.round(totalAttendance / records.length)
                : 0,
            recordCount: records.length,
          });
        }
      }

      setYearlyData(monthlyStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Current month totals
  const currentMonthTotals = currentMonthData.reduce(
    (acc, day) => ({
      men: acc.men + day.Men,
      women: acc.women + day.Women,
      youths: acc.youths + day.Youths,
      children: acc.children + day.Children,
      total: acc.total + day.Total,
    }),
    { men: 0, women: 0, youths: 0, children: 0, total: 0 },
  );

  const pieData = [
    { name: "Men", value: currentMonthTotals.men, color: "#4B3B2F" },
    { name: "Women", value: currentMonthTotals.women, color: "#E4B400" },
    { name: "Youths", value: currentMonthTotals.youths, color: "#3B6A45" },
    { name: "Children", value: currentMonthTotals.children, color: "#8B7355" },
  ];

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
          Attendance Statistics
        </h1>
        <p className="text-brand-dark-light mt-1">
          Visual analytics and trends
        </p>
      </div>

      {/* Current Month Overview */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-black mb-4">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-sm opacity-80">Total</p>
            <p className="text-3xl font-black">{currentMonthTotals.total}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Men</p>
            <p className="text-2xl font-black">{currentMonthTotals.men}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Women</p>
            <p className="text-2xl font-black">{currentMonthTotals.women}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Youths</p>
            <p className="text-2xl font-black">{currentMonthTotals.youths}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Children</p>
            <p className="text-2xl font-black">{currentMonthTotals.children}</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Weekly Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6">
            This Month's Attendance Breakdown
          </h2>

          {currentMonthData.length === 0 ? (
            <p className="text-center text-brand-dark-light py-12">
              No attendance data for this month yet
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Men" fill="#4B3B2F" />
                <Bar dataKey="Women" fill="#E4B400" />
                <Bar dataKey="Youths" fill="#3B6A45" />
                <Bar dataKey="Children" fill="#8B7355" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart - Demographics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-heading text-xl font-black text-brand-primary mb-6">
            Demographic Distribution
          </h2>

          {currentMonthTotals.total === 0 ? (
            <p className="text-center text-brand-dark-light py-12">
              No data to display
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 12-Month Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-heading text-xl font-black text-brand-primary mb-6">
          12-Month Summary
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-sky">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-brand-primary">
                  Month
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Services
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Men
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Women
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Youths
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Children
                </th>
                <th className="px-4 py-3 text-center text-sm font-bold text-brand-primary">
                  Average
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-sky">
              {yearlyData.map((month, idx) => (
                <tr key={idx} className="hover:bg-brand-light">
                  <td className="px-4 py-3 font-bold text-brand-dark">
                    {month.month}
                  </td>
                  <td className="px-4 py-3 text-center">{month.recordCount}</td>
                  <td className="px-4 py-3 text-center font-bold text-brand-primary">
                    {month.totalAttendance}
                  </td>
                  <td className="px-4 py-3 text-center">{month.totalMen}</td>
                  <td className="px-4 py-3 text-center">{month.totalWomen}</td>
                  <td className="px-4 py-3 text-center">{month.totalYouths}</td>
                  <td className="px-4 py-3 text-center">
                    {month.totalChildren}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-brand-accent">
                    {month.averageAttendance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
