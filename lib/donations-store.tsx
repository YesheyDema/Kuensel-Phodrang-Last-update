"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorCountry: string;
  amount: number;
  purpose: string;
  prayerIntention: string;
  journalNumber: string;
  isAnonymous: boolean;
  status: "pending" | "verified" | "rejected";
  createdAt: Date;
}

interface DonationsContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, "id" | "status" | "createdAt">) => void;
  updateDonationStatus: (id: string, status: Donation["status"]) => void;
  getTotalDonations: () => number;
  getVerifiedDonations: () => Donation[];
}

const DonationsContext = createContext<DonationsContextType | undefined>(
  undefined
);

// Sample initial donations for demo
const initialDonations: Donation[] = [
  {
    id: "1",
    donorName: "Tashi Dorji",
    donorEmail: "tashi@example.com",
    donorCountry: "Bhutan",
    amount: 5000,
    purpose: "Statue Preservation",
    prayerIntention: "For the wellbeing of all sentient beings",
    journalNumber: "JRN-2024-001",
    isAnonymous: false,
    status: "verified",
    createdAt: new Date("2024-12-15"),
  },
  {
    id: "2",
    donorName: "Sarah Chen",
    donorEmail: "sarah.chen@example.com",
    donorCountry: "Singapore",
    amount: 10000,
    purpose: "Monastic Support",
    prayerIntention: "In memory of my grandmother",
    journalNumber: "JRN-2024-002",
    isAnonymous: false,
    status: "verified",
    createdAt: new Date("2024-12-18"),
  },
  {
    id: "3",
    donorName: "Anonymous",
    donorEmail: "anon@example.com",
    donorCountry: "Thailand",
    amount: 2500,
    purpose: "Nature Park Conservation",
    prayerIntention: "",
    journalNumber: "JRN-2024-003",
    isAnonymous: true,
    status: "pending",
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "4",
    donorName: "Karma Wangchuk",
    donorEmail: "karma.w@example.com",
    donorCountry: "Bhutan",
    amount: 1000,
    purpose: "Community Programs",
    prayerIntention: "For peace in the world",
    journalNumber: "JRN-2024-004",
    isAnonymous: false,
    status: "verified",
    createdAt: new Date("2024-12-22"),
  },
  {
    id: "5",
    donorName: "Michael Wong",
    donorEmail: "m.wong@example.com",
    donorCountry: "Hong Kong",
    amount: 25000,
    purpose: "Statue Preservation",
    prayerIntention: "Dedication to my parents",
    journalNumber: "JRN-2024-005",
    isAnonymous: false,
    status: "pending",
    createdAt: new Date("2024-12-28"),
  },
];

export function DonationsProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem("buddha-dordenma-donations");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDonations(
        parsed.map((d: Donation) => ({
          ...d,
          createdAt: new Date(d.createdAt),
        }))
      );
    } else {
      setDonations(initialDonations);
    }
  }, []);

  useEffect(() => {
    if (donations.length > 0) {
      localStorage.setItem("buddha-dordenma-donations", JSON.stringify(donations));
    }
  }, [donations]);

  const addDonation = (
    donation: Omit<Donation, "id" | "status" | "createdAt">
  ) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date(),
    };
    setDonations((prev) => [newDonation, ...prev]);
  };

  const updateDonationStatus = (id: string, status: Donation["status"]) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const getTotalDonations = () => {
    return donations
      .filter((d) => d.status === "verified")
      .reduce((sum, d) => sum + d.amount, 0);
  };

  const getVerifiedDonations = () => {
    return donations.filter((d) => d.status === "verified");
  };

  return (
    <DonationsContext.Provider
      value={{
        donations,
        addDonation,
        updateDonationStatus,
        getTotalDonations,
        getVerifiedDonations,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (context === undefined) {
    throw new Error("useDonations must be used within a DonationsProvider");
  }
  return context;
}
