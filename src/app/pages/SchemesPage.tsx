import { useState } from "react";
import {
  BookOpen,
  Search,
  ExternalLink,
  Filter,
  ChevronDown,
  IndianRupee,
  Users,
  Home,
  Heart,
  GraduationCap,
  Sprout,
  Briefcase,
} from "lucide-react";
import { useTranslation, getLangFont } from "../i18n/useTranslation";

const SCHEMES = [
  {
    id: 1,
    name: "PM Awas Yojana (Urban)",
    category: "Housing",
    icon: Home,
    color: "text-blue-600",
    bg: "bg-blue-50",
    eligibility: "EWS/LIG/MIG families",
    benefit: "Up to ₹2.67 lakh subsidy on home loan",
    minAge: 18,
    maxAge: 70,
    income: "Up to ₹18 lakh/year",
    gender: "All",
    state: "All India",
    desc: "Affordable housing for urban poor — get interest subsidy on home loans under PMAY.",
  },
  {
    id: 2,
    name: "Ayushman Bharat - PMJAY",
    category: "Health",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
    eligibility: "Families from SECC database",
    benefit: "₹5 lakh health insurance per family/year",
    minAge: 0,
    maxAge: 100,
    income: "BPL families",
    gender: "All",
    state: "All India",
    desc: "World's largest health insurance scheme providing ₹5 lakh coverage per family per year.",
  },
  {
    id: 3,
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    icon: Sprout,
    color: "text-green-600",
    bg: "bg-green-50",
    eligibility: "Small & marginal farmers",
    benefit: "₹6,000 per year (₹2,000 every 4 months)",
    minAge: 18,
    maxAge: 70,
    income: "All farmers",
    gender: "All",
    state: "All India",
    desc: "Direct income support of ₹6,000 annually to farmers with land holding up to 2 hectares.",
  },
  {
    id: 4,
    name: "Pradhan Mantri Mudra Yojana",
    category: "Employment",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50",
    eligibility: "Small business owners / entrepreneurs",
    benefit: "Loans from ₹50,000 to ₹10 lakh",
    minAge: 18,
    maxAge: 65,
    income: "Any",
    gender: "All",
    state: "All India",
    desc: "Micro-enterprise loans under Shishu (₹50K), Kishore (₹5L), and Tarun (₹10L) categories.",
  },
  {
    id: 5,
    name: "Sukanya Samriddhi Yojana",
    category: "Women",
    icon: GraduationCap,
    color: "text-pink-600",
    bg: "bg-pink-50",
    eligibility: "Girl child below 10 years",
    benefit: "High interest savings (8.2% p.a.) + tax benefits",
    minAge: 0,
    maxAge: 10,
    income: "All",
    gender: "Female",
    state: "All India",
    desc: "Government savings scheme for girl child's education and marriage with attractive interest rates.",
  },
  {
    id: 6,
    name: "PM Scholarship Scheme",
    category: "Education",
    icon: GraduationCap,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    eligibility: "Children of ex-servicemen / police personnel",
    benefit: "₹2,500–₹3,000 per month scholarship",
    minAge: 18,
    maxAge: 30,
    income: "Annual family income below ₹6 lakh",
    gender: "All",
    state: "All India",
    desc: "Scholarships for higher education for wards of ex-servicemen, ex-coast guard and police.",
  },
  {
    id: 7,
    name: "Beti Bachao Beti Padhao",
    category: "Women",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
    eligibility: "Girl child, parents",
    benefit: "Education support, awareness programs, financial aid",
    minAge: 0,
    maxAge: 18,
    income: "All",
    gender: "Female",
    state: "All India",
    desc: "Scheme to promote welfare and education of the girl child and prevent gender-biased sex selection.",
  },
  {
    id: 8,
    name: "E-Shram Card Scheme",
    category: "Employment",
    icon: Briefcase,
    color: "text-teal-600",
    bg: "bg-teal-50",
    eligibility: "Unorganized sector workers",
    benefit: "₹2 lakh accident insurance + social security benefits",
    minAge: 16,
    maxAge: 59,
    income: "Below ₹10,000/month",
    gender: "All",
    state: "All India",
    desc: "Universal account number for unorganized workers with accident insurance and social security.",
  },
];

const STATES = [
  "All India",
  "Maharashtra",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Rajasthan",
];

// Map scheme category to translation index
const CAT_KEYS = ["All", "Housing", "Health", "Education", "Agriculture", "Employment", "Women"];
const GENDER_KEYS = ["All", "Male", "Female"];

export default function SchemesPage() {
  const { t, lang } = useTranslation();
  const s = t.schemes;
  const fontFamily = getLangFont(lang);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const [state, setState] = useState("All India");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = SCHEMES.filter((sc) => {
    const matchSearch =
      sc.name.toLowerCase().includes(search.toLowerCase()) ||
      sc.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || sc.category === category;
    const matchGender = gender === "All" || sc.gender === "All" || sc.gender === gender;
    const matchState = state === "All India" || sc.state === "All India" || sc.state === state;
    return matchSearch && matchCat && matchGender && matchState;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto" style={{ fontFamily }}>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm px-4 py-1.5 rounded-full mb-3 font-medium">
          <BookOpen size={14} />
          {s.badge}
        </div>
        <h1 className="text-slate-900 text-2xl md:text-3xl mb-2" style={{ fontWeight: 800 }}>
          {s.title}
        </h1>
        <p className="text-slate-500">{s.subtitle}</p>
      </div>

      {/* Search & Filter bar */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={s.searchPlaceholder}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
              showFilters
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            <Filter size={16} />
            {t.common.filters}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm">
            {/* Gender */}
            <div>
              <label className="block text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                {s.genderLabel}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-slate-50"
              >
                {GENDER_KEYS.map((g, i) => (
                  <option key={g} value={g}>
                    {s.genderOptions[i]}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-slate-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                {s.stateLabel}
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-slate-50"
              >
                {STATES.map((st) => (
                  <option key={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setGender("All");
                  setState("All India");
                  setCategory("All");
                  setSearch("");
                }}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
              >
                {t.common.resetFilters}
              </button>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CAT_KEYS.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                category === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {s.categories[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-500 text-sm">
          <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
          {t.common.schemesFound}
        </p>
      </div>

      {/* Scheme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${scheme.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <scheme.icon size={22} className={scheme.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-slate-900 text-base leading-tight" style={{ fontWeight: 700 }}>
                      {scheme.name}
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${scheme.bg} ${scheme.color}`}
                    >
                      {scheme.category}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{scheme.desc}</p>
                </div>
              </div>

              {/* Details */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <IndianRupee size={14} className="text-green-600 flex-shrink-0" />
                  <span className="text-slate-500 text-sm">{s.benefitLabel}</span>
                  <span className="text-slate-800 text-sm font-semibold">{scheme.benefit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-blue-600 flex-shrink-0" />
                  <span className="text-slate-500 text-sm">{s.eligibilityLabel}</span>
                  <span className="text-slate-800 text-sm font-medium">{scheme.eligibility}</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{s.incomeLabel}</span>
                    <span className="text-slate-700 text-xs font-medium">{scheme.income}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{s.genderFilterLabel}</span>
                    <span className="text-slate-700 text-xs font-medium">{scheme.gender}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02]">
                {t.common.applyLearnMore}
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
          <p className="text-base font-medium">{s.noSchemes}</p>
          <p className="text-sm mt-1">{s.noSchemesDesc}</p>
        </div>
      )}
    </div>
  );
}