import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  FileText,
  HelpCircle,
  Info,
  Pill,
  Plus,
  ShieldAlert,
  Stethoscope,
  TrendingUp,
} from 'lucide-react';
import { DiagnosticResult, Symptom } from '../types/mycin';

interface DiagnosticResultProps {
  results: DiagnosticResult[];
  selectedCount: number;
  onAddMissingSymptom: (symptomId: string) => void;
}

export default function DiagnosticResultView({
  results,
  selectedCount,
  onAddMissingSymptom,
}: DiagnosticResultProps) {
  const [selectedDiseaseIndex, setSelectedDiseaseIndex] = useState(0);
  const [showExplanationDetail, setShowExplanationDetail] = useState(true);

  if (selectedCount === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
          <Stethoscope className="w-7 h-7" />
        </div>
        <div className="max-w-md mx-auto space-y-1.5">
          <h3 className="text-base font-bold text-slate-900">
            Ô trả về kết quả chẩn đoán MYCIN
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hệ chuyên gia sử dụng mô hình suy diễn Certainty Factor (CF) của Stanford. Vui lòng nhập triệu chứng bên trái hoặc chọn một ca bệnh mẫu để nhận kết luận chẩn đoán kèm phác đồ kháng sinh khuyến nghị.
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
          <FileQuestion className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          Chưa đủ cơ sở dữ liệu để đưa ra chẩn đoán xác định
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Tổ hợp các triệu chứng hiện tại chưa kích hoạt luật suy diễn nào với độ tin cậy $CF \ge 0.18$. Hãy nhập thêm triệu chứng toàn thân hoặc cận lâm sàng.
        </p>
      </div>
    );
  }

  const primaryResult = results[selectedDiseaseIndex] || results[0];
  const { disease, finalCf, percentage, confidenceLevel, rulesTriggered, missingDifferentialSymptoms, explanationSummary } = primaryResult;

  // Visual meter styling based on confidence
  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'Rất cao (Đặc hiệu)':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Khả năng cao':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Khả dĩ (Nghi ngờ)':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'high':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Diagnosis Output Box */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Box Top Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Kết quả chẩn đoán chính
                </span>
                {disease.icdCode && (
                  <span className="text-xs font-mono text-slate-500">
                    · ICD-10: {disease.icdCode}
                  </span>
                )}
                <span className="text-xs text-slate-400">· {disease.category}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {disease.name}
              </h2>
            </div>

            {/* Certainty factor meter */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-lg">
              <div className="text-left sm:text-right">
                <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {percentage.toFixed(1)}%
                </div>
                <div className="text-xs font-mono text-slate-500">
                  CF: {finalCf.toFixed(3)}
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded border ${getBadgeStyle(
                  confidenceLevel
                )}`}
              >
                {confidenceLevel}
              </span>
            </div>
          </div>

          {/* Progress Bar for Confidence */}
          <div className="mt-4">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentage >= 80
                    ? 'bg-emerald-500'
                    : percentage >= 60
                    ? 'bg-cyan-500'
                    : percentage >= 40
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
                style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-2xs text-slate-400 mt-1 font-mono">
              <span>0% (Vô hiệu)</span>
              <span>40% (Nghi ngờ)</span>
              <span>60% (Khả dĩ)</span>
              <span>80% (Đặc hiệu)</span>
              <span>100% (Tuyệt đối)</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-600 leading-relaxed">
            {disease.description}
          </p>
        </div>

        {/* Content Tabs / Sections */}
        <div className="p-5 space-y-6">
          {/* 1. Antimicrobial & Clinical Treatment Regimen (Core MYCIN hallmark) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Pill className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Phác đồ kháng sinh & Điều trị khuyến nghị (MYCIN Protocol)
              </h3>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3.5 space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Kháng sinh liệu pháp đặc hiệu / Thuốc đích:
                </span>
                <ul className="space-y-1.5">
                  {disease.treatment.antimicrobialRegimen.map((med, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span className="font-medium">{med}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {disease.treatment.supportiveCare.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Hồi sức hỗ trợ & Giám sát lâm sàng:
                  </span>
                  <ul className="space-y-1">
                    {disease.treatment.supportiveCare.map((care, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                        <span>{care}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {disease.treatment.warnings.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Dấu hiệu cảnh báo nguy hiểm (Red Flags):
                  </span>
                  <ul className="space-y-1">
                    {disease.treatment.warnings.map((warn, idx) => (
                      <li key={idx} className="text-xs text-rose-700 font-medium">
                        · {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* 2. Confirmatory Diagnostics */}
          {disease.confirmativeTests.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                Xét nghiệm cận lâm sàng đề nghị thực hiện ngay:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {disease.confirmativeTests.map((test, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{test}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Missing Differential Clues (Gợi ý thêm triệu chứng để nâng độ tin cậy) */}
          {missingDifferentialSymptoms.length > 0 && (
            <div className="bg-cyan-50/50 border border-cyan-200 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-900 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-700" />
                  Triệu chứng còn thiếu giúp củng cố chẩn đoán (Tối ưu CF):
                </span>
                <span className="text-2xs text-cyan-700">Nhấn để thêm vào ca bệnh</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingDifferentialSymptoms.map(({ symptom, potentialCfGain }) => (
                  <button
                    key={symptom.id}
                    onClick={() => onAddMissingSymptom(symptom.id)}
                    className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-cyan-100 border border-cyan-300 text-cyan-900 px-2.5 py-1.5 rounded-md transition-all shadow-2xs group"
                  >
                    <Plus className="w-3 h-3 text-cyan-600 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{symptom.name}</span>
                    <span className="text-2xs font-mono text-cyan-600">
                      (+{(potentialCfGain * 100).toFixed(0)}%)
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. MYCIN Explanation Engine (Cơ chế giải thích suy diễn) */}
          <div className="border-t border-slate-200 pt-4">
            <button
              onClick={() => setShowExplanationDetail((prev) => !prev)}
              className="w-full flex items-center justify-between text-left py-1 text-slate-900 hover:text-cyan-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Cơ chế suy diễn logic & Giải trình luật ({rulesTriggered.length} luật kích hoạt)
                </span>
              </div>
              {showExplanationDetail ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showExplanationDetail && (
              <div className="mt-3 space-y-3">
                <p className="text-xs text-slate-500 italic">
                  {explanationSummary} Công thức kết hợp MYCIN: $CF_{'{'}comb{'}'} = CF_1 + CF_2 \times (1 - CF_1)$
                </p>

                <div className="space-y-2">
                  {rulesTriggered.map((trace, idx) => (
                    <div
                      key={trace.ruleId}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-slate-800">
                            {trace.ruleId}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="font-semibold text-slate-900">{trace.ruleName}</span>
                        </div>
                        <span
                          className={`text-2xs px-1.5 py-0.5 rounded font-mono ${
                            trace.status === 'fully_satisfied'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {trace.status === 'fully_satisfied' ? 'Thỏa mãn đầy đủ' : 'Thỏa mãn một phần'}
                        </span>
                      </div>

                      <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Triệu chứng điều kiện: </span>
                        {trace.matchedSymptoms.map((m, mIdx) => (
                          <span key={m.symptom.id}>
                            {m.symptom.name} (CF={m.userCf.toFixed(1)})
                            {mIdx < trace.matchedSymptoms.length - 1 ? ' VÀ ' : ''}
                          </span>
                        ))}
                      </div>

                      {trace.missingSymptoms.length > 0 && (
                        <div className="text-amber-700">
                          <span className="font-semibold">Còn thiếu: </span>
                          {trace.missingSymptoms.map((m) => m.name).join(', ')}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-slate-500 pt-1 font-mono text-2xs">
                        <span>CF giả thiết P = {trace.premiseCf.toFixed(2)}</span>
                        <span>·</span>
                        <span>Đóng góp CF quy tắc = {trace.ruleContributionCf.toFixed(3)}</span>
                      </div>

                      <p className="text-slate-500 text-2xs leading-relaxed italic border-t border-slate-200/50 pt-1">
                        {trace.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Differential Diagnosis List (Các bệnh chẩn đoán phân biệt khác) */}
      {results.length > 1 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Chẩn đoán phân biệt khả dĩ ({results.length - 1} bệnh khác)
            </h3>
            <span className="text-xs text-slate-400">Xếp hạng theo độ tin cậy CF</span>
          </div>

          <div className="space-y-2">
            {results.map((item, idx) => {
              if (idx === selectedDiseaseIndex) return null;
              return (
                <div
                  key={item.disease.id}
                  onClick={() => setSelectedDiseaseIndex(idx)}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30 transition-all cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-cyan-900">
                        {item.disease.name}
                      </span>
                      {item.disease.icdCode && (
                        <span className="text-xs font-mono text-slate-400">
                          ({item.disease.icdCode})
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      {item.disease.category} · {item.rulesTriggered.length} luật liên quan
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-slate-800 tabular-nums">
                        {item.percentage.toFixed(1)}%
                      </span>
                      <span className="block text-2xs text-slate-400 font-mono">
                        CF: {item.finalCf.toFixed(2)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-600 transition-colors" />
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
