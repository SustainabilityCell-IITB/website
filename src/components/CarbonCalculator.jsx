import React, { useState } from "react";
import { motion } from "framer-motion";

// ============================================================
// Pure client-side score computation (no backend needed)
// All formulas extracted from the reference app's Resultpage.jsx
// ============================================================
function normalize(value, min, max, newMin, newMax) {
  const clamped = Math.max(min, Math.min(max, value));
  return ((clamped - min) / (max - min)) * (newMax - newMin) + newMin;
}

function scoreFromValue(value, min, max) {
  const normalized = (value - min) / (max - min);
  const score = 10 - normalized * 9;
  return parseFloat(Math.max(1, Math.min(10, score)).toFixed(2));
}

function calculateResults(inputs) {
  const {
    hostelNo = 1, credits = 0, timeLabs = 0, timeLibrary = 0, timeGymkhana = 0,
    dietType = "Vegan", foodOrders = 0,
    outingType = "South Bombay+Cab+meal", outingsMonth = 0, eatOutMonth = 0,
    showers = 0, bathDuration = 1, ecommerce = 0,
  } = inputs || {};

  const n = (v, fb = 0) => Number(v) || fb;
  const nHostelNo   = n(hostelNo, 1);
  const nCredits    = n(credits);
  const nTimeLabs   = n(timeLabs);
  const nTimeLib    = n(timeLibrary);
  const nTimeGym    = n(timeGymkhana);
  const nFoodOrders = n(foodOrders);
  const nOutings    = n(outingsMonth);
  const nEatOut     = n(eatOutMonth);
  const nShowers    = n(showers);
  const nBathDur    = n(bathDuration, 1);
  const nEcommerce  = n(ecommerce);

  const outingEF = {
    "South Bombay+Cab+meal": 518.7198,
    "South Bombay+local+meal": 470.637,
    "South Bombay+local+cab+meal": 494.6784,
    "South Bombay+cab+clubbing": 472.537,
    "Around Powai+cab+meal": 477.04804,
    "Around Powai+rickshaw+meal": 475.835336,
    "Shopping in a mall+rickshaw": 443.7465367,
    "Around Powai+rickshaw+movie": 76.8932,
    "Around Powai+cab+clubbing": 198.7483,
    "Temples in Mumbai+local": 34.7653,
    "Trek+local": 27.9573,
    "Trek+local+cab": 48.0828,
    "Sea-ferry+local": 167.63863,
  };
  const mealEF = {
    Vegan: 158.942, Vegetarian: 112.862, Pescatarian: 470.637,
    Egetarian: 158.812, "White Meat Diet": 486.237, "Red Meat Diet": 494.167,
  };
  const dietWater = {
    Vegan: 1000, Vegetarian: 1200, Pescatarian: 1300,
    Egetarian: 1400, "White Meat Diet": 1500, "Red Meat Diet": 1600,
  };

  const outingEmissions = ((outingEF[outingType] || 0) * nOutings + (mealEF[dietType] || 0) * nEatOut) / 365 + 1.4;
  const elec = 0.25 * nHostelNo + nCredits * 0.1 + nTimeLabs * 0.23 + nTimeLib * 0.37 + nTimeGym * 0.16;
  const s = 0.82 * elec + 0.3;
  const dietEmission = mealEF[dietType] || 0;
  const totalCarbon = s + outingEmissions + dietEmission + 470;

  const waterusage = 35 + 6 * nBathDur * 0.7 * nShowers + 7 * 40 + 7 * (dietWater[dietType] || 0);
  const wasteg = (((0.0025 * 2 + 0.02 + 0.2 + 0.006) * nFoodOrders * 52) + (0.35 * nEcommerce * 4 * 12)) / 365 + dietEmission + 0.2;

  const carbonScore = scoreFromValue(totalCarbon, 500, 1500);
  const waterScore  = scoreFromValue(waterusage, 6000, 20000);
  const wasteScore  = scoreFromValue(wasteg, 100, 600);
  const greenScore  = ((carbonScore + waterScore + wasteScore) / 3).toFixed(2);

  return {
    electricity: elec.toFixed(2),
    scope2: s.toFixed(2),
    scope3: dietEmission.toFixed(2),
    outings: outingEmissions.toFixed(2),
    totalCarbon: totalCarbon.toFixed(2),
    water: normalize(waterusage, 6000, 20000, 200, 700).toFixed(2),
    waste: normalize(wasteg, 100, 600, 1, 10).toFixed(2),
    carbonScore, waterScore, wasteScore, greenScore,
  };
}

// ============================================================
// Default form state
// ============================================================
const INITIAL_FORM = {
  hostelNo: 1, credits: 0, timeLabs: 0, timeLibrary: 0, timeGymkhana: 0,
  dietType: "Vegan", foodOrders: 0,
  outingType: "South Bombay+Cab+meal", outingsMonth: 0, eatOutMonth: 0,
  partyingMonth: 0, shoppingMonth: 0, autoRides: 0, ecommerce: 0,
  showers: 0, bathDuration: 1,
  isResponsible: false,
};

const STEPS = [
  { title: "Energy & College Life", icon: "⚡" },
  { title: "Food & Diet",           icon: "🍽️" },
  { title: "Transport & Outings",   icon: "🚗" },
  { title: "Water Usage",           icon: "💧" },
  { title: "Confirmation",          icon: "✅" },
];

// ============================================================
// Reusable small components
// ============================================================
function OptionGroup({ label, name, value, onChange, options }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ target: { name, value: opt.value } })}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              value === opt.value
                ? "bg-[#1B4332] text-white border-[#1B4332]"
                : "bg-white text-gray-600 border-gray-300 hover:border-[#9CCC5A]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ label, name, min, max, value, onChange, suffix }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-sm font-bold text-[#1B4332]">
          {value}
          {suffix ? " " + suffix : ""}
        </span>
      </div>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function HostelSelector({ value, onChange }) {
  const [start, setStart] = useState(1);
  const PER_PAGE = 7;
  const HOSTEL_MAX = 21;
  const end = Math.min(start + PER_PAGE - 1, HOSTEL_MAX);
  const hostels = Array.from({ length: end - start + 1 }, (_, i) => i + start);
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Hostel Number</label>
      <div className="flex items-center gap-1 flex-wrap">
        <button
          type="button"
          disabled={start <= 1}
          onClick={() => setStart((s) => Math.max(1, s - PER_PAGE))}
          className="px-2 py-1 rounded border text-gray-600 disabled:opacity-30 hover:bg-gray-100 text-lg leading-none"
        >
          ‹
        </button>
        {hostels.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`w-9 h-9 rounded-full text-sm font-bold border transition-all ${
              value === num
                ? "bg-[#1B4332] text-white border-[#1B4332]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#9CCC5A]"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          disabled={end >= HOSTEL_MAX}
          onClick={() => setStart((s) => Math.min(HOSTEL_MAX - PER_PAGE + 1, s + PER_PAGE))}
          className="px-2 py-1 rounded border text-gray-600 disabled:opacity-30 hover:bg-gray-100 text-lg leading-none"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function ScoreCircle({ value, label, bg }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold text-white shadow"
        style={{ background: bg }}
      >
        {value}
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

// ============================================================
// Main export
// ============================================================
export default function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData]       = useState({ ...INITIAL_FORM });
  const [errors, setErrors]           = useState({});
  const [results, setResults]         = useState(null);
  const basePath = (import.meta.env.BASE_URL || "").replace(/\/$/, "");
  const homeHref = `${basePath}/`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal =
      type === "checkbox" ? checked
      : type === "range" || type === "number" ? parseFloat(value) || 0
      : value;
    setFormData((p) => ({ ...p, [name]: newVal }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (currentStep === 1 && !formData.dietType) errs.dietType = "Please select a diet type";
    if (currentStep === 2 && !formData.outingType) errs.outingType = "Please select an outing type";
    if (currentStep === 4 && !formData.isResponsible) errs.isResponsible = "Please confirm the statement to proceed";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setResults(calculateResults(formData));
    }
  };

  const handleBack  = () => { if (currentStep > 0) setCurrentStep((s) => s - 1); };
  const handleReset = () => { setCurrentStep(0); setFormData({ ...INITIAL_FORM }); setErrors({}); setResults(null); };

  const scoreColor = (s) => {
    const v = parseFloat(s);
    if (v >= 7) return "#4CAF50";
    if (v >= 4) return "#FF9800";
    return "#F44336";
  };

  const progressPercent = Math.round(((currentStep + 1) / STEPS.length) * 100);
  const stepTips = [
    "Track shared spaces usage honestly for a realistic score.",
    "Diet has a large footprint impact. Small weekly choices matter.",
    "Trip frequency and transport mode quickly increase emissions.",
    "Water score improves most from shorter showers and fewer long baths.",
    "Review before submitting to get a more useful baseline score.",
  ];

  const scoreBand = results
    ? parseFloat(results.greenScore) >= 7
      ? "Strong"
      : parseFloat(results.greenScore) >= 4
      ? "Moderate"
      : "Needs Improvement"
    : "In Progress";

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <HostelSelector value={formData.hostelNo} onChange={(num) => setFormData((p) => ({ ...p, hostelNo: num }))} />
            <Slider label="Credits this semester" name="credits" min={0} max={54} value={formData.credits} onChange={handleChange} suffix="credits" />
            <OptionGroup label="Time in Labs (hrs/week)" name="timeLabs" value={formData.timeLabs} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–5", value: 3 }, { label: "6–10", value: 8 }, { label: "11+", value: 13 }]} />
            <OptionGroup label="Time in Library (hrs/week)" name="timeLibrary" value={formData.timeLibrary} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–5", value: 3 }, { label: "6–10", value: 8 }, { label: "11+", value: 13 }]} />
            <OptionGroup label="Time in Gymkhana (hrs/week)" name="timeGymkhana" value={formData.timeGymkhana} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–5", value: 3 }, { label: "6–10", value: 8 }, { label: "11+", value: 13 }]} />
          </>
        );

      case 1:
        return (
          <>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Daily Diet</label>
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-[#9CCC5A]"
              >
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Pescatarian">Pescatarian</option>
                <option value="Egetarian">Eggetarian</option>
                <option value="White Meat Diet">White Meat Diet</option>
                <option value="Red Meat Diet">Red Meat Diet</option>
              </select>
              {errors.dietType && <p className="text-red-500 text-xs mt-1">{errors.dietType}</p>}
            </div>
            <Slider label="Food Orders per Week" name="foodOrders" min={0} max={21} value={formData.foodOrders} onChange={handleChange} suffix="orders" />
          </>
        );

      case 2:
        return (
          <>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Usual Outing Type</label>
              <select
                name="outingType"
                value={formData.outingType}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-[#9CCC5A]"
              >
                <option>South Bombay+Cab+meal</option>
                <option>South Bombay+local+meal</option>
                <option>South Bombay+local+cab+meal</option>
                <option>South Bombay+cab+clubbing</option>
                <option>Around Powai+cab+meal</option>
                <option>Around Powai+rickshaw+meal</option>
                <option>Shopping in a mall+rickshaw</option>
                <option>Around Powai+rickshaw+movie</option>
                <option>Around Powai+cab+clubbing</option>
                <option>Temples in Mumbai+local</option>
                <option>Trek+local</option>
                <option>Trek+local+cab</option>
                <option>Sea-ferry+local</option>
              </select>
              {errors.outingType && <p className="text-red-500 text-xs mt-1">{errors.outingType}</p>}
            </div>
            <OptionGroup label="Outings per Month" name="outingsMonth" value={formData.outingsMonth} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–3", value: 2 }, { label: "4–6", value: 5 }, { label: "7+", value: 8 }]} />
            <OptionGroup label="Eating Out per Month" name="eatOutMonth" value={formData.eatOutMonth} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–3", value: 2 }, { label: "4–6", value: 5 }, { label: "7+", value: 8 }]} />
            <OptionGroup label="Partying / Clubbing per Month" name="partyingMonth" value={formData.partyingMonth} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–3", value: 2 }, { label: "4–6", value: 5 }, { label: "7+", value: 8 }]} />
            <OptionGroup label="Auto Rickshaw Rides per Day" name="autoRides" value={formData.autoRides} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–3", value: 2 }, { label: "4–6", value: 5 }, { label: "7+", value: 8 }]} />
            <Slider label="E-commerce Orders per Month" name="ecommerce" min={0} max={20} value={formData.ecommerce} onChange={handleChange} suffix="orders" />
          </>
        );

      case 3:
        return (
          <>
            <OptionGroup label="Showers per Week" name="showers" value={formData.showers} onChange={handleChange}
              options={[{ label: "0", value: 0 }, { label: "1–5", value: 3 }, { label: "6–10", value: 8 }, { label: "11+", value: 13 }]} />
            <Slider label="Shower Duration (minutes)" name="bathDuration" min={1} max={45} value={formData.bathDuration} onChange={handleChange} suffix="min" />
          </>
        );

      case 4:
        return (
          <div className="flex flex-col items-center text-center gap-5 py-4">
            <div className="text-6xl">🌍</div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              As a responsible citizen, I acknowledge my responsibility towards our planet and confirm that all the information I have provided is accurate to the best of my knowledge. I commit to making sustainable choices.
            </p>
            <label className="flex items-center gap-3 cursor-pointer bg-green-50 rounded-2xl px-4 py-3 border border-green-200">
              <input
                type="checkbox"
                name="isResponsible"
                checked={formData.isResponsible}
                onChange={handleChange}
                className="w-5 h-5 accent-green-600 flex-shrink-0"
              />
              <span className="text-sm font-semibold text-gray-700 text-left">I agree to the above statement</span>
            </label>
            {errors.isResponsible && <p className="text-red-500 text-xs">{errors.isResponsible}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#dff2dc_0%,#f4f8f4_35%,#f7f9fc_100%)] py-8 sm:py-10 px-4 sm:px-6">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between mb-5">
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1B4332] hover:text-[#2D6A4F]"
          >
            <span aria-hidden>←</span>
            <span>Back to Website</span>
          </a>
          <span className="hidden sm:inline text-xs sm:text-sm text-gray-500">Direct link: /green-score</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-5 lg:gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="bg-white rounded-3xl shadow-2xl w-full flex flex-col overflow-hidden border border-white/70"
            style={{ minHeight: "84vh" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ background: "linear-gradient(105deg, #163f2f 0%, #2d6a4f 55%, #3a7d57 100%)" }}
            >
              <div>
                <h2 className="font-bold text-white text-xl leading-tight">Green Score Calculator</h2>
                <p className="text-green-100/90 text-sm mt-1">Estimate your sustainability baseline in under 2 minutes</p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                {progressPercent}% Complete
              </span>
            </div>

            {results ? (
              /* ───── RESULTS ───── */
              <div className="flex-1 overflow-y-auto p-6 sm:p-7">
                  {/* Big green score */}
                  <div className="flex flex-col items-center mb-6">
                    <p className="text-sm font-bold text-[#2D6A4F] mb-3 uppercase tracking-wide">Your Green Score</p>
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-xl border-4 border-white"
                      style={{ background: `linear-gradient(135deg, ${scoreColor(results.greenScore)}, #1B4332)` }}
                    >
                      {results.greenScore}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">out of 10 · higher is better</p>
                  </div>

                  {/* Sub-scores */}
                  <div className="flex justify-around mb-6 gap-3">
                    <ScoreCircle value={results.carbonScore} label="Carbon" bg="#4CAF50" />
                    <ScoreCircle value={results.waterScore}  label="Water"  bg="#039BE5" />
                    <ScoreCircle value={results.wasteScore}  label="Waste"  bg="#F59E0B" />
                  </div>

                  {/* Breakdown */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                    <h3 className="font-bold text-[#1B4332] text-sm mb-3">Detailed Breakdown</h3>
                    <div className="space-y-2.5 text-sm">
                      {[
                        ["⚡", "Electricity Used",       results.electricity + " kWh/day"],
                        ["☁️", "Scope-2 Emissions",      results.scope2      + " kgCO₂e/day"],
                        ["☁️", "Scope-3 Emissions",      results.scope3      + " kgCO₂e/day"],
                        ["🚶", "Outing Emissions",        results.outings     + " kgCO₂e/day"],
                        ["🌿", "Total Carbon Footprint",  results.totalCarbon + " kgCO₂e/day"],
                        ["💧", "Water Usage",             results.water       + " L/day"],
                        ["🗑️", "Waste Generation",        results.waste       + " kg/day"],
                      ].map(([icon, label, val]) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-gray-600">{icon} {label}</span>
                          <span className="font-semibold text-gray-800 text-right ml-2">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 text-center mb-5">
                    Green Score = average of Carbon, Water & Waste scores (scale 1–10).
                  </p>

                  <button
                    onClick={handleReset}
                    className="w-full py-3 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(90deg, #8BC34A 0%, #4CAF50 100%)" }}
                  >
                    🔄 Calculate Again
                  </button>
            </div>
          ) : (
            /* ───── QUESTIONNAIRE ───── */
            <>
              {/* Progress bar */}
              <div className="px-6 pt-4 flex-shrink-0">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                      background: "linear-gradient(90deg, #8BC34A 0%, #4CAF50 100%)",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1 mb-1">
                  <span>Step {currentStep + 1} of {STEPS.length}</span>
                  <span>{STEPS[currentStep].icon} {STEPS[currentStep].title}</span>
                </div>
              </div>

              {/* Scrollable step content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">{renderStep()}</div>

              {/* Navigation */}
              <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-semibold text-sm disabled:opacity-30 hover:border-[#9CCC5A] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #8BC34A 0%, #4CAF50 100%)" }}
                >
                  {currentStep === STEPS.length - 1 ? "🌿 See My Results" : "Next →"}
                </button>
              </div>
            </>
            )}
          </motion.div>

          <div className="space-y-5 lg:sticky lg:top-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.05 }}
              className="bg-white/95 backdrop-blur rounded-3xl border border-white shadow-xl p-5"
            >
              <h3 className="text-[#1B4332] font-bold text-lg mb-2">Session Snapshot</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-green-50 border border-green-100 p-3">
                  <p className="text-gray-500 text-xs">Current Step</p>
                  <p className="font-semibold text-[#1B4332]">{STEPS[currentStep].title}</p>
                </div>
                <div className="rounded-2xl bg-sky-50 border border-sky-100 p-3">
                  <p className="text-gray-500 text-xs">Status</p>
                  <p className="font-semibold text-[#1B4332]">{scoreBand}</p>
                </div>
                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-3 col-span-2">
                  <p className="text-gray-500 text-xs mb-1">Progress</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${progressPercent}%`, background: "linear-gradient(90deg, #8BC34A 0%, #4CAF50 100%)" }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-600">{progressPercent}% form walkthrough complete</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.1 }}
              className="bg-white/95 backdrop-blur rounded-3xl border border-white shadow-xl p-5"
            >
              <h3 className="text-[#1B4332] font-bold text-lg mb-3">Smart Tip</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{stepTips[currentStep]}</p>
              <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3">
                <p className="text-xs text-green-700 font-semibold uppercase tracking-wide mb-1">How the score works</p>
                <p className="text-sm text-green-900">Green Score is the average of Carbon, Water, and Waste scores on a 1-10 scale.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.15 }}
              className="bg-[#163f2f] text-white rounded-3xl shadow-xl p-5"
            >
              <h3 className="font-bold text-lg mb-2">Need to share this page?</h3>
              <p className="text-sm text-green-100 mb-4">Send the direct link so others can jump straight into the calculator.</p>
              <div className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm font-medium break-all">
                {window.location.origin}{basePath}/green-score
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
