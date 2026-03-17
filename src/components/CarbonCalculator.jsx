import React, { useEffect, useRef, useState } from "react";
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
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-3 sm:p-3.5 shadow-sm">
      <label className="block text-sm font-semibold text-gray-700 mb-2.5">{label}</label>
      <div className={`grid gap-2.5 ${options.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
        {options.map((opt) => (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange({ target: { name, value: opt.value } })}
            className={`w-full px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
              value === opt.value
                ? "bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white border-[#1B4332] shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:border-[#9CCC5A] hover:-translate-y-0.5"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Slider({ label, name, min, max, value, onChange, suffix }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-3 sm:p-3.5 shadow-sm">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-sm font-bold text-[#1B4332] bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
          {value}
          {suffix ? " " + suffix : ""}
        </span>
      </div>
      <div className="relative py-2">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-gray-200 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-[#8BC34A] to-[#4CAF50]"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="relative z-10 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-green-600"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function HostelSelector({ value, onChange }) {
  const [start, setStart] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const HOSTEL_MAX = 21;
  const end = Math.min(start + perPage - 1, HOSTEL_MAX);
  const hostels = Array.from({ length: end - start + 1 }, (_, i) => i + start);

  useEffect(() => {
    const updatePerPage = () => {
      const w = window.innerWidth;
      if (w >= 1280) setPerPage(11);
      else if (w >= 1024) setPerPage(9);
      else if (w >= 768) setPerPage(7);
      else setPerPage(5);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  useEffect(() => {
    setStart((s) => Math.min(s, Math.max(1, HOSTEL_MAX - perPage + 1)));
  }, [perPage]);

  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-3 sm:p-3.5 shadow-sm">
      <label className="block text-sm font-semibold text-gray-700 mb-3">Hostel Number</label>
      <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
        <button
          type="button"
          disabled={start <= 1}
          onClick={() => setStart((s) => Math.max(1, s - perPage))}
          className="w-9 h-9 rounded-full border text-gray-600 disabled:opacity-30 hover:bg-gray-100 text-lg leading-none"
        >
          ‹
        </button>
        <div className="flex-1 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${hostels.length}, minmax(0, 1fr))` }}>
          {hostels.map((num) => (
            <motion.button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={`w-full h-10 rounded-full text-sm font-bold border transition-all ${
                value === num
                  ? "bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white border-[#1B4332] shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#9CCC5A] hover:-translate-y-0.5"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
        <button
          type="button"
          disabled={end >= HOSTEL_MAX}
          onClick={() => setStart((s) => Math.min(HOSTEL_MAX - perPage + 1, s + perPage))}
          className="w-9 h-9 rounded-full border text-gray-600 disabled:opacity-30 hover:bg-gray-100 text-lg leading-none"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function StyledSelect({ label, name, value, onChange, options, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const selected = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-3 sm:p-3.5 shadow-sm" ref={wrapperRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2.5">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`w-full p-3.5 border-2 rounded-2xl text-sm bg-gradient-to-r from-white to-green-50/60 text-left flex items-center justify-between transition-colors ${
          isOpen ? "border-[#7FBF45]" : "border-gray-200"
        }`}
      >
        <span className="font-medium text-gray-700 truncate pr-2">{selected?.label || value}</span>
        <span className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="mt-2 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <div className="max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: opt.value, type: "text" } });
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  value === opt.value
                    ? "bg-green-50 text-[#1B4332] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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

function buildIitbRecommendations(inputs, results) {
  const recs = [];

  if ((inputs.outingsMonth || 0) >= 5 && String(inputs.outingType || "").toLowerCase().includes("cab")) {
    recs.push({
      priority: 10,
      title: "Swap 1-2 cab outings with local/public transport",
      detail: "For South Mumbai plans, prefer local train and other public transport options instead of full cab trips. Replacing even two cab-heavy outings per month can visibly lower your transport component.",
    });
  }

  if ((inputs.foodOrders || 0) >= 6) {
    recs.push({
      priority: 9,
      title: "Cut delivery frequency on weekdays",
      detail: "Use hostel mess or canteen for 3-4 weekday meals and reserve delivery for weekends. This reduces both packaging waste and delivery emissions around campus.",
    });
  }

  if ((inputs.bathDuration || 0) >= 10 || (inputs.showers || 0) >= 8) {
    recs.push({
      priority: 8,
      title: "Shift to bucket-bath on 3 hostel days weekly",
      detail: "In hostels, replacing a few long showers with bucket-bath days can sharply reduce water use. Start with three days per week and recheck your score next week.",
    });
  }

  if (["White Meat Diet", "Red Meat Diet"].includes(inputs.dietType)) {
    recs.push({
      priority: 7,
      title: "Replace 2 weekly meals with veg options",
      detail: "Try vegetarian or egg-based meals for two weekly meals at campus dining points. This is one of the fastest ways to lower footprint without major lifestyle change.",
    });
  }

  if ((inputs.ecommerce || 0) >= 8) {
    recs.push({
      priority: 8,
      title: "Batch e-commerce orders into one monthly cart",
      detail: "Group non-urgent hostel deliveries into fewer orders. This cuts repeated last-mile trips and packaging waste around campus gates and hostels.",
    });
  }

  if ((inputs.eatOutMonth || 0) >= 5 && (inputs.outingsMonth || 0) >= 5) {
    recs.push({
      priority: 7,
      title: "Make one weekend outing low-emission",
      detail: "Keep one monthly outing nearby (Powai/IITB side) with shared travel and lighter meal footprint. A single recurring change can improve both transport and food components.",
    });
  }

  if ((inputs.outingsMonth || 0) >= 5 && String(inputs.outingType || "").toLowerCase().includes("local")) {
    recs.push({
      priority: 6,
      title: "You are already using local, now optimize first/last mile",
      detail: "Prefer walking or shared rides from station to destination where possible. This keeps your transport footprint lower without reducing social outings.",
    });
  }

  if ((inputs.autoRides || 0) >= 5) {
    recs.push({
      priority: 8,
      title: "Use campus EV buggies for internal travel",
      detail: "If your intra-campus auto usage is high, shift more short internal trips to EV buggies and walking routes where feasible. This lowers daily transport emissions inside IITB.",
    });
  }

  if ((inputs.foodOrders || 0) <= 2 && (inputs.ecommerce || 0) <= 2 && (results && parseFloat(results.greenScore) >= 7)) {
    recs.push({
      priority: 6,
      title: "Maintain your current baseline and track monthly",
      detail: "Your habits are already efficient. Recalculate monthly and mentor friends/wingmates to adopt 1-2 of your current low-footprint practices.",
    });
  }

  if ((results && parseFloat(results.greenScore) < 5) || recs.length === 0) {
    recs.push({
      priority: 6,
      title: "Pick one measurable weekly target",
      detail: "Choose a single IITB-friendly habit for the next 7 days: fewer cab rides, fewer delivery orders, or shorter showers. Recalculate after a week and compare your score.",
    });
  }

  recs.sort((a, b) => b.priority - a.priority);
  return recs.slice(0, 3);
}

// ============================================================
// Main export
// ============================================================
export default function CarbonCalculator() {
  const [hasStarted, setHasStarted]   = useState(false);
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
  const handleReset = () => { setCurrentStep(0); setFormData({ ...INITIAL_FORM }); setErrors({}); setResults(null); setHasStarted(false); };

  const scoreColor = (s) => {
    const v = parseFloat(s);
    if (v >= 7) return "#4CAF50";
    if (v >= 4) return "#FF9800";
    return "#F44336";
  };

  const progressPercent = Math.round(((currentStep + 1) / STEPS.length) * 100);
  const recommendations = results ? buildIitbRecommendations(formData, results) : [];

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
            <StyledSelect
              label="Daily Diet"
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              error={errors.dietType}
              options={[
                { label: "Vegan", value: "Vegan" },
                { label: "Vegetarian", value: "Vegetarian" },
                { label: "Pescatarian", value: "Pescatarian" },
                { label: "Eggetarian", value: "Egetarian" },
                { label: "White Meat Diet", value: "White Meat Diet" },
                { label: "Red Meat Diet", value: "Red Meat Diet" },
              ]}
            />
            <Slider label="Food Orders per Week" name="foodOrders" min={0} max={21} value={formData.foodOrders} onChange={handleChange} suffix="orders" />
          </>
        );

      case 2:
        return (
          <>
            <StyledSelect
              label="Usual Outing Type"
              name="outingType"
              value={formData.outingType}
              onChange={handleChange}
              error={errors.outingType}
              options={[
                { label: "South Bombay + Cab + Meal", value: "South Bombay+Cab+meal" },
                { label: "South Bombay + Local + Meal", value: "South Bombay+local+meal" },
                { label: "South Bombay + Local + Cab + Meal", value: "South Bombay+local+cab+meal" },
                { label: "South Bombay + Cab + Clubbing", value: "South Bombay+cab+clubbing" },
                { label: "Around Powai + Cab + Meal", value: "Around Powai+cab+meal" },
                { label: "Around Powai + Rickshaw + Meal", value: "Around Powai+rickshaw+meal" },
                { label: "Shopping in Mall + Rickshaw", value: "Shopping in a mall+rickshaw" },
                { label: "Around Powai + Rickshaw + Movie", value: "Around Powai+rickshaw+movie" },
                { label: "Around Powai + Cab + Clubbing", value: "Around Powai+cab+clubbing" },
                { label: "Temples in Mumbai + Local", value: "Temples in Mumbai+local" },
                { label: "Trek + Local", value: "Trek+local" },
                { label: "Trek + Local + Cab", value: "Trek+local+cab" },
                { label: "Sea Ferry + Local", value: "Sea-ferry+local" },
              ]}
            />
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
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="bg-white rounded-3xl shadow-2xl w-full flex flex-col overflow-hidden border border-white/70"
            style={{ minHeight: "72vh" }}
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
              {hasStarted && (
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                  {progressPercent}% Complete
                </span>
              )}
            </div>

            {!hasStarted ? (
              <div className="flex-1 p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-3xl border border-green-100 bg-[linear-gradient(135deg,#f3fff2_0%,#f7fcf7_45%,#ffffff_100%)] p-6 sm:p-7"
                >
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-semibold border border-green-200">
                    <span>🌿</span>
                    <span>IIT Bombay Student Edition</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1B4332] mb-3">Know Your Green Score</h3>
                  <p className="text-gray-600 mb-5 leading-relaxed text-[15px]">
                    Measure your campus lifestyle footprint across energy, food, transport, and water.
                    Answer a few practical questions and get a score with actionable IITB-specific improvements.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Duration</p>
                      <p className="text-sm font-semibold text-[#1B4332] mt-1">~2 minutes</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Format</p>
                      <p className="text-sm font-semibold text-[#1B4332] mt-1">5 short sections</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Output</p>
                      <p className="text-sm font-semibold text-[#1B4332] mt-1">Score + improvement ideas</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 mb-6 text-sm text-amber-900">
                    <p className="font-semibold mb-1">Before you begin</p>
                    <p className="text-sm text-amber-900">
                      Use your typical IITB routine (not best-case values). Honest inputs give better and more useful recommendations.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setHasStarted(true)}
                    className="w-full sm:w-auto px-8 py-3 rounded-full font-bold text-white text-sm transition-transform hover:scale-[1.02]"
                    style={{ background: "linear-gradient(90deg, #8BC34A 0%, #4CAF50 100%)" }}
                  >
                    Start →
                  </button>
                </motion.div>
              </div>
            ) : results ? (
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

                  <div className="rounded-2xl border border-green-100 bg-green-50 p-4 mb-5">
                    <h3 className="font-bold text-[#1B4332] text-sm mb-3">IITB Action Recommendations</h3>
                    <div className="space-y-3">
                      {recommendations.map((rec, idx) => (
                        <div key={rec.title} className="rounded-xl bg-white border border-green-100 px-3.5 py-3">
                          <p className="text-sm font-semibold text-[#1B4332]">{rec.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{rec.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

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

                <div className="mt-3 grid grid-cols-5 gap-2">
                  {STEPS.map((step, idx) => {
                    const isActive = idx === currentStep;
                    const isDone = idx < currentStep;
                    return (
                      <div
                        key={step.title}
                        className={`rounded-xl px-2 py-2 text-center border text-[11px] sm:text-xs transition-all ${
                          isActive
                            ? "bg-green-50 border-green-300 text-[#1B4332] font-semibold"
                            : isDone
                            ? "bg-[#1B4332] border-[#1B4332] text-white"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        <div>{step.icon}</div>
                        <div className="truncate">{step.title.split(" ")[0]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable step content */}
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto px-6 py-3"
              >
                {renderStep()}
              </motion.div>

              {/* Navigation */}
              <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex-1 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-semibold text-sm disabled:opacity-30 hover:border-[#9CCC5A] hover:bg-green-50/50 transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-full font-bold text-white text-sm transition-transform hover:scale-[1.01]"
                  style={{ background: "linear-gradient(90deg, #8BC34A 0%, #4CAF50 100%)" }}
                >
                  {currentStep === STEPS.length - 1 ? "🌿 See My Results" : "Next →"}
                </button>
              </div>
            </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
