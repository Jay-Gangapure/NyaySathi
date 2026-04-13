import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  Loader2,
  Eye,
  Download,
  Sparkles,
  AlertCircle,
  File,
  FileImage,
  Lock,
} from "lucide-react";
import { useTranslation, getLangFont } from "../i18n/useTranslation";

type UploadStatus = "idle" | "uploading" | "analyzing" | "done" | "error";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const MOCK_SUMMARY = {
  type: "Rental Agreement",
  parties: ["Ramesh Kumar (Landlord)", "Priya Sharma (Tenant)"],
  keyTerms: [
    "Monthly rent: ₹15,000 payable by 5th of each month",
    "Security deposit: ₹45,000 (3 months)",
    "Lease period: 11 months from 1st January 2025",
    "Notice period: 1 month by either party",
    "Maintenance: Tenant responsible for minor repairs",
    "Subletting: Not allowed without written consent",
  ],
  flags: [
    {
      type: "warning",
      text: "Clause 7 restricts your right to have guests — may be legally unenforceable",
    },
    {
      type: "warning",
      text: "No clause about refund timeline for security deposit — negotiate to add one",
    },
    {
      type: "info",
      text: "This agreement should be registered for legal validity over 11 months",
    },
  ],
  plain: `This is a residential rental agreement between Ramesh Kumar (landlord) and Priya Sharma (tenant) for a property in Mumbai. The tenant agrees to pay ₹15,000 monthly rent by the 5th of each month. A security deposit of ₹45,000 has been paid upfront and must be refunded upon vacating. The lease is for 11 months with a 1-month notice period. The tenant cannot sublet the property. The landlord has rights to inspect with 24-hour notice.`,
};

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileIcon(type: string) {
  if (type.includes("image")) return FileImage;
  if (type.includes("pdf")) return FileText;
  return File;
}

export default function DocumentUpload() {
  const { t, lang } = useTranslation();
  const d = t.documents;
  const fontFamily = getLangFont(lang);

  const [file, setFile] = useState<UploadedFile | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (f: File) => {
      if (f.size > 10 * 1024 * 1024) {
        alert("File size must be under 10MB");
        return;
      }
      setFile({ name: f.name, size: f.size, type: f.type });
      setStatus("uploading");
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setStatus("analyzing");
            setTimeout(() => {
              setStatus("done");
            }, 2000);
            return 100;
          }
          return p + 10;
        });
      }, 150);
    },
    []
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) processFile(f);
    },
    [processFile]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const FileIcon = file ? getFileIcon(file.type) : FileText;

  const INFO_CARDS = [
    {
      icon: Lock,
      title: d.infoCards.secure.title,
      desc: d.infoCards.secure.desc,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Sparkles,
      title: d.infoCards.ai.title,
      desc: d.infoCards.ai.desc,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: AlertCircle,
      title: d.infoCards.flags.title,
      desc: d.infoCards.flags.desc,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto" style={{ fontFamily }}>
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm px-4 py-1.5 rounded-full mb-3 font-medium">
          <FileText size={14} />
          {d.badge}
        </div>
        <h1 className="text-slate-900 text-2xl md:text-3xl mb-2" style={{ fontWeight: 800 }}>
          {d.title}
        </h1>
        <p className="text-slate-500">{d.subtitle}</p>
      </div>

      {status === "idle" && (
        /* Upload Zone */
        <div
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            dragOver
              ? "border-blue-500 bg-blue-50 scale-[1.01]"
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            onChange={onFileChange}
          />

          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${
              dragOver ? "bg-blue-600 shadow-2xl shadow-blue-200 scale-110" : "bg-blue-50"
            }`}
          >
            <Upload
              size={34}
              className={`transition-colors duration-300 ${
                dragOver ? "text-white" : "text-blue-500"
              }`}
            />
          </div>

          <h3 className="text-slate-800 text-lg mb-2" style={{ fontWeight: 700 }}>
            {dragOver ? d.releaseToUpload : d.dragDrop}
          </h3>
          <p className="text-slate-500 mb-4 text-sm">{d.orClickBrowse}</p>

          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors">
            <Upload size={16} />
            {d.chooseFile}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["PDF", "DOC/DOCX", "JPG/PNG", "TXT"].map((fmt) => (
              <span key={fmt} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {fmt}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-3">{d.maxSize}</p>
        </div>
      )}

      {(status === "uploading" || status === "analyzing") && file && (
        /* Progress */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FileIcon size={26} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 font-semibold truncate">{file.name}</p>
              <p className="text-slate-400 text-sm">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={reset}
              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {status === "uploading" && (
            <div>
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>{d.uploading}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {status === "analyzing" && (
            <div className="text-center py-4">
              <div className="flex items-center justify-center gap-3 text-blue-600">
                <Loader2 size={24} className="animate-spin" />
                <span className="font-medium">{d.analyzing}</span>
              </div>
              <p className="text-slate-400 text-sm mt-2">{d.analyzingTime}</p>
            </div>
          )}
        </div>
      )}

      {status === "done" && file && (
        /* Results */
        <div className="space-y-5">
          {/* File info card */}
          <div className="bg-white rounded-2xl border border-green-100 p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <FileIcon size={22} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-slate-900 font-semibold truncate">{file.name}</p>
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              </div>
              <p className="text-slate-400 text-sm">
                {formatSize(file.size)} • {d.analysisComplete}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Eye size={16} />
              </button>
              <button className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                <Download size={16} />
              </button>
              <button
                onClick={reset}
                className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles size={18} className="text-yellow-300" />
              </div>
              <div>
                <p className="font-bold">{d.aiSummaryTitle}</p>
                <p className="text-blue-300 text-sm">{d.aiSummaryTagline}</p>
              </div>
              <span className="ml-auto bg-blue-700/50 text-blue-200 text-xs px-3 py-1 rounded-full">
                {MOCK_SUMMARY.type}
              </span>
            </div>

            <p className="text-blue-100 text-sm leading-relaxed">{MOCK_SUMMARY.plain}</p>

            <div className="mt-4 flex items-center gap-2 text-blue-300 text-xs">
              <Lock size={12} />
              {d.secureNote}
            </div>
          </div>

          {/* Key Terms */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="text-slate-900 font-bold text-base mb-4">{d.keyTermsTitle}</h3>
            <div className="space-y-2.5">
              {MOCK_SUMMARY.keyTerms.map((term, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{term}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="text-slate-900 font-bold text-base mb-4">{d.pointsToNote}</h3>
            <div className="space-y-3">
              {MOCK_SUMMARY.flags.map((flag, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3.5 rounded-xl ${
                    flag.type === "warning"
                      ? "bg-amber-50 border border-amber-100"
                      : "bg-blue-50 border border-blue-100"
                  }`}
                >
                  <AlertCircle
                    size={16}
                    className={`flex-shrink-0 mt-0.5 ${
                      flag.type === "warning" ? "text-amber-500" : "text-blue-500"
                    }`}
                  />
                  <p
                    className={`text-sm leading-relaxed ${
                      flag.type === "warning" ? "text-amber-700" : "text-blue-700"
                    }`}
                  >
                    {flag.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200"
            >
              <Upload size={14} />
              {d.uploadAnother}
            </button>
            <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              <Download size={14} />
              {d.downloadSummary}
            </button>
          </div>
        </div>
      )}

      {/* Info cards */}
      {status === "idle" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {INFO_CARDS.map((item) => (
            <div key={item.title} className={`${item.bg} rounded-2xl p-4 border border-slate-100`}>
              <item.icon size={20} className={`${item.color} mb-2`} />
              <p className="text-slate-800 font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
