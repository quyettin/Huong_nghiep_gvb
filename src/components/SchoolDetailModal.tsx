import {
  Award,
  BookOpen,
  Briefcase,
  DollarSign,
  ExternalLink,
  GraduationCap,
  MapPin,
  TrendingUp,
  X,
} from 'lucide-react';
import { University } from '../types/unipath';

interface SchoolDetailModalProps {
  university: University | null;
  onClose: () => void;
  onNavigateTab: (tab: 'home' | 'search' | 'career' | 'calc' | 'ai') => void;
}

export default function SchoolDetailModal({
  university,
  onClose,
  onNavigateTab,
}: SchoolDetailModalProps) {
  if (!university) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 border border-white/20 shadow-xs">
              {university.logoIcon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-3xs font-bold font-mono bg-white/20 text-white px-2 py-0.5 rounded">
                  {university.shortName}
                </span>
                <span className="text-3xs text-indigo-200">· {university.type}</span>
                <span className="text-3xs text-indigo-200">· Miền {university.region}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1 leading-snug">
                {university.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
            <div>
              <span className="text-3xs text-slate-400 block font-medium">Điểm TB 2025</span>
              <span className="text-sm font-bold font-mono text-indigo-600">
                {university.benchmarkAvg2025.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-3xs text-slate-400 block font-medium">Học phí</span>
              <span className="text-xs font-bold text-slate-800">
                {university.tuitionRange}
              </span>
            </div>
            <div>
              <span className="text-3xs text-slate-400 block font-medium">Việc làm</span>
              <span className="text-sm font-bold font-mono text-emerald-600">
                {university.employmentRate}%
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-2xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Giới thiệu chung:
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {university.description}
            </p>
          </div>

          {/* Admission Methods */}
          <div>
            <h4 className="text-2xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Các phương thức xét tuyển:
            </h4>
            <div className="space-y-1.5">
              {university.admissionMethods.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl text-2xs text-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Majors and Benchmarks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                Các ngành đào tạo tiêu biểu & Điểm chuẩn 3 năm:
              </h4>
              <span className="text-3xs text-slate-400">2023 - 2024 - 2025</span>
            </div>

            <div className="space-y-2">
              {university.majors.map((major) => (
                <div
                  key={major.id}
                  className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{major.name}</h5>
                      <span className="text-3xs font-mono text-slate-500">
                        Mã: {major.code} · Khối: {major.combinations.join(', ')}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-indigo-600">
                        {major.benchmark2025}đ
                      </span>
                      <span className="block text-3xs text-slate-400 font-mono">
                        (2024: {major.benchmark2024} | 2023: {major.benchmark2023})
                      </span>
                    </div>
                  </div>

                  <p className="text-3xs text-slate-600 leading-relaxed">{major.description}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-3xs text-slate-500">
                    <span>Học phí: ~{major.tuitionYear} tr/năm</span>
                    <span className="text-emerald-700 font-semibold font-mono">
                      Lương: {major.salaryRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 text-amber-700" />
              <span>Chính sách học bổng:</span>
            </div>
            <p className="text-2xs text-amber-800 leading-relaxed">
              {university.scholarshipInfo}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <a
            href={university.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-2xs font-semibold text-indigo-600 hover:underline"
          >
            <span>Website chính thức</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              onClose();
              onNavigateTab('calc');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
          >
            Tính cơ hội đỗ trường này
          </button>
        </div>
      </div>
    </div>
  );
}
