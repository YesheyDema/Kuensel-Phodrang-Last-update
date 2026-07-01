"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useDonations } from "@/lib/donations-store";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

const donationPurposes = [
  {
    id: "preservation",
    title: "Statue Preservation",
    description: "Care for the sacred structure and long-term maintenance.",
  },
  {
    id: "monastic",
    title: "Monastic Support",
    description: "Support monks, prayers, and daily spiritual activities.",
  },
  {
    id: "nature",
    title: "Nature Conservation",
    description: "Protect the surrounding sanctuary and natural landscape.",
  },
  {
    id: "community",
    title: "Community Programs",
    description: "Fund educational and spiritual outreach initiatives.",
  },
];

const donationTiers = [
  {
    id: "statue-12",
    title: '12" Buddha Statue',
    amountNu: 45000,
    amountUsd: 500,
  },
  {
    id: "statue-8",
    title: '8" Buddha Statue',
    amountNu: 27000,
    amountUsd: 300,
  },
  {
    id: "statue-4",
    title: '4" Buddha Statue',
    amountNu: 9000,
    amountUsd: 100,
  },
  {
    id: "custom",
    title: "Custom Amount",
    amountNu: null,
    amountUsd: null,
  },
] as const;

const bankDetails = [
  { label: "Account Name", value: "BUDDHA DORDEYMA ZHUNG DRATSHANG" },
  { label: "Account Number", value: "652418807" },
  {
    label: "Bank",
    value: "Bhutan National Bank (P.O.Box 439, Thimphu, Bhutan | +975-2-322767 | Fax: +975-2-323601)",
  },
  { label: "Branch", value: "Thimphu" },
];

export default function DonatePage() {
  const { addDonation } = useDonations();

  const [step, setStep] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState("preservation");
  const [selectedTierId, setSelectedTierId] = useState<string>("statue-12");
  const [customAmount, setCustomAmount] = useState("");

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorCountry, setDonorCountry] = useState("");
  const [prayerIntention, setPrayerIntention] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [journalNumber, setJournalNumber] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedTier = useMemo(
    () => donationTiers.find((tier) => tier.id === selectedTierId),
    [selectedTierId]
  );

  const selectedPurposeData = useMemo(
    () => donationPurposes.find((p) => p.id === selectedPurpose),
    [selectedPurpose]
  );

  const finalAmount = (selectedTier?.amountNu ?? Number(customAmount)) || 0;

  const canProceedStep1 = finalAmount > 0;
  const canProceedStep2 = Boolean((isAnonymous || donorName.trim()) && donorEmail.trim());
  const canSubmit = journalNumber.trim().length >= 5 && Boolean(screenshotFile);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!screenshotFile) {
      alert("Please upload your transaction screenshot before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("donorName", isAnonymous ? "" : donorName);
    formData.append("donorEmail", donorEmail);
    formData.append("donorPhone", donorPhone || "");
    formData.append("donorCountry", donorCountry);
    formData.append("isAnonymous", String(isAnonymous));
    formData.append("amount", String(finalAmount));
    formData.append("purpose", selectedPurposeData?.title || "General");
    formData.append("prayerIntention", prayerIntention);
    formData.append("journalNumber", journalNumber);

    formData.append("screenshot", screenshotFile, screenshotFile.name);

    try {
      const res = await fetch("/api/donations", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to submit");

      addDonation({
        donorName: isAnonymous ? "Anonymous" : donorName,
        donorEmail,
        donorCountry,
        amount: finalAmount,
        purpose: selectedPurposeData?.title || "General",
        prayerIntention,
        journalNumber,
        isAnonymous,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit donation. Please try again later.");
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedPurpose("preservation");
    setSelectedTierId("statue-12");
    setCustomAmount("");
    setDonorName("");
    setDonorEmail("");
    setDonorPhone("");
    setDonorCountry("");
    setPrayerIntention("");
    setIsAnonymous(false);
    setJournalNumber("");
    setScreenshotFile(null);
    setCopiedField(null);
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border/60 bg-linear-to-b from-primary/10 via-background to-background pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-xs uppercase tracking-[0.32em] text-primary">Offer Support</p>
            <h1 className="mt-3 font-serif text-4xl font-light leading-tight md:text-6xl">
              A clean and simple way to donate
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Select a purpose, enter your details, and submit your bank reference.
              The full process takes about 2 minutes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm">
              {[
                "Secure form submission",
                "Anonymous option available",
                "Manual verification for accuracy",
              ].map((item) => (
                <span key={item} className="rounded-full border border-border bg-background px-3 py-1.5 text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-8 rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_1px_0_rgba(255,255,255,0.03),0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm md:p-5">
                  <div className="flex items-center gap-2 md:gap-3">
                    {[1, 2, 3].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => s <= step && setStep(s)}
                        className={`h-9 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                          step === s
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : step > s
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/70 text-muted-foreground"
                        }`}
                      >
                        {s === 1 ? "Purpose & amount" : s === 2 ? "Your details" : "Payment proof"}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-3xl border border-border/70 bg-card/95 p-6 shadow-[0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm md:p-8"
                    >
                      <h2 className="font-serif text-3xl">Choose your donation</h2>
                      <p className="mt-2 text-muted-foreground">Start by selecting a purpose and amount.</p>

                      <div className="mt-8">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Purpose</p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {donationPurposes.map((purpose) => (
                            <button
                              key={purpose.id}
                              type="button"
                              onClick={() => setSelectedPurpose(purpose.id)}
                              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                                selectedPurpose === purpose.id
                                  ? "border-primary/40 bg-primary/5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] ring-1 ring-primary/10"
                                  : "border-border/70 bg-background/80 hover:border-border hover:bg-background hover:shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-medium">{purpose.title}</p>
                                <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${
                                  selectedPurpose === purpose.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/80 text-muted-foreground"
                                }`}>
                                  {selectedPurpose === purpose.id ? "Selected" : "Choose"}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{purpose.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Amount</p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {donationTiers.map((tier) => (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => {
                                setSelectedTierId(tier.id);
                                if (tier.id !== "custom") setCustomAmount("");
                              }}
                              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                                selectedTierId === tier.id
                                  ? "border-primary/40 bg-primary/5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] ring-1 ring-primary/10"
                                  : "border-border/70 bg-background/80 hover:border-border hover:bg-background hover:shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-medium">{tier.title}</p>
                                <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${
                                  selectedTierId === tier.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/80 text-muted-foreground"
                                }`}>
                                  {selectedTierId === tier.id ? "Selected" : "Choose"}
                                </span>
                              </div>
                              {tier.id !== "custom" ? (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  Nu. {tier.amountNu.toLocaleString()} or USD {tier.amountUsd.toLocaleString()}
                                </p>
                              ) : (
                                <p className="mt-1 text-sm text-muted-foreground">Enter your own amount</p>
                              )}
                            </button>
                          ))}
                        </div>

                        {selectedTierId === "custom" && (
                          <div className="mt-3 rounded-2xl border border-border/70 bg-background/85 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.03)] ring-1 ring-primary/5">
                            <label className="text-sm text-muted-foreground">Custom amount (Nu.)</label>
                            <input
                              type="number"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="mt-2 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-base focus:border-primary focus:outline-none"
                              placeholder="Enter amount"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                        <p className="text-sm text-muted-foreground">
                          Selected amount: <span className="font-semibold text-foreground">Nu. {finalAmount.toLocaleString()}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!canProceedStep1}
                          className="rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-3xl border border-border/70 bg-card/95 p-6 shadow-[0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm md:p-8"
                    >
                      <h2 className="font-serif text-3xl">Your details</h2>
                      <p className="mt-2 text-muted-foreground">Only basic information is required for verification.</p>

                      <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm text-muted-foreground">Full name</label>
                          <input
                            type="text"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            required={!isAnonymous}
                            disabled={isAnonymous}
                            className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 focus:border-primary focus:outline-none disabled:opacity-60"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Email address</label>
                          <input
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            required
                            className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 focus:border-primary focus:outline-none"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Country</label>
                          <input
                            type="text"
                            value={donorCountry}
                            onChange={(e) => setDonorCountry(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 focus:border-primary focus:outline-none"
                            placeholder="Your country"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Phone (optional)</label>
                          <input
                            type="tel"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 focus:border-primary focus:outline-none"
                            placeholder="Optional phone number"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="text-sm text-muted-foreground">Prayer intention (optional)</label>
                        <textarea
                          value={prayerIntention}
                          onChange={(e) => setPrayerIntention(e.target.value)}
                          rows={3}
                          className="mt-1.5 w-full resize-none rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 focus:border-primary focus:outline-none"
                          placeholder="Share your prayer intention"
                        />
                      </div>

                      <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-border/70 bg-background/80 px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="h-4 w-4 accent-primary"
                        />
                        <span className="text-sm">Make this donation anonymous</span>
                      </label>

                      <div className="mt-8 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="rounded-lg border border-border px-5 py-2.5 font-medium transition-colors hover:bg-muted"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          disabled={!canProceedStep2}
                          className="rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.form
                      key="step3"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="grid gap-5 lg:grid-cols-[1.1fr_1fr]"
                    >
                      <div className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm md:p-8">
                        <h2 className="font-serif text-3xl">Payment details</h2>
                        <p className="mt-2 text-muted-foreground">
                          Transfer the exact amount below to the account details shown here, then submit your reference number.
                        </p>

                        <div className="mt-6 space-y-0 rounded-2xl border border-border/60 bg-background/70">
                          {bankDetails.map((item) => (
                            <div key={item.label} className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 last:border-b-0">
                              <div className="min-w-0">
                                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                                <p className="text-sm font-medium md:text-base">{item.value}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(item.value, item.label)}
                                className="rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
                              >
                                {copiedField === item.label ? "Copied" : "Copy"}
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <label className="text-sm font-medium">Journal / reference number</label>
                          <input
                            type="text"
                            value={journalNumber}
                            onChange={(e) => setJournalNumber(e.target.value)}
                            required
                            className="mt-1.5 w-full rounded-xl border border-border/60 bg-background/75 px-3 py-2.5 focus:border-primary focus:outline-none"
                            placeholder="e.g. JRN-2026-XXXXX"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="text-sm font-medium">Upload transaction screenshot (required)</label>
                          <label className="mt-1.5 block cursor-pointer rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/35 hover:bg-primary/7">
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                              required
                              className="hidden"
                            />
                            <p className="text-sm font-medium">
                              {screenshotFile ? screenshotFile.name : "Click to upload receipt"}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, or PDF</p>
                          </label>
                        </div>

                        <div className="mt-8 flex gap-3">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="rounded-full border border-border/60 px-5 py-2.5 font-medium transition-colors hover:bg-muted/60"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={!canSubmit}
                            className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Submit donation
                          </button>
                        </div>
                      </div>

                      <aside className="h-fit rounded-3xl border border-border/60 bg-background/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm md:sticky md:top-28">
                        <p className="text-xs uppercase tracking-[0.2em] text-primary">Summary</p>
                        <div className="mt-4 space-y-3 text-sm">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-muted-foreground">Purpose</span>
                            <span className="text-right font-medium">{selectedPurposeData?.title}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-muted-foreground">Donor</span>
                            <span className="text-right font-medium">{isAnonymous ? "Anonymous" : donorName || "Not set"}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-muted-foreground">Email</span>
                            <span className="text-right font-medium">{donorEmail || "Not set"}</span>
                          </div>
                        </div>
                        <div className="my-5 h-px bg-border/70" />
                        <p className="text-xs uppercase tracking-[0.2em] text-primary">Amount</p>
                        <p className="mt-2 font-serif text-4xl leading-none text-primary">
                          Nu. {finalAmount.toLocaleString()}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Your donation will be marked pending until verification is completed.
                        </p>

                        <div className="mt-6 rounded-2xl border border-dashed border-border/60 bg-background/60 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-primary">QR Scan Code</p>
                            <span className="text-xs text-muted-foreground">Scan to pay</span>
                          </div>
                          <div className="mt-4 flex aspect-square w-full items-center justify-center rounded-2xl border border-border/60 bg-background/80 p-4">
                            <div className="relative h-full w-full max-w-55 overflow-hidden rounded-xl bg-white p-3">
                              <Image
                                src="/images/qrcode.jpeg"
                                alt="QR code for donation payment"
                                fill
                                sizes="(max-width: 768px) 70vw, 320px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <p className="mt-3 text-center text-xs text-muted-foreground">
                            Scan the code above to open the payment details.
                          </p>
                        </div>
                      </aside>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-card/95 p-7 text-center shadow-[0_1px_0_rgba(255,255,255,0.03),0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-sm md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Submitted</p>
                <h2 className="mt-3 font-serif text-4xl">Thank you for your support</h2>
                <p className="mt-3 text-muted-foreground">
                  Your donation of <span className="font-semibold text-foreground">Nu. {finalAmount.toLocaleString()}</span> has been received and is now waiting for verification.
                </p>

                <div className="mt-7 rounded-2xl border border-border/70 bg-background/80 p-5 text-left shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Reference:</span>{" "}
                    <span className="font-medium">{journalNumber}</span>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-muted-foreground">Purpose:</span>{" "}
                    <span className="font-medium">{selectedPurposeData?.title}</span>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className="font-medium text-amber-700">Pending verification</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 rounded-full border border-border/70 px-5 py-2.5 font-medium transition-colors hover:bg-muted/70"
                >
                  Make another donation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="border-t border-border/60 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Clear process",
              text: "Three simple steps with clear instructions from start to finish.",
            },
            {
              title: "Flexible giving",
              text: "Choose a sponsorship tier or enter a custom contribution amount.",
            },
            {
              title: "Transparent status",
              text: "Each donation is tracked and verified before final confirmation.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border/70 bg-card/95 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
