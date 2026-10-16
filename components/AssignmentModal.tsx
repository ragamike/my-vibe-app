"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Assignment,
  AssignmentPlanningData,
  AssignmentReflectionData,
  AssignmentStatus,
  ChecklistItem,
  GearCompatibilityReport,
  GearCompatibilityStatus,
  InspirationAsset,
} from "@/lib/types";

interface AssignmentModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: (
    assignmentId: string,
    planning: AssignmentPlanningData,
    reflection: AssignmentReflectionData,
    status: AssignmentStatus
  ) => void;
  onMarkCompleted: (
    assignmentId: string,
    planning: AssignmentPlanningData,
    reflection: AssignmentReflectionData
  ) => void;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: "c1", text: "Batteries charged & backup power ready", completed: false },
  { id: "c2", text: "Storage formatted & write-speeds verified", completed: false },
  { id: "c3", text: "Optical elements & filters cleaned (NiSi VND / UV)", completed: false },
  { id: "c4", text: "Calibration & exposure metering verified (Waveform / Zone)", completed: false },
  { id: "c5", text: "Audio transmitter gain staged & scratch sync recorded", completed: false },
  { id: "c6", text: "Shot list & compositional blocking reviewed", completed: false },
];

function getThumbnailForUrl(url: string, explicitThumb?: string): string {
  if (explicitThumb && explicitThumb.trim() !== "") {
    return explicitThumb;
  }
  const cleanUrl = url.trim().toLowerCase();
  // Direct image URLs
  if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/)) {
    return url;
  }
  // YouTube thumbnail
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  // Unsplash image URL
  if (cleanUrl.includes("unsplash.com/photos/")) {
    return "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80";
  }
  // Generic high-quality visual placeholder based on topic
  return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80";
}

export default function AssignmentModal({
  assignment,
  isOpen,
  onClose,
  onSaveDraft,
  onMarkCompleted,
}: AssignmentModalProps) {
  const [activeTab, setActiveTab] = useState<"planning" | "reflection">("planning");

  // Planning state
  const [inspirationAssets, setInspirationAssets] = useState<InspirationAsset[]>([]);
  const [newAssetTitle, setNewAssetTitle] = useState("");
  const [newAssetUrl, setNewAssetUrl] = useState("");
  const [newAssetThumb, setNewAssetThumb] = useState("");
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);

  const [freeFormNotes, setFreeFormNotes] = useState("");
  const [gearReport, setGearReport] = useState<GearCompatibilityReport>({
    status: "compatible",
    notes: "",
    flaggedItems: [],
  });
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [newChecklistText, setNewChecklistText] = useState("");

  // Reflection state
  const [whatWorkedWell, setWhatWorkedWell] = useState("");
  const [technicalAdjustments, setTechnicalAdjustments] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [completedAt, setCompletedAt] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<AssignmentStatus>("available");

  // Tracking dirty state for cancel confirmation
  const [initialSnapshot, setInitialSnapshot] = useState<string>("");
  const [lastAutoSavedTime, setLastAutoSavedTime] = useState<string | null>(null);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  // Initialize or load from localStorage on assignment change
  useEffect(() => {
    if (!assignment || !isOpen) return;

    const storageKey = `assignment_data_${assignment.id}`;
    let loadedPlanning: AssignmentPlanningData = {
      inspirationAssets: [],
      freeFormNotes: "",
      gearCompatibility: {
        status: "compatible",
        notes: "",
        flaggedItems: [],
      },
      checklist: DEFAULT_CHECKLIST,
    };

    let loadedReflection: AssignmentReflectionData = {
      whatWorkedWell: "",
      technicalAdjustments: "",
      submissionUrl: "",
    };

    let loadedStatus: AssignmentStatus = assignment.status;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.planning) loadedPlanning = parsed.planning;
        if (parsed.reflection) loadedReflection = parsed.reflection;
        if (parsed.status) loadedStatus = parsed.status;
        if (parsed.reflection?.completedAt) {
          setCompletedAt(parsed.reflection.completedAt);
        }
      } else {
        // Fallback to sample inspiration if empty
        if (assignment.planning?.inspirationAssets?.length) {
          loadedPlanning.inspirationAssets = assignment.planning.inspirationAssets;
        } else {
          loadedPlanning.inspirationAssets = [
            {
              id: "sample-1",
              title: "Cinematic Aspect Ratio Reference",
              url: "https://shotdeck.com",
              thumbnailUrl:
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
              notes: "Look at the lighting gradient across the cheekbone.",
            },
          ];
        }
        if (assignment.planning?.freeFormNotes) {
          loadedPlanning.freeFormNotes = assignment.planning.freeFormNotes;
        }
      }
    } catch {
      // localStorage read fallback
    }

    setInspirationAssets(loadedPlanning.inspirationAssets || []);
    setFreeFormNotes(loadedPlanning.freeFormNotes || "");
    setGearReport(
      loadedPlanning.gearCompatibility || {
        status: "compatible",
        notes: "",
        flaggedItems: [],
      }
    );
    setChecklist(
      loadedPlanning.checklist && loadedPlanning.checklist.length > 0
        ? loadedPlanning.checklist
        : DEFAULT_CHECKLIST
    );

    setWhatWorkedWell(loadedReflection.whatWorkedWell || "");
    setTechnicalAdjustments(loadedReflection.technicalAdjustments || "");
    setSubmissionUrl(loadedReflection.submissionUrl || "");
    setStatus(loadedStatus);
    setActiveTab("planning");

    const snapshot = JSON.stringify({
      planning: loadedPlanning,
      reflection: loadedReflection,
      status: loadedStatus,
    });
    setInitialSnapshot(snapshot);
    setLastAutoSavedTime(new Date().toLocaleTimeString());
  }, [assignment, isOpen]);

  // Current state object
  const currentPlanning = useMemo<AssignmentPlanningData>(() => {
    return {
      inspirationAssets,
      freeFormNotes,
      gearCompatibility: gearReport,
      checklist,
    };
  }, [inspirationAssets, freeFormNotes, gearReport, checklist]);

  const currentReflection = useMemo<AssignmentReflectionData>(() => {
    return {
      whatWorkedWell,
      technicalAdjustments,
      submissionUrl,
      completedAt,
    };
  }, [whatWorkedWell, technicalAdjustments, submissionUrl, completedAt]);

  // Check if form is dirty
  const isDirty = useMemo(() => {
    if (!initialSnapshot) return false;
    const currentSnapshot = JSON.stringify({
      planning: currentPlanning,
      reflection: currentReflection,
      status,
    });
    return currentSnapshot !== initialSnapshot;
  }, [currentPlanning, currentReflection, status, initialSnapshot]);

  // Save to localStorage helper
  const persistToStorage = useCallback(
    (targetStatus?: AssignmentStatus) => {
      if (!assignment) return;
      const finalStatus = targetStatus || (status === "available" && isDirty ? "in-progress" : status);
      const dataToSave = {
        assignmentId: assignment.id,
        status: finalStatus,
        planning: currentPlanning,
        reflection: currentReflection,
        updatedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(`assignment_data_${assignment.id}`, JSON.stringify(dataToSave));
        setLastAutoSavedTime(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Failed to save draft to localStorage:", err);
      }
      return finalStatus;
    },
    [assignment, currentPlanning, currentReflection, status, isDirty]
  );

  // Auto-save debounced or on blur
  useEffect(() => {
    if (!assignment || !isOpen || !isDirty) return;
    const timer = setTimeout(() => {
      persistToStorage();
    }, 2000);
    return () => clearTimeout(timer);
  }, [assignment, isOpen, isDirty, persistToStorage]);

  if (!isOpen || !assignment) return null;

  // Handlers for Inspiration Assets
  const handleAddInspiration = () => {
    if (!newAssetUrl.trim()) return;
    const finalThumb = getThumbnailForUrl(newAssetUrl, newAssetThumb);
    const newAsset: InspirationAsset = {
      id: `insp-${Date.now()}`,
      title: newAssetTitle.trim() || "Visual Reference",
      url: newAssetUrl.trim(),
      thumbnailUrl: finalThumb,
    };
    setInspirationAssets((prev) => [...prev, newAsset]);
    setNewAssetTitle("");
    setNewAssetUrl("");
    setNewAssetThumb("");
    setShowAddAssetForm(false);
  };

  const handleRemoveInspiration = (id: string) => {
    setInspirationAssets((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Checklist
  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    const newItem: ChecklistItem = {
      id: `check-${Date.now()}`,
      text: newChecklistText.trim(),
      completed: false,
    };
    setChecklist((prev) => [...prev, newItem]);
    setNewChecklistText("");
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Gear Flags
  const toggleFlaggedGear = (gearName: string) => {
    setGearReport((prev) => {
      const exists = prev.flaggedItems.includes(gearName);
      const updatedFlags = exists
        ? prev.flaggedItems.filter((i) => i !== gearName)
        : [...prev.flaggedItems, gearName];

      const autoStatus: GearCompatibilityStatus =
        updatedFlags.length === 0 ? "compatible" : prev.status === "compatible" ? "adapted" : prev.status;

      return {
        ...prev,
        flaggedItems: updatedFlags,
        status: autoStatus,
      };
    });
  };

  // Save Draft & Close
  const handleSaveDraftAndClose = () => {
    const updatedStatus = persistToStorage();
    onSaveDraft(assignment.id, currentPlanning, currentReflection, updatedStatus || status);
    onClose();
  };

  // Cancel Handler with confirmation
  const handleCancelClick = () => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardDialog(false);
    onClose();
  };

  // Mark Completed & Seal Task
  const handleCompleteTask = () => {
    const now = new Date().toISOString();
    setCompletedAt(now);
    setStatus("completed");
    persistToStorage("completed");
    onMarkCompleted(assignment.id, currentPlanning, { ...currentReflection, completedAt: now });
  };

  const completedChecklistCount = checklist.filter((c) => c.completed).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full flex flex-col shadow-2xl overflow-hidden my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-zinc-950/60 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  Unit {assignment.unitNumber}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Tier {assignment.difficultyTier}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-750">
                  {assignment.medium === "photography" ? "📸 Photography" : "🎬 Videography"}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  {assignment.environment === "road" ? "✈️ Road" : "🏠 Home Studio"}
                </span>
                {status === "completed" ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <span>✓</span> Sealed & Completed
                  </span>
                ) : status === "in-progress" ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    Draft in Progress
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Ready
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {assignment.title}
              </h2>
            </div>

            <button
              onClick={handleCancelClick}
              className="w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              title="Close or Cancel"
            >
              ✕
            </button>
          </div>

          {/* Section Segmented Switcher */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveTab("planning")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "planning"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-bold shadow-md shadow-amber-950/40"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🎯</span>
                <span>Planning & Pre-Vis</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-black font-mono">
                  {completedChecklistCount}/{checklist.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reflection")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "reflection"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-zinc-950 font-bold shadow-md shadow-cyan-950/40"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>📝</span>
                <span>Reflection & Submission</span>
                {status === "completed" && <span className="text-emerald-400 text-xs">✓</span>}
              </button>
            </div>

            {/* Auto-save indicator */}
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Draft auto-saving to local storage</span>
              {lastAutoSavedTime && <span>({lastAutoSavedTime})</span>}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* ========================================================================= */}
          {/* TAB 1: PLANNING & PRE-VIS */}
          {/* ========================================================================= */}
          {activeTab === "planning" && (
            <div className="space-y-6">
              {/* Challenge Brief Accordion / Overview */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                  <span>📋</span> Assignment Rubric & Protocol:
                </span>
                <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans whitespace-pre-line pl-1 border-l-2 border-amber-500/40">
                  {assignment.promptMarkdown}
                </div>
              </div>

              {/* 1. Inspiration Assets Section with Visual Thumbnails */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>🖼️</span> Inspiration Assets & Visual Moodboard
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Link third-party visual benchmarks, ShotDeck stills, or video references with live previews.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddAssetForm((prev) => !prev)}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{showAddAssetForm ? "− Cancel" : "+ Add Asset Link"}</span>
                  </button>
                </div>

                {/* Add Asset Sub-form */}
                {showAddAssetForm && (
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-zinc-400 mb-1">Asset Title / Creator:</label>
                        <input
                          type="text"
                          placeholder="e.g., Deakins Window Rim Contrast"
                          value={newAssetTitle}
                          onChange={(e) => setNewAssetTitle(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-750 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1">Reference URL (Required):</label>
                        <input
                          type="url"
                          placeholder="https://shotdeck.com/... or YouTube / Instagram / Image link"
                          value={newAssetUrl}
                          onChange={(e) => setNewAssetUrl(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-750 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">
                        Optional Direct Thumbnail URL (Auto-detected if left empty):
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or image file URL"
                        value={newAssetThumb}
                        onChange={(e) => setNewAssetThumb(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-750 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddAssetForm(false)}
                        className="px-3 py-1 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddInspiration}
                        className="px-3.5 py-1 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors cursor-pointer"
                      >
                        Save Asset
                      </button>
                    </div>
                  </div>
                )}

                {/* Inspiration Assets Grid with Visual Thumbnails */}
                {inspirationAssets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {inspirationAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="group relative rounded-xl border border-zinc-800 bg-zinc-950/70 overflow-hidden flex flex-col hover:border-zinc-700 transition-all shadow-sm"
                      >
                        {/* Thumbnail Image Header */}
                        <div className="relative h-28 w-full bg-zinc-900 overflow-hidden">
                          {asset.thumbnailUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={asset.thumbnailUrl}
                              alt={asset.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback on broken image
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-mono">
                              No Preview
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveInspiration(asset.id)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-red-600 text-white text-xs flex items-center justify-center transition-colors cursor-pointer"
                            title="Remove asset"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Caption & Link */}
                        <div className="p-2.5 flex flex-col justify-between flex-1 gap-1.5">
                          <span className="text-xs font-semibold text-zinc-200 line-clamp-1">
                            {asset.title}
                          </span>
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 font-mono truncate"
                          >
                            <span>Open Link</span>
                            <span className="text-[10px]">&rarr;</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border border-dashed border-zinc-800 text-center text-xs text-zinc-500">
                    No inspiration links added yet. Click &ldquo;+ Add Asset Link&rdquo; to attach visual benchmarks.
                  </div>
                )}
              </div>

              {/* 2. Free-Form Planning Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <span>📝</span> Free-Form Planning Notes & Shot Architecture
                  </label>
                  <span className="text-[11px] font-mono text-zinc-500">Markdown enabled</span>
                </div>
                <textarea
                  rows={4}
                  value={freeFormNotes}
                  onChange={(e) => setFreeFormNotes(e.target.value)}
                  placeholder="Outline your lighting diagram, blocking coordinates, intended f-stop thresholds, C-Log2 IRE targets, or camera movement notes here..."
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors font-sans leading-relaxed"
                />
              </div>

              {/* 3. Gear Compatibility Check & Flag/Reporting */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>⚙️</span> Gear Compatibility & Readiness Check
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Verify your kit requirements and report any missing items or alternative adaptations.
                    </p>
                  </div>

                  {/* Compatibility Status Selector */}
                  <select
                    value={gearReport.status}
                    onChange={(e) =>
                      setGearReport((prev) => ({
                        ...prev,
                        status: e.target.value as GearCompatibilityStatus,
                      }))
                    }
                    className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="compatible">✓ Full Compatibility (All Gear Available)</option>
                    <option value="adapted">⚠️ Adapted Setup (Using Alternatives)</option>
                    <option value="missing-gear">✕ Missing Essential Gear</option>
                  </select>
                </div>

                {/* Required Gear Check / Flagging Chips */}
                <div className="pt-1">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Click items to flag missing or substituted equipment:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {assignment.requiredGear.map((gear, idx) => {
                      const isFlagged = gearReport.flaggedItems.includes(gear);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleFlaggedGear(gear)}
                          className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                            isFlagged
                              ? "bg-red-500/15 border-red-500/50 text-red-300 font-medium"
                              : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                          }`}
                        >
                          <span>{isFlagged ? "⚠️ Flagged:" : "•"}</span>
                          <span>{gear}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Compatibility Notes / Adaptation Report */}
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Gear Notes & Adaptation Report (Optional):
                  </label>
                  <input
                    type="text"
                    value={gearReport.notes}
                    onChange={(e) =>
                      setGearReport((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder="e.g., Using 35mm f/1.8 with 82mm step-up ring instead of native prime; daylight window in lieu of FS-300B"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* 4. Interactive Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>✅</span> Pre-Shoot Technical Checklist
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {completedChecklistCount} of {checklist.length} pre-vis items verified
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                        item.completed
                          ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                          : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {}} // handled by div click
                          className="w-4 h-4 rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span
                          className={`text-xs ${
                            item.completed ? "line-through text-zinc-400" : ""
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveChecklistItem(item.id);
                        }}
                        className="text-zinc-600 hover:text-red-400 text-xs px-1"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Custom Checklist Item */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    placeholder="Add custom pre-production step..."
                    onKeyDown={(e) => e.key === "Enter" && handleAddChecklistItem()}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddChecklistItem}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
                  >
                    + Add Step
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: REFLECTION & SUBMISSION */}
          {/* ========================================================================= */}
          {activeTab === "reflection" && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  status === "completed"
                    ? "bg-emerald-950/30 border-emerald-500/40"
                    : "bg-zinc-950/80 border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {status === "completed" ? "🏆" : "🎯"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {status === "completed"
                        ? "Challenge Completed & Sealed"
                        : "Ready for Reflection & Submission"}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {status === "completed" && completedAt
                        ? `Sealed on ${new Date(completedAt).toLocaleDateString()} at ${new Date(
                            completedAt
                          ).toLocaleTimeString()}`
                        : "Document your technical execution, aesthetic findings, and final delivery asset link."}
                    </p>
                  </div>
                </div>

                {status === "completed" && (
                  <button
                    type="button"
                    onClick={() => setStatus("in-progress")}
                    className="px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors cursor-pointer"
                  >
                    Unseal to Edit
                  </button>
                )}
              </div>

              {/* Input 1: What Worked Well */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span>✨</span> What Worked Well (Creative Breakthroughs & Successes)
                </label>
                <textarea
                  rows={3}
                  value={whatWorkedWell}
                  onChange={(e) => setWhatWorkedWell(e.target.value)}
                  placeholder="Detail optical sharpness, micro-contrast, effective lighting ratios, color temperature harmony, or seamless camera motion..."
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Input 2: Technical Adjustments */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔧</span> Technical Adjustments & What Didn&apos;t Go as Planned
                </label>
                <textarea
                  rows={3}
                  value={technicalAdjustments}
                  onChange={(e) => setTechnicalAdjustments(e.target.value)}
                  placeholder="Note diffraction softness, unexpected highlight clipping, audio signal noise, sensor reflections, or gimbal balance issues that required field adaptation..."
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Input 3: Final Submission Link */}
              <div className="space-y-2 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔗</span> Final Submission Asset Link (Video / Stills / Portfolio)
                </label>
                <p className="text-xs text-zinc-400">
                  Provide a link to your final deliverable (e.g., Frame.io, Google Drive, YouTube unlisted, Behance, Flickr, Dropbox).
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://drive.google.com/... or https://frame.io/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                  />
                  {submissionUrl && (
                    <a
                      href={submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-cyan-400 border border-zinc-700 transition-colors flex items-center gap-1"
                    >
                      <span>Visit</span>
                      <span>&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveDraftAndClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>💾</span>
              <span>Save Draft & Close</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "planning" ? (
              <button
                type="button"
                onClick={() => setActiveTab("reflection")}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Continue to Reflection</span>
                <span>&rarr;</span>
              </button>
            ) : status !== "completed" ? (
              <button
                type="button"
                onClick={handleCompleteTask}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>✓</span>
                <span>Mark as Completed & Seal</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveDraftAndClose}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors cursor-pointer"
              >
                ✓ Task Sealed (Close)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Discard Edits Safety Confirmation Dialog */}
      {showDiscardDialog && (
        <div
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowDiscardDialog(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-5 flex flex-col gap-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-amber-400">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-base font-bold text-white">Discard Unsaved Changes?</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              You have modified your planning notes or reflection inputs. If you cancel without saving, your recent edits will be discarded.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDiscardDialog(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
              >
                Keep Editing
              </button>
              <button
                type="button"
                onClick={handleConfirmDiscard}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              >
                Discard & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
