"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import {
  LayoutDashboard,
  Users,
  Activity,
  Settings,
  LogOut,
  Menu,
  UserPlus,
  CheckSquare,
  AlertCircle,
  X,
  Bell,
  Search,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      setShowToast(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Add Members",
      href: "/admin/members/add",
      icon: UserPlus,
    },
    {
      name: "Members",
      href: "/admin/members",
      icon: Users,
    },
    {
      name: "Activities",
      href: "/admin/activities",
      icon: Activity,
    },
    {
      name: "Attendance", // ADD THIS
      href: "/admin/attendance",
      icon: CheckSquare, // Import from lucide-react
    },
    {
      name: "Follow-up", // ADD THIS
      href: "/admin/followup",
      icon: AlertCircle, // Import from lucide-react
    },
    // {
    //   name: "Settings",
    //   href: "/admin/settings",
    //   icon: Settings,
    // },
  ];

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (href === "/admin") return false;
    if (pathname.startsWith(href + "/")) {
      const moreSpecificMatch = menuItems.find(
        (item) =>
          item.href !== href &&
          item.href.startsWith(href) &&
          (pathname === item.href || pathname.startsWith(item.href + "/")),
      );
      return !moreSpecificMatch;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-brand-accent text-white px-6 py-3 rounded-xl shadow-2xl animate-fade-in flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-bold">Logged out successfully</span>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50
        w-72 bg-gradient-to-b from-brand-primary via-brand-primary to-brand-primary-dark text-white
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col shadow-2xl
      `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image src={Logo} alt="Church Logo" width={60} height={60} />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">GPIC</h2>
                <p className="text-xs text-white/60">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-xl
                  transition-all duration-200 group relative overflow-hidden
                  ${
                    active
                      ? "bg-brand-secondary text-brand-primary font-bold shadow-lg scale-105"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary-light to-brand-secondary opacity-50"></div>
                )}
                <Icon size={22} className="relative z-10" />
                <span className="relative z-10 font-medium">{item.name}</span>
                {active && (
                  <div className="ml-auto relative z-10 w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center font-black text-brand-secondary">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-white/60 truncate">admin@gpic.org</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-red-600/20 hover:bg-red-600 text-red-100 hover:text-white rounded-xl transition-all duration-200 font-bold group"
          >
            <LogOut
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-brand-sky shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* Page Title (Hidden on Mobile) */}
            <div className="hidden lg:block">
              <h1 className="font-heading text-2xl font-black text-brand-primary">
                {/* {menuItems.find((item) => isActive(item.href))?.name ||
                  "Dashboard"} */}
                Administrative Dashboard
              </h1>
            </div>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image src={Logo} alt="Church Logo" width={50} height={50} />
              </div>
              <span className="font-black text-brand-primary">GPIC</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              {/* <button className="p-2 text-brand-dark-light hover:bg-brand-sky rounded-lg transition-colors hidden md:block">
                <Search size={20} />
              </button> */}

              {/* Notifications */}
              {/* <button className="relative p-2 text-brand-dark-light hover:bg-brand-sky rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-secondary rounded-full"></span>
              </button> */}

              {/* Mobile User Avatar */}
              <button className="lg:hidden w-8 h-8 bg-brand-secondary/20 rounded-full flex items-center justify-center font-black text-brand-primary text-sm">
                A
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>

        {/* Footer */}
        <footer className="border-t border-brand-sky bg-white px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-brand-dark-light">
            <p>
              © 2026 Gospel Power International Church. All rights reserved.
            </p>
            <p className="font-medium">Built with ❤️ for ministry</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
