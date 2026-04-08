import { Link } from "react-router";
import {
  AlertTriangle,
  MessageSquare,
  BookOpen,
  FileText,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2,
  Shield,
  TrendingUp,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation, getLangFont } from "../i18n/useTranslation";

export default function Dashboard() {
  const { user } = useAuth();
  const { t, lang } = useTranslation();
  const d = t.dashboard;
  const fontFamily = getLangFont(lang);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? d.greetingMorning : hour < 17 ? d.greetingAfternoon : d.greetingEvening;

  const QUICK_ACTIONS = [
    {
      to: "/situation",
      icon: AlertTriangle,
      title: d.actions.situation.title,
      desc: d.actions.situation.desc,
      gradient: "from-red-500 to-orange-500",
      bg: "bg-red-50",
      border: "border-red-100",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      badge: d.actions.situation.badge,
      badgeColor: "bg-red-100 text-red-600",
    },
    {
      to: "/chat",
      icon: MessageSquare,
      title: d.actions.chat.title,
      desc: d.actions.chat.desc,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      badge: d.actions.chat.badge,
      badgeColor: "bg-blue-100 text-blue-600",
    },
    {
      to: "/schemes",
      icon: BookOpen,
      title: d.actions.schemes.title,
      desc: d.actions.schemes.desc,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      badge: d.actions.schemes.badge,
      badgeColor: "bg-green-100 text-green-600",
    },
    {
      to: "/documents",
      icon: FileText,
      title: d.actions.documents.title,
      desc: d.actions.documents.desc,
      gradient: "from-amber-500 to-yellow-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      badge: d.actions.documents.badge,
      badgeColor: "bg-amber-100 text-amber-600",
    },
    {
      to: "/directory",
      icon: MapPin,
      title: d.actions.directory.title,
      desc: d.actions.directory.desc,
      gradient: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      badge: d.actions.directory.badge,
      badgeColor: "bg-purple-100 text-purple-600",
    },
  ];

  const RECENT_ACTIVITY = [
    {
      icon: AlertTriangle,
      title: d.activity1,
      time: d.timeAgo2h,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: MessageSquare,
      title: d.activity2,
      time: d.timeYesterday,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: FileText,
      title: d.activity3,
      time: d.timeDays2,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      icon: BookOpen,
      title: d.activity4,
      time: d.timeDays3,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  const STATS = [
    {
      icon: Shield,
      label: d.rightsChecked,
      value: "12",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: CheckCircle2,
      label: d.issuesResolved,
      value: "4",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: TrendingUp,
      label: d.schemesFoundStat,
      value: "7",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto" style={{ fontFamily }}>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-slate-500 text-sm mb-1">
            {greeting} 👋
          </p>
          <h1 className="text-slate-900 text-2xl md:text-3xl" style={{ fontWeight: 800 }}>
            {d.welcomeMsg} {user?.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{d.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 shadow-sm">
            <Bell size={18} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <Link
            to="/situation"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200 hover:shadow-lg hover:scale-105"
          >
            <AlertTriangle size={16} />
            {t.common.getHelpNow}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-slate-100`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <div className={`text-2xl ${s.color}`} style={{ fontWeight: 800 }}>
                  {s.value}
                </div>
                <div className="text-slate-500 text-xs leading-tight">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-900 text-lg" style={{ fontWeight: 700 }}>
            {d.quickActions}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`group relative rounded-2xl p-5 border ${action.bg} ${action.border} hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
            >
              {/* Gradient blob */}
              <div
                className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${action.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${action.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon size={20} className={action.iconColor} />
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${action.badgeColor}`}
                  >
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-slate-900 mb-1 text-base" style={{ fontWeight: 700 }}>
                  {action.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{action.desc}</p>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${action.iconColor} group-hover:gap-2 transition-all duration-200`}
                >
                  {t.common.open}
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="mb-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-lg shadow-red-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base">{d.emergencyTitle}</p>
            <p className="text-red-100 text-sm">{d.emergencyDesc}</p>
          </div>
        </div>
        <Link
          to="/situation"
          className="flex items-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-all duration-200 shadow-md whitespace-nowrap flex-shrink-0"
        >
          {t.common.getHelpNow}
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-900 text-lg" style={{ fontWeight: 700 }}>
            {d.recentActivity}
          </h2>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            {t.common.viewAll}
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {RECENT_ACTIVITY.map((activity, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors duration-150 ${
                i !== RECENT_ACTIVITY.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center flex-shrink-0`}
              >
                <activity.icon size={18} className={activity.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 text-sm font-medium truncate">{activity.title}</p>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs whitespace-nowrap">
                <Clock size={12} />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
