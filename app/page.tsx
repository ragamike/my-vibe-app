"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Assignment,
  Environment,
  MediumTrack,
  AssignmentScale,
  AssignmentStatus,
  AssignmentPlanningData,
  AssignmentReflectionData,
} from "@/lib/types";
import {
  CURRICULUM_UNITS,
  INITIAL_ASSIGNMENTS,
  DEFAULT_GEAR_PROFILE,
} from "@/lib/curriculum";
import AssignmentModal from "@/components/AssignmentModal";

export default function Home() {
  const [currentMedium, setCurrentMedium] = useState<MediumTrack>("photography");
  const [currentEnv, setCurrentEnv] = useState<Environment>("home");
  const [activeUnitNumber, setActiveUnitNumber] = useState<number>(1);
  const [selectedScale, setSelectedScale] = useState<AssignmentScale | "all">("all");
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showGearSheet, setShowGearSheet] = useState<boolean>(false);

  // Sync with localStorage on client mount to restore saved drafts and completions
  useEffect(() => {
    try {
      setAssignments((prev) =>
        prev.map((item) => {
          const stored = localStorage.getItem(`assignment_data_${item.id}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            return {
              ...item,
              status: parsed.status || item.status,
              planning: parsed.planning || item.planning,
              reflection: parsed.reflection || item.reflection,
            };
          }
          return item;
        })
      );
    } catch (e) {
      console.warn("Could not load stored assignment progress:", e);
    }
  }, []);

  // Active unit metadata
  const activeUnit = useMemo(() => {
    return (
      CURRICULUM_UNITS.find((u) => u.unitNumber === activeUnitNumber) ||
      CURRICULUM_UNITS[0]
    );
  }, [activeUnitNumber]);

  // Filtered assignments based on medium, environment, unit, and scale
  const contextAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const matchMedium = a.medium === currentMedium;
      const matchEnv = a.environment === currentEnv;
      const matchUnit = a.unitNumber === activeUnitNumber;
      const matchScale =
        selectedScale === "all" ? true : a.scale === selectedScale;
      return matchMedium && matchEnv && matchUnit && matchScale;
    });
  }, [assignments, currentMedium, currentEnv, activeUnitNumber, selectedScale]);

  // Overall stats for active context
  const stats = useMemo(() => {
    const totalInContext = contextAssignments.length;
    const completed = contextAssignments.filter(
      (a) => a.status === "completed"
    ).length;
    const inProgress = contextAssignments.filter(
      (a) => a.status === "in-progress"
    ).length;
    return { totalInContext, completed, inProgress };
  }, [contextAssignments]);

  const toggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextStatus: Record<AssignmentStatus, AssignmentStatus> = {
          available: "in-progress",
          "in-progress": "completed",
          completed: "available",
          locked: "locked",
        };
        const updatedStatus = nextStatus[item.status];
        try {
          const existing = localStorage.getItem(`assignment_data_${id}`);
          const parsed = existing ? JSON.parse(existing) : {};
          localStorage.setItem(
            `assignment_data_${id}`,
            JSON.stringify({ ...parsed, status: updatedStatus })
          );
        } catch {
          // localStorage fallback
        }
        return { ...item, status: updatedStatus };
      })
    );
  };

  const handleSaveDraft = (
    assignmentId: string,
    planning: AssignmentPlanningData,
    reflection: AssignmentReflectionData,
    status: AssignmentStatus
  ) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id !== assignmentId) return item;
        return {
          ...item,
          status,
          planning,
          reflection,
        };
      })
    );
    setSelectedAssignment(null);
  };

  const handleMarkCompleted = (
    assignmentId: string,
    planning: AssignmentPlanningData,
    reflection: AssignmentReflectionData
  ) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id !== assignmentId) return item;
        return {
          ...item,
          status: "completed",
          planning,
          reflection,
        };
      })
    );
    setSelectedAssignment(null);
  };

  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            In Progress
          </span>
        );
      case "locked":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
            Locked
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Ready
          </span>
        );
    }
  };

  const getScaleBadge = (scale: AssignmentScale) => {
    if (scale === "milestone") {
      return (
        <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
          ★ Milestone
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-zinc-800 text-zinc-300 border border-zinc-750">
        ⚡ Micro
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Header */}
      <header className="border-b border-zinc-850 bg-zinc-950/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                <line x1="9.69" y1="8" x2="21.17" y2="8" />
                <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                <line x1="14.31" y1="16" x2="2.83" y2="16" />
                <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wider uppercase text-zinc-100">
                  Strags Studio
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                  Engine v2.0
                </span>
              </div>
              <span className="block text-xs text-zinc-400 font-mono">
                Context-Aware Progressive Training Hub
              </span>
            </div>
          </div>

          {/* Controls: Medium Track + Environment + Gear Profile */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Medium Track Switcher (Photo vs Video) */}
            <div className="p-1 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => setCurrentMedium("photography")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentMedium === "photography"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-bold shadow-md shadow-amber-950/40"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>📸</span>
                <span>Photography</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentMedium("videography")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentMedium === "videography"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-zinc-950 font-bold shadow-md shadow-cyan-950/40"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🎬</span>
                <span>Videography</span>
              </button>
            </div>

            {/* Context Toggle (Road vs Home) */}
            <div className="p-1 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => setCurrentEnv("road")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentEnv === "road"
                    ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-950/50"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>✈️</span>
                <span>On the Road</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentEnv("home")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentEnv === "home"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/50"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🏠</span>
                <span>At Home</span>
              </button>
            </div>

            {/* Gear Profile Trigger */}
            <button
              onClick={() => setShowGearSheet(true)}
              className="px-3 py-1.5 rounded-xl border border-zinc-850 bg-zinc-900/90 hover:bg-zinc-850 hover:border-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>🎒</span>
              <span>Gear Arsenal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Active Context Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-zinc-950 p-6 sm:p-8">
          <div
            className={`absolute top-0 right-0 w-96 h-96 blur-3xl opacity-15 pointer-events-none rounded-full ${
              currentMedium === "photography"
                ? currentEnv === "road"
                  ? "bg-sky-500"
                  : "bg-amber-500"
                : currentEnv === "road"
                ? "bg-blue-500"
                : "bg-cyan-500"
            }`}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2.5">
              {/* Context Pill Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold border ${
                    currentMedium === "photography"
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
                  }`}
                >
                  <span>{currentMedium === "photography" ? "📸" : "🎬"}</span>
                  <span className="capitalize">{currentMedium} Track</span>
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold border ${
                    currentEnv === "road"
                      ? "bg-sky-500/15 text-sky-400 border-sky-500/30"
                      : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  <span>{currentEnv === "road" ? "✈️" : "🏠"}</span>
                  <span>
                    {currentEnv === "road"
                      ? "On the Road (Dell XPS 16 OLED • Fuji X100VI • AE-1 Film • DJI Mic 3)"
                      : "At Home Studio (Mac Studio M4 Max • ProArt OLED • Hasselblad X2D • Canon R5 II • FS-300B • RS 5)"}
                  </span>
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Unit {activeUnit.unitNumber}: {activeUnit.title}
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
                {activeUnit.tagline} &mdash; {activeUnit.description}
              </p>
            </div>

            {/* Context Match Card */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2 min-w-[240px]">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Unit {activeUnit.unitNumber} Progress
              </div>
              <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                <span>{contextAssignments.length}</span>
                <span className="text-xs font-normal text-zinc-400">
                  challenges for {currentMedium} ({currentEnv})
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-zinc-800 text-xs text-zinc-400">
                <span className="text-emerald-400 font-semibold">{stats.completed}</span> completed
                <span>•</span>
                <span className="text-amber-400 font-semibold">{stats.inProgress}</span> active
              </div>
            </div>
          </div>

          {/* Unit Tabs & Scale Controls */}
          <div className="mt-6 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 uppercase mr-1">Curriculum:</span>
              {CURRICULUM_UNITS.map((unit) => {
                const isActive = unit.unitNumber === activeUnitNumber;
                return (
                  <button
                    key={unit.unitNumber}
                    onClick={() => setActiveUnitNumber(unit.unitNumber)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900 font-semibold shadow-md"
                        : "bg-zinc-850/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800"
                    }`}
                  >
                    U{unit.unitNumber}: {unit.title}
                  </button>
                );
              })}
            </div>

            {/* Filter by Scale (Micro vs Milestone) */}
            <div className="flex items-center gap-1.5 text-xs bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setSelectedScale("all")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedScale === "all"
                    ? "bg-zinc-700 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                All Scales
              </button>
              <button
                onClick={() => setSelectedScale("micro")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedScale === "micro"
                    ? "bg-zinc-700 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                ⚡ Micro Only
              </button>
              <button
                onClick={() => setSelectedScale("milestone")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedScale === "milestone"
                    ? "bg-zinc-700 text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                ★ Milestones
              </button>
            </div>
          </div>
        </section>

        {/* Section Heading */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="capitalize">{currentMedium}</span> Challenges Matching Context
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-750 font-mono">
                {contextAssignments.length}
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Calibrated for{" "}
              <span className="font-semibold text-zinc-300">
                {currentEnv === "road" ? "✈️ On the Road" : "🏠 At Home Studio"}
              </span>{" "}
              in{" "}
              <span className="font-semibold text-zinc-300">
                Unit {activeUnit.unitNumber} ({activeUnit.title})
              </span>
              .
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span>Click any card to open Planning, Pre-Vis & Reflection</span>
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contextAssignments.map((assignment) => {
            const isSelected = selectedAssignment?.id === assignment.id;
            return (
              <div
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment)}
                className={`group relative rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? currentMedium === "photography"
                      ? "border-amber-500/80 bg-zinc-900/90 shadow-lg shadow-amber-950/20"
                      : "border-cyan-500/80 bg-zinc-900/90 shadow-lg shadow-cyan-950/20"
                    : "border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70"
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {getScaleBadge(assignment.scale)}
                      <span className="text-xs font-mono text-zinc-400">
                        Tier {assignment.difficultyTier}
                      </span>
                    </div>
                    {getStatusBadge(assignment.status)}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base font-semibold text-white leading-snug transition-colors ${
                      currentMedium === "photography"
                        ? "group-hover:text-amber-400"
                        : "group-hover:text-cyan-400"
                    }`}
                  >
                    {assignment.title}
                  </h3>

                  {/* Domain & Duration */}
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="text-zinc-500">Domain:</span>
                      <span className="text-zinc-300 font-medium">{assignment.domain}</span>
                    </span>
                    {assignment.estimatedMinutes && (
                      <span className="flex items-center gap-1 font-mono text-zinc-400">
                        <span>⏱</span>
                        <span>{assignment.estimatedMinutes}m</span>
                      </span>
                    )}
                  </div>

                  {/* Required Gear Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {assignment.requiredGear.map((gear, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-750 text-zinc-300 line-clamp-1"
                      >
                        {gear}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-5 pt-3 border-t border-zinc-850 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">
                    {assignment.prerequisites.length > 0
                      ? `${assignment.prerequisites.length} prerequisite(s)`
                      : "Direct entry"}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAssignmentStatus(assignment.id);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      assignment.status === "completed"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                        : assignment.status === "in-progress"
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                        : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {assignment.status === "completed"
                      ? "✓ Completed"
                      : assignment.status === "in-progress"
                      ? "In Progress"
                      : "Start"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {contextAssignments.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-12 text-center flex flex-col items-center gap-3">
            <span className="text-3xl">🎯</span>
            <h3 className="text-base font-semibold text-zinc-200">
              No matching {currentMedium} challenges found in this context
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm">
              Try switching your scale filter to &ldquo;All Scales&rdquo; or change the environment to view
              other exercises in Unit {activeUnit.unitNumber}.
            </p>
          </div>
        )}

        {/* Assignment Planning, Pre-Vis, and Reflection Modal */}
        <AssignmentModal
          assignment={selectedAssignment}
          isOpen={selectedAssignment !== null}
          onClose={() => setSelectedAssignment(null)}
          onSaveDraft={handleSaveDraft}
          onMarkCompleted={handleMarkCompleted}
        />

        {/* Gear Arsenal Modal */}
        {showGearSheet && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowGearSheet(false)}
          >
            <div
              className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    🎒 {DEFAULT_GEAR_PROFILE.name}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Environment-aware master gear setup mapped directly to curriculum challenges.
                  </p>
                </div>
                <button
                  onClick={() => setShowGearSheet(false)}
                  className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Environment Kits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Road Kit */}
                <div
                  className={`p-4 rounded-2xl border ${
                    currentEnv === "road"
                      ? "border-sky-500/50 bg-sky-950/20"
                      : "border-zinc-800 bg-zinc-950/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>✈️ Road Travel Kit</span>
                    </h3>
                    {currentEnv === "road" && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">
                        Current Context
                      </span>
                    )}
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1.5">
                    {DEFAULT_GEAR_PROFILE.portableKit.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-sky-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Studio Kit */}
                <div
                  className={`p-4 rounded-2xl border ${
                    currentEnv === "home"
                      ? "border-emerald-500/50 bg-emerald-950/20"
                      : "border-zinc-800 bg-zinc-950/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>🏠 Home Studio Kit</span>
                    </h3>
                    {currentEnv === "home" && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        Current Context
                      </span>
                    )}
                  </div>
                  <ul className="text-xs text-zinc-300 space-y-1.5">
                    {DEFAULT_GEAR_PROFILE.studioKit.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cameras & Lenses Overview */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-3">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Sensors & Glass Roster
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500 block mb-1.5 font-semibold">Cameras:</span>
                    <ul className="space-y-1 text-zinc-200">
                      {DEFAULT_GEAR_PROFILE.cameras.map((c, i) => (
                        <li key={i}>&bull; {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1.5 font-semibold">Lenses:</span>
                    <ul className="space-y-1 text-zinc-200">
                      {DEFAULT_GEAR_PROFILE.lenses.map((l, i) => (
                        <li key={i}>&bull; {l}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Audio & Motion Gear */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Audio */}
                {DEFAULT_GEAR_PROFILE.audio && (
                  <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-2 text-xs">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      🎙 Audio Capture System
                    </h4>
                    <ul className="space-y-1 text-zinc-300">
                      {DEFAULT_GEAR_PROFILE.audio.map((a, i) => (
                        <li key={i}>&bull; {a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Support & Motion */}
                {DEFAULT_GEAR_PROFILE.supportAndMotion && (
                  <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-2 text-xs">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      🎬 Support & Motion Rigging
                    </h4>
                    <ul className="space-y-1 text-zinc-300">
                      {DEFAULT_GEAR_PROFILE.supportAndMotion.map((s, i) => (
                        <li key={i}>&bull; {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Lighting & Computing Setup */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-3 text-xs">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Lighting, Grip & Post Hardware
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-300">
                  <div>
                    <span className="text-zinc-500 block mb-1 font-semibold">Lighting & Grip:</span>
                    <ul className="space-y-1">
                      {DEFAULT_GEAR_PROFILE.lighting.map((lg, i) => (
                        <li key={i}>&bull; {lg}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1 font-semibold">Post Hardware & Displays:</span>
                    <p className="mb-1">&bull; {DEFAULT_GEAR_PROFILE.editingSetup.hardware}</p>
                    <p className="mb-1">&bull; {DEFAULT_GEAR_PROFILE.editingSetup.monitors}</p>
                    <p className="text-zinc-400">
                      &bull; Software: {DEFAULT_GEAR_PROFILE.editingSetup.software.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowGearSheet(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-850 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>Strags Photography & Videography Hub &copy; 2026</p>
          <p className="flex items-center gap-2 font-mono">
            <span className="capitalize">{currentMedium} Track Active</span>
            <span>&bull;</span>
            <span className="text-zinc-300">
              {currentEnv === "road" ? "✈️ Road Context" : "🏠 Home Studio Context"}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
