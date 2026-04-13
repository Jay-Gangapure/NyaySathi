import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  Bot,
  User as UserIcon,
  Plus,
  Trash2,
  ChevronRight,
  Scale,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation, getLangFont } from "../i18n/useTranslation";
import { interpretText } from "../services/api";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  time: string;
}

const SAMPLE_RESPONSES: Record<string, string> = {
  default:
    "I'm NyaySathi AI, your legal assistant. I can help you understand your rights, explain legal procedures, and guide you through common legal situations in India. What would you like to know?",
  police:
    "If stopped by police, you have the right to: (1) Know the reason for detention, (2) Remain silent, (3) Contact a lawyer, (4) Not be held for more than 24 hours without magistrate order. Always stay calm and ask for a challan receipt.",
  salary:
    "Under the Payment of Wages Act, your employer must pay salary by the 7th of each month. If unpaid: File complaint with Labour Commissioner, use Shram Suvidha portal, or call 1800-11-9191. Keep all pay slips and employment records as evidence.",
  rent: "As a tenant in India, you're protected under the Rent Control Act. Key rights: Can't be evicted without 30-day notice and court order, entitled to security deposit refund within 30 days, landlord can't cut utilities to force you out. File complaint at local Rent Authority.",
  fraud:
    "For cyber fraud, act immediately! Call 1930 (Cyber Crime Helpline) right now — timing is critical. Also report at cybercrime.gov.in. Contact your bank to freeze transactions. Under RBI guidelines, if reported within 3 days, you have zero liability for unauthorized transactions.",
};

function getAIResponse(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("police") || msg.includes("traffic") || msg.includes("arrest") ||
      msg.includes("पुलिस") || msg.includes("ट्रैफिक") || msg.includes("पोलिस"))
    return SAMPLE_RESPONSES.police;
  if (msg.includes("salary") || msg.includes("wage") || msg.includes("paid") ||
      msg.includes("वेतन") || msg.includes("पगार") || msg.includes("तनख्वाह"))
    return SAMPLE_RESPONSES.salary;
  if (msg.includes("rent") || msg.includes("landlord") || msg.includes("tenant") ||
      msg.includes("किराया") || msg.includes("मकान") || msg.includes("भाडे"))
    return SAMPLE_RESPONSES.rent;
  if (msg.includes("fraud") || msg.includes("scam") || msg.includes("hack") || msg.includes("cyber") ||
      msg.includes("धोखा") || msg.includes("फसवणूक") || msg.includes("घोटाला"))
    return SAMPLE_RESPONSES.fraud;
  return SAMPLE_RESPONSES.default;
}

export default function AIChatPage() {
  const { user } = useAuth();
  const { t, lang } = useTranslation();
  const c = t.chat;
  const fontFamily = getLangFont(lang);

  const INITIAL_MESSAGES: Message[] = [
    {
      id: "1",
      role: "ai",
      content:
        "नमस्ते! I'm NyaySathi AI 🙏\n\nI'm here to help you understand your legal rights in India. You can ask me about:\n• Traffic police rights\n• Salary and labor issues\n• Cyber fraud and online scams\n• Tenant and housing rights\n• Consumer complaints\n• Family law matters\n\nHow can I help you today?",
      time: "Now",
    },
  ];

  const HISTORY = [
    { id: "c1", title: c.historyItems[0], time: c.timeAgo[0], messages: [] },
    { id: "c2", title: c.historyItems[1], time: c.timeAgo[1], messages: [] },
    { id: "c3", title: c.historyItems[2], time: c.timeAgo[2], messages: [] },
  ];

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: getAIResponse(content),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((m) => [...m, aiMsg]);
    setLoading(false);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";
  
  const handleSend = async () => {
  const res = await interpretText(input);
  setMessages([...messages, res.data]);
};

  return (
    <div
      className="flex h-[calc(100vh-65px)] bg-white overflow-hidden"
      style={{ fontFamily }}
    >
      {/* Chat History Sidebar */}
      <div
        className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 fixed md:static z-30 h-full w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300
      `}
      >
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={() => {
              setMessages(INITIAL_MESSAGES);
            }}
            className="w-full flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {c.newConversation}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="text-slate-400 text-xs font-semibold px-2 mb-3 uppercase tracking-wide">
            {c.recentChats}
          </p>
          {HISTORY.map((h) => (
            <button
              key={h.id}
              className="w-full text-left px-3 py-3 rounded-xl hover:bg-blue-50 transition-colors group mb-1"
            >
              <div className="flex items-center justify-between">
                <p className="text-slate-700 text-sm font-medium truncate flex-1 group-hover:text-blue-700">
                  {h.title}
                </p>
                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover:text-blue-400 ml-2 flex-shrink-0"
                />
              </div>
              <p className="text-slate-400 text-xs mt-0.5">{h.time}</p>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-sm font-medium truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs">{t.common.freePlan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3 bg-white">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Scale size={18} className="text-slate-500" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <p className="text-slate-900 text-sm font-semibold">{t.common.appName} AI</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-green-600 text-xs">{c.online}</p>
            </div>
          </div>
          <button className="ml-auto p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.role === "ai"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-200"
                    : "bg-gradient-to-br from-slate-600 to-slate-700"
                }`}
              >
                {msg.role === "ai" ? (
                  <Bot size={17} className="text-white" />
                ) : (
                  <UserIcon size={17} className="text-white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] md:max-w-[65%] ${
                  msg.role === "user" ? "items-end" : "items-start"
                } flex flex-col gap-1`}
              >
                <div
                  className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "ai"
                      ? "bg-white border border-slate-100 text-slate-800 shadow-sm rounded-tl-sm"
                      : "bg-blue-600 text-white rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-slate-400 text-xs px-1">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
                <Bot size={17} className="text-white" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                <div className="flex gap-1.5 items-center h-5">
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions (show only initially) */}
        {messages.length <= 1 && (
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2">
              {c.quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-end gap-3 bg-slate-50 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={c.placeholder}
              rows={1}
              className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 resize-none focus:outline-none text-sm leading-relaxed"
              style={{ maxHeight: "120px" }}
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                <Mic size={18} />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-md shadow-blue-200"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <p className="text-center text-slate-400 text-xs mt-2">{c.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
