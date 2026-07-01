"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import AdminPasswordChange from "@/components/admin-password-change";

const ADMIN_EMAIL = "codemasterwang@gmail.com";

type DonationStatus = "pending" | "verified" | "rejected";

type Donation = {
  id: string;
  donorName: string;
  donorEmail?: string | null;
  donorPhone?: string | null;
  donorCountry?: string | null;
  isAnonymous?: boolean;
  amount: number;
  purpose: string;
  prayerIntention?: string | null;
  journalNumber: string;
  status: DonationStatus;
  createdAt: string;
  screenshotUrl?: string | null;
};

type DateFilterType = "all" | "today" | "week" | "month" | "custom";
type MonthYearFilter = "all" | string; // "all" or "YYYY-MM"

const statusStyles: Record<DonationStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  verified: "border-green-200 bg-green-50 text-green-700",
  rejected: "border-red-200 bg-red-50 text-red-700",
};

export default function AdminDashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DonationStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("all");
  const [monthYearFilter, setMonthYearFilter] = useState<MonthYearFilter>("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        router.push("/admin/login");
        return;
      }

      if (session.session.user.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        router.push("/admin/login");
        return;
      }

      const token = session.session.access_token;
      const res = await fetch("/api/donations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error("fetch donations failed");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setDonations(json.donations || []);
      setLoading(false);
    })();
  }, [router]);

  const refreshDonations = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) return;
    const token = session.session.access_token;
    const res = await fetch("/api/donations", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const json = await res.json();
    setDonations(json.donations || []);
  };

  const updateStatus = async (id: string, status: DonationStatus) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) return;
    const token = session.session.access_token;
    setSavingId(id);
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setSavingId(null);
      alert('Failed to update status');
      return;
    }
    const json = await res.json();
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, status: json.donation?.status || status } : d)));
    setSavingId(null);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Filter donations
  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donorEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.journalNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    
    // Date filtering logic
    const donationDate = new Date(d.createdAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let matchesDate = true;
    
    if (dateFilter !== "all") {
      const compareDate = new Date(donationDate);
      compareDate.setHours(0, 0, 0, 0);
      
      if (dateFilter === "today") {
        matchesDate = compareDate.getTime() === today.getTime();
      } else if (dateFilter === "week") {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = compareDate >= weekAgo && compareDate <= today;
      } else if (dateFilter === "month") {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        matchesDate = compareDate >= monthAgo && compareDate <= today;
      } else if (dateFilter === "custom" && customStartDate && customEndDate) {
        const start = new Date(customStartDate);
        const end = new Date(customEndDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        matchesDate = compareDate >= start && compareDate <= end;
      }
    }
    
    // Month/Year filtering logic
    let matchesMonthYear = true;
    if (monthYearFilter !== "all") {
      const [filterYear, filterMonth] = monthYearFilter.split("-");
      const donationYear = donationDate.getFullYear().toString();
      const donationMonth = String(donationDate.getMonth() + 1).padStart(2, "0");
      matchesMonthYear = donationYear === filterYear && donationMonth === filterMonth;
    }
    
    return matchesSearch && matchesStatus && matchesDate && matchesMonthYear;
  });

  // Get unique months/years for filter dropdown
  const monthYearOptions = Array.from(
    new Set(
      donations.map((d) => {
        const date = new Date(d.createdAt);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort().reverse();

  // Calculate daily stats
  const dailyStats = donations.reduce(
    (acc, d) => {
      const date = new Date(d.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { verified: 0, rejected: 0, pending: 0 };
      }
      acc[date][d.status]++;
      return acc;
    },
    {} as Record<string, Record<DonationStatus, number>>
  );

  const todayKey = new Date().toLocaleDateString();
  const todayStats = dailyStats[todayKey] || { verified: 0, rejected: 0, pending: 0 };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium">Donations Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">Logged in as {ADMIN_EMAIL}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={refreshDonations} className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted">
              Refresh
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted">
              Settings
            </button>
            <button onClick={handleSignOut} className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted">
              Sign out
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-6 border border-border bg-background p-6">
            <h2 className="text-lg font-medium">Admin Settings</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Admin Email</label>
                <input type="email" value={ADMIN_EMAIL} readOnly className="mt-2 w-full border border-border bg-muted/20 px-3 py-2 text-sm" />
                <p className="mt-2 text-xs text-muted-foreground">Email is fixed. To change admin accounts, update ADMIN_EMAIL in .env.local and create a new Supabase Auth user.</p>
              </div>
              <div>
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {showPasswordChange && (
          <AdminPasswordChange onClose={() => setShowPasswordChange(false)} />
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {[
            { label: "Total", value: donations.length },
            { label: "Pending", value: donations.filter((d) => d.status === "pending").length },
            { label: "Verified", value: donations.filter((d) => d.status === "verified").length },
            { label: "Rejected", value: donations.filter((d) => d.status === "rejected").length },
            { label: "Today", value: `${todayStats.verified}/${todayStats.rejected}` },
          ].map((stat) => (
            <div key={stat.label} className="border border-border bg-background p-4">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</div>
              <div className="mt-3 font-serif text-3xl">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, journal, or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="text-sm font-medium">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DonationStatus | "all")}
              className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary md:w-40"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Date Filtering Section */}
        <div className="mt-6 border border-border bg-background p-4">
          <h3 className="mb-4 font-medium text-sm uppercase tracking-wider">Filter by Date</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium">Quick Filter</label>
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value as DateFilterType);
                  if (e.target.value !== "custom") {
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }
                }}
                className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {dateFilter === "custom" && (
              <>
                <div>
                  <label className="text-sm font-medium">From Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">To Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium">By Month/Year</label>
              <select
                value={monthYearFilter}
                onChange={(e) => setMonthYearFilter(e.target.value)}
                className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="all">All Months</option>
                {monthYearOptions.map((my) => {
                  const [year, month] = my.split("-");
                  const date = new Date(parseInt(year), parseInt(month) - 1);
                  return (
                    <option key={my} value={my}>
                      {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="mt-8">
          {filteredDonations.length === 0 ? (
            <div className="rounded border border-border bg-background p-8 text-center text-muted-foreground">
              No donations match your filters
            </div>
          ) : (
            <div className="border border-border overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1fr_0.8fr_0.8fr] gap-0 bg-muted/50 border-b border-border">
                <div className="px-4 py-3 font-medium text-sm">Donor</div>
                <div className="px-4 py-3 font-medium text-sm">Amount</div>
                <div className="px-4 py-3 font-medium text-sm">Date</div>
                <div className="px-4 py-3 font-medium text-sm">Journal</div>
                <div className="px-4 py-3 font-medium text-sm">Status</div>
                <div className="px-4 py-3 font-medium text-sm text-right">Actions</div>
              </div>

              {/* Table Rows */}
              {filteredDonations.map((d) => (
                <div key={d.id} className="border-b border-border last:border-b-0">
                  {/* Row */}
                  <div
                    onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
                    className="grid md:grid-cols-[1fr_1fr_1fr_1fr_0.8fr_0.8fr] gap-0 items-center bg-background hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <div className="px-4 py-4 font-medium text-sm truncate flex md:block">
                      <span className="inline md:hidden font-medium mr-2 text-muted-foreground">Donor:</span>
                      {d.donorName}
                    </div>
                    <div className="px-4 py-4 text-sm truncate flex md:block">
                      <span className="inline md:hidden font-medium mr-2 text-muted-foreground">Amount:</span>
                      <span className="font-medium text-primary">Nu. {d.amount.toLocaleString()}</span>
                    </div>
                    <div className="px-4 py-4 text-sm truncate flex md:block">
                      <span className="inline md:hidden font-medium mr-2 text-muted-foreground">Date:</span>
                      {new Date(d.createdAt).toLocaleDateString()}
                    </div>
                    <div className="px-4 py-4 text-sm truncate flex md:block">
                      <span className="inline md:hidden font-medium mr-2 text-muted-foreground">Journal:</span>
                      <span className="font-mono text-xs">{d.journalNumber}</span>
                    </div>
                    <div className="px-4 py-4 flex md:block">
                      <span className={`rounded-full border px-2 py-1 text-xs uppercase tracking-[0.2em] w-fit ${statusStyles[d.status]}`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="px-4 py-4 text-right text-sm text-muted-foreground flex md:block justify-end">
                      <span className="text-xs">{expandedId === d.id ? "▼" : "▶"}</span>
                    </div>
                  </div>

                  {/* Expanded Row */}
                  {expandedId === d.id && (
                    <div className="border-t border-border bg-muted/20 px-4 py-6 md:px-6">
                      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                        {/* Details */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                              Donor Information
                            </h4>
                            <div className="grid gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Name:</span> {d.donorName}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Email:</span> {d.donorEmail || "Not provided"}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Phone:</span> {d.donorPhone || "Not provided"}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Country:</span> {d.donorCountry || "Not provided"}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Anonymous:</span> {d.isAnonymous ? "Yes" : "No"}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                              Donation Details
                            </h4>
                            <div className="grid gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Purpose:</span> {d.purpose || "Not provided"}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Submitted:</span> {new Date(d.createdAt).toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {d.prayerIntention && (
                            <div>
                              <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                                Prayer Intention
                              </h4>
                              <p className="text-sm whitespace-pre-wrap">{d.prayerIntention}</p>
                            </div>
                          )}

                          {d.status === "pending" && (
                            <div className="flex flex-wrap gap-3 pt-2">
                              <button
                                onClick={() => updateStatus(d.id, "verified")}
                                disabled={savingId === d.id}
                                className="border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 transition-colors hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {savingId === d.id ? "Saving..." : "Verify"}
                              </button>
                              <button
                                onClick={() => updateStatus(d.id, "rejected")}
                                disabled={savingId === d.id}
                                className="border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {savingId === d.id ? "Saving..." : "Reject"}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Screenshot */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                            Screenshot
                          </h4>
                          {d.screenshotUrl ? (
                            <div className="space-y-3">
                              <a
                                href={d.screenshotUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block overflow-hidden border border-border bg-background hover:opacity-90 transition-opacity"
                              >
                                <img
                                  src={d.screenshotUrl}
                                  alt={`${d.donorName} screenshot`}
                                  className="w-full h-auto max-h-48 object-cover"
                                />
                              </a>
                              <a
                                href={d.screenshotUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex text-xs text-primary hover:underline"
                              >
                                Open full size →
                              </a>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center border border-dashed border-border bg-muted/30 rounded py-8 text-sm text-muted-foreground">
                              No screenshot
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
