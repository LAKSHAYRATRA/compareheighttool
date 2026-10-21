"use client";

import React, { useState, useRef, useEffect } from "react";
import { ComparisonEntity, UnitMode } from "@/types/comparison";
import { Silhouette } from "./Silhouettes";
import {
  Download,
  Eye,
  Plus,
  Trash2,
  RefreshCw,
  Share2,
  Check,
  MoveHorizontal,
  Ruler,
  Edit2,
  Move,
  X,
  Layers,
} from "lucide-react";
import { Locale } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";

interface HeightCanvasProps {
  initialEntities?: ComparisonEntity[];
  title?: string;
  unitDefault?: UnitMode;
  showToolbarControls?: boolean;
  currentLocale?: Locale;
}

const DEFAULT_ENTITIES: ComparisonEntity[] = [
  {
    id: "person-1",
    name: "Person A",
    heightCm: 175,
    type: "male",
    color: "#3b82f6",
    category: "person",
    xOffset: -80,
    opacity: 0.85,
  },
  {
    id: "person-2",
    name: "Person B",
    heightCm: 162.5,
    type: "female",
    color: "#ec4899",
    category: "person",
    xOffset: 80,
    opacity: 0.85,
  },
];

const PRESET_COLORS = [
  "#2563eb", // Calm Slate Blue
  "#e11d48", // Rose Clay
  "#059669", // Sage Green
  "#d97706", // Honey Amber
  "#7c3aed", // Soft Violet
  "#0d9488", // Ocean Teal
  "#ea580c", // Warm Terracotta
  "#475569", // Warm Slate
];

export function HeightCanvas({
  initialEntities = DEFAULT_ENTITIES,
  title,
  unitDefault = "imperial",
  showToolbarControls = true,
  currentLocale = "en",
}: HeightCanvasProps) {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
  // Ensure every entity has an xOffset and opacity initialized
  const [entities, setEntities] = useState<ComparisonEntity[]>(() => {
    return initialEntities.map((ent, idx) => ({
      ...ent,
      xOffset:
        ent.xOffset !== undefined
          ? ent.xOffset
          : (idx - (initialEntities.length - 1) / 2) * 140,
      opacity: ent.opacity !== undefined ? ent.opacity : 0.88,
    }));
  });

  const [unit, setUnit] = useState<UnitMode>(unitDefault);
  const [showEyeLine, setShowEyeLine] = useState(false);
  const [showDelta, setShowDelta] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);

  // Dragging state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartXRef = useRef<number>(0);
  const initialOffsetRef = useRef<number>(0);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Conversion helpers
  const cmToFtIn = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    if (inches === 12) {
      return `${feet + 1}'0"`;
    }
    return `${feet}'${inches}"`;
  };

  const formatHeight = (cm: number) => {
    if (unit === "metric") {
      return `${Math.round(cm)} cm`;
    }
    return `${cmToFtIn(cm)} (${Math.round(cm)} cm)`;
  };

  // Canvas scaling bounds: Base height max between 225cm or tallest entity + margin
  const maxHeight = Math.max(225, ...entities.map((e) => e.heightCm)) * 1.14;

  // Dragging handlers (Mouse + Touch for mobile/desktop parity)
  const handlePointerDown = (id: string, clientX: number) => {
    const ent = entities.find((e) => e.id === id);
    if (!ent) return;
    setDraggingId(id);
    dragStartXRef.current = clientX;
    initialOffsetRef.current = ent.xOffset || 0;
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingId) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - dragStartXRef.current;
      const newOffset = initialOffsetRef.current + deltaX;

      // Bound within canvas approximate limits (-500px to +500px)
      const boundedOffset = Math.max(-520, Math.min(520, newOffset));

      setEntities((prev) =>
        prev.map((item) =>
          item.id === draggingId ? { ...item, xOffset: boundedOffset } : item
        )
      );
    };

    const handlePointerUp = () => {
      setDraggingId(null);
    };

    if (draggingId) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchmove", handlePointerMove);
      window.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [draggingId]);

  // Entity mutations
  const handleAddPerson = (gender: "male" | "female") => {
    const newId = `person-${Date.now()}`;
    const newHeight = gender === "male" ? 178 : 165;
    const color = PRESET_COLORS[entities.length % PRESET_COLORS.length];
    const newOffset = (entities.length % 2 === 0 ? 1 : -1) * (entities.length * 60);

    setEntities([
      ...entities,
      {
        id: newId,
        name: `Person ${entities.length + 1}`,
        heightCm: newHeight,
        type: gender,
        color,
        category: "person",
        xOffset: newOffset,
        opacity: 0.85,
      },
    ]);
  };

  const handleAddObject = (type: "door" | "refrigerator" | "basketball_hoop") => {
    const newId = `obj-${Date.now()}`;
    const presets = {
      door: { name: "Standard Door (6'8\")", heightCm: 203, color: "#854d0e" },
      refrigerator: { name: "Refrigerator", heightCm: 175, color: "#64748b" },
      basketball_hoop: { name: "Basketball Rim (10'0\")", heightCm: 304.8, color: "#ea580c" },
    };
    const obj = presets[type];
    const newOffset = (entities.length % 2 === 0 ? 1 : -1) * (entities.length * 60);

    setEntities([
      ...entities,
      {
        id: newId,
        name: obj.name,
        heightCm: obj.heightCm,
        type,
        color: obj.color,
        category: "object",
        xOffset: newOffset,
        opacity: 0.85,
      },
    ]);
  };

  const handleUpdateHeight = (id: string, cm: number) => {
    setEntities(
      entities.map((e) =>
        e.id === id ? { ...e, heightCm: Math.max(30, Math.min(320, cm)) } : e
      )
    );
  };

  const handleUpdateName = (id: string, name: string) => {
    setEntities(entities.map((e) => (e.id === id ? { ...e, name } : e)));
  };

  const handleUpdateColor = (id: string, color: string) => {
    setEntities(entities.map((e) => (e.id === id ? { ...e, color } : e)));
  };

  const handleRemove = (id: string) => {
    if (entities.length <= 1) return;
    setEntities(entities.filter((e) => e.id !== id));
    if (activeEditingId === id) setActiveEditingId(null);
  };

  const handleReset = () => {
    setEntities(
      initialEntities.map((ent, idx) => ({
        ...ent,
        xOffset:
          ent.xOffset !== undefined
            ? ent.xOffset
            : (idx - (initialEntities.length - 1) / 2) * 140,
        opacity: 0.88,
      }))
    );
    setActiveEditingId(null);
  };

  // Align side-by-side evenly
  const handleAutoAlign = () => {
    const total = entities.length;
    const spacing = 140;
    setEntities(
      entities.map((ent, idx) => ({
        ...ent,
        xOffset: (idx - (total - 1) / 2) * spacing,
      }))
    );
  };

  // Center overlap for precise silhouette comparison
  const handleOverlapAll = () => {
    setEntities(
      entities.map((ent) => ({
        ...ent,
        xOffset: 0,
      }))
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // High-Resolution PNG Export (Pure client-side HTML5 Canvas)
  const handleExportPng = () => {
    setIsExporting(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Background Warm Linen
    ctx.fillStyle = "#faf9f6";
    ctx.fillRect(0, 0, width, height);

    // Title & Branding
    ctx.fillStyle = "#1c1917";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title || "Visual Height Comparison - compareheighttool.com", width / 2, 60);

    // Grid baseline
    const groundY = height - 120;
    ctx.strokeStyle = "#78716c";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(80, groundY);
    ctx.lineTo(width - 80, groundY);
    ctx.stroke();

    // Rulers and tick marks
    const maxVal = Math.max(240, ...entities.map((e) => e.heightCm));
    const pxPerCm = (groundY - 140) / maxVal;

    ctx.strokeStyle = "#e5e2db";
    ctx.fillStyle = "#57534e";
    ctx.font = "14px monospace";
    ctx.textAlign = "left";

    for (let cm = 50; cm <= maxVal; cm += 50) {
      const y = groundY - cm * pxPerCm;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(80, y);
      ctx.lineTo(width - 80, y);
      ctx.stroke();
      ctx.fillText(`${cm} cm / ${cmToFtIn(cm)}`, 85, y - 6);
    }
    ctx.setLineDash([]);

    // Sort by height so shorter silhouettes aren't obscured if overlapping
    const sorted = [...entities].sort((a, b) => b.heightCm - a.heightCm);

    sorted.forEach((ent) => {
      const centerX = width / 2 + (ent.xOffset || 0);
      const entHeightPx = ent.heightCm * pxPerCm;
      const entY = groundY - entHeightPx;
      const entWidthPx = 100;

      // Draw silhouette preview
      ctx.fillStyle = ent.color;
      ctx.globalAlpha = ent.opacity || 0.85;
      ctx.beginPath();
      ctx.roundRect(centerX - entWidthPx / 4, entY, entWidthPx / 2, entHeightPx, 8);
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Top of head marker
      ctx.strokeStyle = ent.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - entWidthPx / 2, entY);
      ctx.lineTo(centerX + entWidthPx / 2, entY);
      ctx.stroke();

      // Labels below ground
      ctx.fillStyle = "#1c1917";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(ent.name, centerX, groundY + 30);

      ctx.fillStyle = "#2563eb";
      ctx.font = "14px monospace";
      ctx.fillText(`${Math.round(ent.heightCm)} cm (${cmToFtIn(ent.heightCm)})`, centerX, groundY + 52);
    });

    // Watermark
    ctx.fillStyle = "#78716c";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Generated with compareheighttool.com (100% Free Client-Side Visualizer)", width / 2, height - 25);

    // Trigger download
    const link = document.createElement("a");
    link.download = `compareheighttool-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setIsExporting(false);
  };

  // Delta calculation
  const deltaCm =
    entities.length >= 2 ? Math.abs(entities[0].heightCm - entities[1].heightCm) : 0;
  const deltaInches = Math.round((deltaCm / 2.54) * 10) / 10;

  // Currently editing entity
  const activeEntity = entities.find((e) => e.id === activeEditingId);

  return (
    <div className="w-full bg-white border border-stone-200/90 rounded-2xl shadow-sm overflow-hidden">
      {/* Top Controls Bar */}
      <div className="bg-[#fcfbf9] px-4 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-stone-700 flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-blue-600" /> {t.unit}:
          </span>
          <div className="inline-flex rounded-lg bg-stone-100 p-0.5 border border-stone-200">
            <button
              onClick={() => setUnit("imperial")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                unit === "imperial"
                  ? "bg-white text-stone-900 shadow-sm font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {t.imperial}
            </button>
            <button
              onClick={() => setUnit("metric")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                unit === "metric"
                  ? "bg-white text-stone-900 shadow-sm font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {t.metric}
            </button>
          </div>
        </div>

        {/* View & Alignment Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAutoAlign}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-sm rounded-lg transition-all"
            title="Space figures side by side"
          >
            <Move className="w-3.5 h-3.5" /> Separate
          </button>
          <button
            onClick={handleOverlapAll}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-sm rounded-lg transition-all"
            title="Overlap figures at center for direct comparison"
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" /> Overlap
          </button>
          <button
            onClick={() => setShowEyeLine(!showEyeLine)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              showEyeLine
                ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold"
                : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 shadow-sm"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> {t.eyeLevel}
          </button>
          <button
            onClick={() => setShowDelta(!showDelta)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              showDelta
                ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 shadow-sm"
            }`}
          >
            <MoveHorizontal className="w-3.5 h-3.5" /> {t.differenceIndicator}
          </button>
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" /> {isExporting ? "..." : t.exportPng}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-lg shadow-sm transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-stone-500" />}
            {copied ? t.copied : t.share}
          </button>
        </div>
      </div>

      {/* Delta Banner */}
      {showDelta && entities.length >= 2 && (
        <div className="bg-stone-50 px-4 py-2 border-b border-stone-200 flex items-center justify-between text-xs text-stone-700">
          <div>
            <span className="font-semibold text-stone-900">{entities[0].name}</span> vs{" "}
            <span className="font-semibold text-stone-900">{entities[1].name}</span>:
            <span className="ml-2 font-mono text-blue-700 font-bold text-sm">
              {deltaCm.toFixed(1)} cm ({deltaInches} inches)
            </span>{" "}
            height difference
          </div>
          <span className="text-stone-500 hidden sm:inline">
            Drag silhouettes horizontally to overlap or space them apart
          </span>
        </div>
      )}

      {/* Interactive Visual Stage */}
      <div
        ref={canvasRef}
        className="relative w-full h-[520px] sm:h-[580px] bg-[#fdfcf9] flex items-end justify-center pb-12 overflow-hidden border-b border-stone-200 select-none touch-none"
      >
        {/* Height Measurement Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[50, 100, 150, 175, 200, 250, 300].map((cm) => {
            if (cm > maxHeight) return null;
            const bottomPercent = (cm / maxHeight) * 100 * 0.85;
            return (
              <div
                key={cm}
                className="absolute left-0 right-0 border-b border-stone-200/80 flex items-center justify-between px-3"
                style={{ bottom: `${bottomPercent}%` }}
              >
                <span className="text-[10px] font-mono text-stone-500 bg-white/90 border border-stone-200/60 px-1 rounded shadow-xs">
                  {cm} cm
                </span>
                <span className="text-[10px] font-mono text-stone-500 bg-white/90 border border-stone-200/60 px-1 rounded shadow-xs">
                  {cmToFtIn(cm)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Ground Baseline */}
        <div className="absolute bottom-10 left-0 right-0 h-0.5 bg-stone-400" />
        <div className="absolute bottom-4 left-0 right-0 text-center text-[11px] text-stone-500 font-mono tracking-wider uppercase pointer-events-none">
          Ground Level (0 cm / 0&apos;0&quot;) • Drag Figures Horizontally to Overlap
        </div>

        {/* Drag Instruction Cue */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-1.5 text-[11px] text-stone-600 bg-white/90 px-2.5 py-1 rounded-md border border-stone-200 shadow-sm">
          <Move className="w-3.5 h-3.5 text-stone-500" />
          <span>{t.dragHint}</span>
        </div>

        {/* Floating Fast-Edit Modal (Pop-up on Canvas when Edit Icon is clicked) */}
        {activeEntity && (
          <div className="absolute top-4 right-4 z-50 bg-white border border-stone-200 rounded-xl p-4 shadow-xl w-72 space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                {t.editFigure}: {activeEntity.name}
              </span>
              <button
                onClick={() => setActiveEditingId(null)}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-stone-500 font-medium">Name</label>
              <input
                type="text"
                value={activeEntity.name}
                onChange={(e) => handleUpdateName(activeEntity.id, e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-900 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-stone-500 font-medium">
                <span>Height</span>
                <span className="font-mono text-blue-700 font-semibold">
                  {formatHeight(activeEntity.heightCm)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="260"
                value={Math.round(activeEntity.heightCm)}
                onChange={(e) =>
                  handleUpdateHeight(activeEntity.id, parseFloat(e.target.value))
                }
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Quick Feet/Inch Inputs */}
            {unit === "imperial" && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1">
                  <label className="text-[10px] text-stone-500 block font-medium">Feet</label>
                  <select
                    value={Math.floor(activeEntity.heightCm / 2.54 / 12)}
                    onChange={(e) => {
                      const newFeet = parseInt(e.target.value);
                      const currentInches = Math.round(
                        (activeEntity.heightCm / 2.54) % 12
                      );
                      handleUpdateHeight(
                        activeEntity.id,
                        (newFeet * 12 + currentInches) * 2.54
                      );
                    }}
                    className="w-full bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1 text-stone-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((f) => (
                      <option key={f} value={f}>
                        {f} ft
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-stone-500 block font-medium">Inches</label>
                  <select
                    value={Math.round((activeEntity.heightCm / 2.54) % 12)}
                    onChange={(e) => {
                      const currentFeet = Math.floor(
                        activeEntity.heightCm / 2.54 / 12
                      );
                      const newInches = parseInt(e.target.value);
                      handleUpdateHeight(
                        activeEntity.id,
                        (currentFeet * 12 + newInches) * 2.54
                      );
                    }}
                    className="w-full bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1 text-stone-900 focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inch) => (
                      <option key={inch} value={inch}>
                        {inch} in
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Color Palette in Popup */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] text-stone-500 font-medium block">Color</label>
              <div className="flex items-center gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleUpdateColor(activeEntity.id, c)}
                    style={{ backgroundColor: c }}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      activeEntity.color === c
                        ? "ring-2 ring-stone-900 scale-110"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveEditingId(null)}
              className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold mt-2 shadow-sm transition-all"
            >
              Done Editing
            </button>
          </div>
        )}

        {/* Figures Container with Absolute Drag Offsets */}
        <div className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none">
          {entities.map((entity) => {
            const stageHeightPx = 440;
            const figureHeightPx = (entity.heightCm / maxHeight) * stageHeightPx;
            const figureWidthPx = Math.min(140, Math.max(75, figureHeightPx * 0.42));
            const eyeLevelBottomPx =
              entity.category === "person" ? figureHeightPx * 0.91 : figureHeightPx;
            const isDraggingThis = draggingId === entity.id;

            return (
              <div
                key={entity.id}
                className={`absolute bottom-10 flex flex-col items-center justify-end pointer-events-auto transition-transform ${
                  isDraggingThis ? "cursor-grabbing z-30 scale-[1.02]" : "cursor-grab z-10"
                }`}
                style={{
                  transform: `translateX(${entity.xOffset || 0}px)`,
                  height: `${figureHeightPx}px`,
                  minWidth: `${figureWidthPx}px`,
                }}
                onMouseDown={(e) => {
                  // Only drag if not clicking buttons
                  if ((e.target as HTMLElement).closest("button")) return;
                  handlePointerDown(entity.id, e.clientX);
                }}
                onTouchStart={(e) => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  handlePointerDown(entity.id, e.touches[0].clientX);
                }}
              >
                {/* Silhouette Name, Height Badge & On-Canvas Edit Icon above Head */}
                <div className="absolute -top-16 flex flex-col items-center whitespace-nowrap z-20 group">
                  <div className="flex items-center gap-1.5 bg-white/95 hover:bg-white px-2.5 py-1 rounded-full border border-stone-200/90 shadow-md transition-all">
                    <span className="text-xs font-semibold text-stone-900">
                      {entity.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEditingId(entity.id);
                      }}
                      className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 shadow-xs transition-all hover:scale-110"
                      title="Edit this figure's height"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-blue-700 font-semibold drop-shadow-xs mt-0.5">
                    {formatHeight(entity.heightCm)}
                  </span>
                </div>

                {/* Top of Head Alignment Line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-28 border-t border-dashed border-stone-400/80 pointer-events-none"
                  style={{ top: 0 }}
                />

                {/* Eye Level Line */}
                {showEyeLine && entity.category === "person" && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-32 border-t border-blue-500 pointer-events-none flex items-center justify-center"
                    style={{ bottom: `${eyeLevelBottomPx}px` }}
                  >
                    <span className="absolute -top-3.5 text-[9px] font-mono text-blue-800 bg-white border border-blue-200 px-1 rounded shadow-xs">
                      Eye: {formatHeight(entity.heightCm * 0.91)}
                    </span>
                  </div>
                )}

                {/* Vector Silhouette with semi-transparent opacity for overlapping clarity */}
                <div
                  style={{ opacity: entity.opacity || 0.88 }}
                  className="transition-opacity hover:opacity-100"
                >
                  <Silhouette
                    type={entity.type}
                    color={entity.color}
                    width={figureWidthPx}
                    height={figureHeightPx}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Entity Management Workspace */}
      {showToolbarControls && (
        <div className="p-4 sm:p-6 bg-[#faf9f6] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <h3 className="text-sm font-semibold text-stone-800">
              {t.addFigure}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleAddPerson("male")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> + {t.male}
              </button>
              <button
                onClick={() => handleAddPerson("female")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> + {t.female}
              </button>
              <button
                onClick={() => handleAddObject("door")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-stone-700 hover:bg-stone-800 text-stone-100 rounded-lg shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Door (203 cm)
              </button>
              <button
                onClick={() => handleAddObject("refrigerator")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-stone-600 hover:bg-stone-700 text-stone-100 rounded-lg shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Fridge
              </button>
              <button
                onClick={() => handleAddObject("basketball_hoop")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-amber-700 hover:bg-amber-800 text-amber-100 rounded-lg shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Hoop (305 cm)
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 transition-all ml-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {t.resetDefault}
              </button>
            </div>
          </div>

          {/* Cards for each entity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {entities.map((entity) => {
              const feet = Math.floor(entity.heightCm / 2.54 / 12);
              const inches = Math.round((entity.heightCm / 2.54) % 12);

              return (
                <div
                  key={entity.id}
                  className="bg-white border border-stone-200/90 rounded-xl p-3.5 space-y-3 relative group hover:border-stone-300 shadow-xs transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={entity.name}
                      onChange={(e) => handleUpdateName(entity.id, e.target.value)}
                      className="bg-stone-50 text-stone-900 text-xs font-semibold px-2.5 py-1 rounded border border-stone-200 focus:bg-white focus:outline-none focus:border-blue-500 w-full"
                    />
                    <button
                      onClick={() => setActiveEditingId(entity.id)}
                      className="text-stone-400 hover:text-blue-600 p-1"
                      title="Quick edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {entities.length > 1 && (
                      <button
                        onClick={() => handleRemove(entity.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        title="Remove figure"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Height Sliders & Controls */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>{t.height}:</span>
                      <span className="font-mono text-blue-700 font-semibold">
                        {formatHeight(entity.heightCm)}
                      </span>
                    </div>

                    {unit === "metric" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="50"
                          max="250"
                          value={Math.round(entity.heightCm)}
                          onChange={(e) =>
                            handleUpdateHeight(entity.id, parseFloat(e.target.value))
                          }
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                        <input
                          type="number"
                          value={Math.round(entity.heightCm)}
                          onChange={(e) =>
                            handleUpdateHeight(entity.id, parseFloat(e.target.value) || 100)
                          }
                          className="w-16 bg-stone-50 border border-stone-200 rounded text-xs text-center font-mono py-1 text-stone-900"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-stone-500">
                          <select
                            value={feet}
                            onChange={(e) => {
                              const newFeet = parseInt(e.target.value);
                              const totalInches = newFeet * 12 + inches;
                              handleUpdateHeight(entity.id, totalInches * 2.54);
                            }}
                            className="bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1 text-stone-900 focus:outline-none"
                          >
                            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((f) => (
                              <option key={f} value={f}>
                                {f} ft
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-stone-500">
                          <select
                            value={inches}
                            onChange={(e) => {
                              const newInches = parseInt(e.target.value);
                              const totalInches = feet * 12 + newInches;
                              handleUpdateHeight(entity.id, totalInches * 2.54);
                            }}
                            className="bg-stone-50 border border-stone-200 rounded text-xs px-2 py-1 text-stone-900 focus:outline-none"
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inch) => (
                              <option key={inch} value={inch}>
                                {inch} in
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="range"
                          min="60"
                          max="250"
                          value={Math.round(entity.heightCm)}
                          onChange={(e) =>
                            handleUpdateHeight(entity.id, parseFloat(e.target.value))
                          }
                          className="w-full accent-blue-600 cursor-pointer ml-1"
                        />
                      </div>
                    )}
                  </div>

                  {/* Color Palette */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-500">{t.color}:</span>
                    <div className="flex items-center gap-1.5">
                      {PRESET_COLORS.slice(0, 6).map((c) => (
                        <button
                          key={c}
                          onClick={() => handleUpdateColor(entity.id, c)}
                          style={{ backgroundColor: c }}
                          className={`w-4 h-4 rounded-full transition-transform ${
                            entity.color === c ? "ring-2 ring-stone-900 scale-110" : "opacity-80 hover:opacity-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

