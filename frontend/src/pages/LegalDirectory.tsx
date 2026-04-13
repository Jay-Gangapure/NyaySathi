import {
  MapPin,
  Phone,
  Search,
  Scale,
  Shield,
  Heart,
  MessageSquare,
  Star,
  Clock,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { useTranslation, getLangFont } from "../i18n/useTranslation";
import React, { useState } from "react";

const STATES = [
  "All India",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "West Bengal",
  "Rajasthan",
];

const DISTRICTS: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Delhi: ["Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
  Karnataka: ["Bengaluru Urban", "Mysuru", "Hubli-Dharwad", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
};

const CAT_KEYS = ["All", "Legal Aid", "Police", "Women Help", "Consumer", "NGO"];

const DIRECTORY = [
  {
    id: 1,
    name: "District Legal Services Authority",
    category: "Legal Aid",
    icon: Scale,
    color: "text-blue-600",
    bg: "bg-blue-50",
    state: "Maharashtra",
    district: "Mumbai",
    address: "City Civil Court Complex, Fort, Mumbai - 400001",
    phones: ["022-22696247", "15100"],
    hours: "Mon-Sat, 10am-5pm",
    services: ["Free Legal Aid", "Lok Adalat", "Legal Advice", "Mediation"],
    rating: 4.5,
    free: true,
  },
  {
    id: 2,
    name: "Cyber Crime Police Station",
    category: "Police",
    icon: Shield,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    state: "Maharashtra",
    district: "Mumbai",
    address: "Bandra Kurla Complex, Mumbai - 400051",
    phones: ["1930", "022-26541500"],
    hours: "24x7",
    services: ["Cyber Fraud FIR", "Online Scam Report", "Hacking Cases"],
    rating: 4.2,
    free: true,
  },
  {
    id: 3,
    name: "One Stop Centre - Sakhi",
    category: "Women Help",
    icon: Heart,
    color: "text-pink-600",
    bg: "bg-pink-50",
    state: "Delhi",
    district: "Central Delhi",
    address: "Connaught Place Community Centre, New Delhi",
    phones: ["181", "011-23361234"],
    hours: "24x7",
    services: ["DV Support", "Shelter", "Medical Help", "Legal Aid", "Counseling"],
    rating: 4.8,
    free: true,
  },
  {
    id: 4,
    name: "Consumer Forum - District Level",
    category: "Consumer",
    icon: MessageSquare,
    color: "text-purple-600",
    bg: "bg-purple-50",
    state: "Karnataka",
    district: "Bengaluru Urban",
    address: "Mayo Hall, Queens Road, Bengaluru - 560001",
    phones: ["1800-11-4000", "080-22868100"],
    hours: "Mon-Fri, 10:30am-5pm",
    services: ["Consumer Complaints", "Product Defects", "Service Issues", "Refund Claims"],
    rating: 4.0,
    free: true,
  },
  {
    id: 5,
    name: "NALSA Free Legal Aid Center",
    category: "Legal Aid",
    icon: Scale,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    state: "Delhi",
    district: "South Delhi",
    address: "Supreme Court Premises, Tilak Marg, New Delhi",
    phones: ["15100", "011-23388922"],
    hours: "Mon-Fri, 9am-6pm",
    services: ["Supreme Court Cases", "Free Lawyers", "Legal Awareness", "Mediation"],
    rating: 4.7,
    free: true,
  },
  {
    id: 6,
    name: "Women Police Station",
    category: "Women Help",
    icon: Shield,
    color: "text-rose-600",
    bg: "bg-rose-50",
    state: "Tamil Nadu",
    district: "Chennai",
    address: "Esplanade, Chennai - 600001",
    phones: ["181", "044-28447777"],
    hours: "24x7",
    services: ["DV FIR", "Harassment Complaint", "Safety Escort", "Counseling"],
    rating: 4.6,
    free: true,
  },
  {
    id: 7,
    name: "Labour Commissioner Office",
    category: "Legal Aid",
    icon: Scale,
    color: "text-amber-600",
    bg: "bg-amber-50",
    state: "Gujarat",
    district: "Ahmedabad",
    address: "Sardar Patel Bhavan, Khanpur, Ahmedabad",
    phones: ["1800-11-9191", "079-25506001"],
    hours: "Mon-Sat, 10am-6pm",
    services: ["Wage Disputes", "Workplace Safety", "Labor Law Help", "Union Issues"],
    rating: 4.1,
    free: true,
  },
  {
    id: 8,
    name: "Jan Sewa Kendra (CSC)",
    category: "NGO",
    icon: MessageSquare,
    color: "text-teal-600",
    bg: "bg-teal-50",
    state: "Uttar Pradesh",
    district: "Lucknow",
    address: "Hazratganj, Lucknow - 226001",
    phones: ["1800-3000-3468"],
    hours: "Mon-Sat, 9am-7pm",
    services: ["Govt Forms", "Document Help", "Scheme Applications", "Certificates"],
    rating: 4.3,
    free: true,
  },
];

export default function LegalDirectory() {
  const { t, lang } = useTranslation();
  const dir = t.directory;
  const fontFamily = getLangFont(lang);

  const [search, setSearch] = useState("");
  const [state, setState] = useState("All India");
  const [district, setDistrict] = useState("All");
  const [category, setCategory] = useState("All");

  const districts = state !== "All India" ? DISTRICTS[state] || [] : [];

  const filtered = DIRECTORY.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchState = state === "All India" || d.state === state;
    const matchDistrict = district === "All" || d.district === district;
    const matchCat = category === "All" || d.category === category;
    return matchSearch && matchState && matchDistrict && matchCat;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto" style={{ fontFamily }}>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm px-4 py-1.5 rounded-full mb-3 font-medium">
          <MapPin size={14} />
          {dir.badge}
        </div>
        <h1 className="text-slate-900 text-2xl md:text-3xl mb-2" style={{ fontWeight: 800 }}>
          {dir.title}
        </h1>
        <p className="text-slate-500">{dir.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dir.searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {/* State */}
          <div className="relative">
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setDistrict("All");
              }}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 pr-8 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 appearance-none cursor-pointer"
            >
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* District */}
          <div className="relative">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!districts.length}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 pr-8 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 appearance-none cursor-pointer disabled:opacity-50"
            >
              <option value="All">{dir.allDistricts}</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 pr-8 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 appearance-none cursor-pointer"
            >
              {CAT_KEYS.map((c, i) => (
                <option key={c} value={c}>
                  {dir.categories[i]}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Emergency hotlines banner */}
      <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-md shadow-red-100">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Phone size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm">{dir.emergencyHotlines}</p>
          <div className="flex flex-wrap gap-4 mt-1">
            {[
              { label: dir.hotlinePolice, num: "100" },
              { label: dir.hotlineWomen, num: "181" },
              { label: dir.hotlineCyber, num: "1930" },
              { label: dir.hotlineLegal, num: "15100" },
            ].map((h) => (
              <span key={h.label} className="text-red-100 text-xs">
                {h.label}: <span className="text-white font-bold">{h.num}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-slate-500 text-sm mb-4">
        <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
        {t.common.centersFound}
      </p>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${center.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                >
                  <center.icon size={22} className={center.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="text-slate-900 font-bold text-base">{center.name}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${center.bg} ${center.color}`}
                        >
                          {center.category}
                        </span>
                        {center.free && (
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-100 text-green-700">
                            {t.common.freeService}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-slate-500 text-xs font-medium">
                            {center.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-slate-500">
                      <MapPin size={14} className="flex-shrink-0 mt-0.5 text-slate-400" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={14} className="flex-shrink-0 text-slate-400" />
                      <span>{center.hours}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {center.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {center.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors"
                      >
                        <Phone size={13} />
                        {phone}
                      </a>
                    ))}
                    <button className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                      <Navigation size={13} />
                      {t.common.getDirections}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <MapPin size={48} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">{dir.noResults}</p>
          <p className="text-slate-400 text-sm mt-1">{dir.noResultsDesc}</p>
        </div>
      )}
    </div>
  );
}
