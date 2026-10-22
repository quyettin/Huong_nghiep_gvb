import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  Calculator,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Info,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { UNIVERSITIES } from '../data/unipathData';
import { PredictionResult, University } from '../types/unipath';

interface CalculatorTabProps {
  onSelectUniversity: (uni: University) => void;
}

const COMBINATIONS = [
  { id: 'A00', name: 'A00: Toán - Vật lý - Hóa học', subjects: ['Toán', 'Lý', 'Hóa'] },
  { id: 'A01', name: 'A01: Toán - Vật lý - Tiếng Anh', subjects: ['Toán', 'Lý', 'Anh'] },
  { id: 'D01', name: 'D01: Toán - Ngữ văn - Tiếng Anh', subjects: ['Toán', 'Văn', 'Anh'] },
  { id: 'B00', name: 'B00: Toán - Hóa học - Sinh học', subjects: ['Toán', 'Hóa', 'Sinh'] },
  { id: 'C00', name: 'C00: Ngữ văn - Lịch sử - Địa lý', subjects: ['Văn', 'Sử', 'Địa'] },
  { id: 'D07', name: 'D07: Toán - Hóa học - Tiếng Anh', subjects: ['Toán', 'Hóa', 'Anh'] },
];

export default function CalculatorTab({ onSelectUniversity }: CalculatorTabProps) {
  const [selectedComb, setSelectedComb] = useState('A00');

  // Scores for subjects
  const [subject1, setSubject1] = useState(9.2); // e.g. Toán
  const [subject2, setSubject2] = useState(8.8); // e.g. Lý
  const [subject3, setSubject3] = useState(8.6); // e.g. Hóa

  // Priority Area
  const [area, setArea] = useState<'KV1' | 'KV2-NT' | 'KV2' | 'KV3'>('KV2');
  // Priority Object
  const [priorityObj, setPriorityObj] = useState<'none' | 'dt1' | 'dt2'>('none');

  // IELTS conversion
  const [hasIelts, setHasIelts] = useState(false);
  const [ieltsScore, setIeltsScore] = useState(6.5);

  // Raw score sum
  const rawSum = useMemo(() => {
    let s3 = subject3;
    if (hasIelts && (selectedComb === 'A01' || selectedComb === 'D01' || selectedComb === 'D07')) {
      // IELTS conversion rule
      let converted = 8.5;
      if (ieltsScore >= 7.0) converted = 10.0;
      else if (ieltsScore >= 6.5) converted = 9.5;
      else if (ieltsScore >= 6.0) converted = 9.0;
      s3 = Math.max(subject3, converted);
    }
    return Math.round((subject1 + subject2 + s3) * 100) / 100;
  }, [subject1, subject2, subject3, hasIelts, ieltsScore, selectedComb]);

  // MOET Priority score calculation formula (Ministry of Education & Training)
  // If rawSum >= 22.5: Priority = ((30 - rawSum) / 7.5) * nominalPriority
  const priorityScore = useMemo(() => {
    let areaPoints = 0;
    if (area === 'KV1') areaPoints = 0.75;
    else if (area === 'KV2-NT') areaPoints = 0.5;
    else if (area === 'KV2') areaPoints = 0.25;

    let objPoints = 0;
    if (priorityObj === 'dt1') objPoints = 2.0;
    else if (priorityObj === 'dt2') objPoints = 1.0;

    const nominalPriority = areaPoints + objPoints;
    if (nominalPriority === 0) return 0;

    if (rawSum >= 22.5) {
      const reduced = ((30 - rawSum) / 7.5) * nominalPriority;
      return Math.max(0, Math.round(reduced * 100) / 100);
    }
    return nominalPriority;
  }, [area, priorityObj, rawSum]);

  // Total final admission score
  const totalScore = Math.min(30, Math.round((rawSum + priorityScore) * 100) / 100);

  // Predictions across top universities matching this combination
  const predictions: PredictionResult[] = useMemo(() => {
    const list: PredictionResult[] = [];

    UNIVERSITIES.forEach((uni) => {
      uni.majors.forEach((major) => {
        if (major.combinations.includes(selectedComb)) {
          const diff = Math.round((totalScore - major.benchmark2025) * 100) / 100;
          let status: 'safe' | 'target' | 'risky' = 'target';
          let percentage = 75;
          let advice = 'Khả năng cạnh tranh tốt, đặt ở nhóm nguyện vọng 2 - 4.';

          if (diff >= 0.75) {
            status = 'safe';
            percentage = 95;
            advice = 'Tỷ lệ đỗ rất cao. Thích hợp làm nguyện vọng an toàn chắc chắn.';
          } else if (diff < -0.5) {
            status = 'risky';
            percentage = 35;
            advice = 'Điểm chuẩn cao hơn điểm của bạn. Nên cân nhắc đặt làm nguyện vọng mạo hiểm NV1.';
          } else {
            status = 'target';
            percentage = 68;
            advice = 'Điểm số sát sao ngưỡng chuẩn năm ngoái. Tỷ lệ cạnh tranh vừa sức.';
          }

          list.push({
            school: uni,
            major,
            userScore: totalScore,
            targetBenchmark: major.benchmark2025,
            difference: diff,
            status,
            percentage,
            advice,
          });
        }
      });
    });

    // Sort by most relevant / safest first
    return list.sort((a, b) => b.difference - a.difference);
  }, [selectedComb, totalScore]);

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-0.5">
          <Calculator className="w-4 h-4" />
          <span>Trụ cột 2: Tính điểm & Dự đoán trúng tuyển</span>
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Máy tính Điểm xét tuyển & Cảnh báo Nguyện vọng
        </h2>
        <p className="text-xs text-slate-500">
          Tự động áp dụng công thức ưu tiên mới của Bộ GD&ĐT và quy đổi chứng chỉ ngoại ngữ
        </p>
      </div>

      {/* Input Score Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-4">
        {/* Combination Selector */}
        <div>
          <label className="block text-2xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Chọn tổ hợp môn xét tuyển:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {COMBINATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedComb(c.id)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  selectedComb === c.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Subject Score Steppers */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
          <div>
            <label className="block text-3xs font-semibold text-slate-500 mb-1">
              Môn 1 (Toán / Văn):
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={subject1}
              onChange={(e) => setSubject1(parseFloat(e.target.value) || 0)}
              className="w-full text-sm font-bold font-mono text-center py-1.5 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-3xs font-semibold text-slate-500 mb-1">
              Môn 2 (Lý / Sử / Hóa):
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={subject2}
              onChange={(e) => setSubject2(parseFloat(e.target.value) || 0)}
              className="w-full text-sm font-bold font-mono text-center py-1.5 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-3xs font-semibold text-slate-500 mb-1">
              Môn 3 (Anh / Hóa / Sinh):
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={subject3}
              onChange={(e) => setSubject3(parseFloat(e.target.value) || 0)}
              className="w-full text-sm font-bold font-mono text-center py-1.5 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Priority Area & Object */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-3xs font-semibold text-slate-500 mb-1">
              Khu vực ưu tiên:
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as typeof area)}
              className="w-full py-1.5 px-2 bg-white border border-slate-200 rounded-xl text-2xs font-semibold text-slate-800"
            >
              <option value="KV3">KV3 (Nội thành - 0đ)</option>
              <option value="KV2">KV2 (Thị xã, TP nhỏ - +0.25đ)</option>
              <option value="KV2-NT">KV2-NT (Nông thôn - +0.5đ)</option>
              <option value="KV1">KV1 (Vùng khó khăn - +0.75đ)</option>
            </select>
          </div>

          <div>
            <label className="block text-3xs font-semibold text-slate-500 mb-1">
              Đối tượng ưu tiên:
            </label>
            <select
              value={priorityObj}
              onChange={(e) => setPriorityObj(e.target.value as typeof priorityObj)}
              className="w-full py-1.5 px-2 bg-white border border-slate-200 rounded-xl text-2xs font-semibold text-slate-800"
            >
              <option value="none">Không có ưu tiên (0đ)</option>
              <option value="dt1">Nhóm ĐT 01-04 (+2.0đ)</option>
              <option value="dt2">Nhóm ĐT 05-07 (+1.0đ)</option>
            </select>
          </div>
        </div>

        {/* IELTS Toggle */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasIelts}
              onChange={(e) => setHasIelts(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-semibold text-slate-700">Quy đổi chứng chỉ IELTS tiếng Anh</span>
          </label>

          {hasIelts && (
            <div className="flex items-center gap-1.5">
              <span className="text-3xs text-slate-400">Band:</span>
              <select
                value={ieltsScore}
                onChange={(e) => setIeltsScore(parseFloat(e.target.value))}
                className="py-0.5 px-1.5 text-2xs font-bold font-mono border border-indigo-200 rounded-lg bg-indigo-50 text-indigo-700"
              >
                <option value="5.5">5.5 (8.5đ)</option>
                <option value="6.0">6.0 (9.0đ)</option>
                <option value="6.5">6.5 (9.5đ)</option>
                <option value="7.0">≥ 7.0 (10.0đ)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Total Score Output Banner */}
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white rounded-3xl p-5 shadow-md flex items-center justify-between">
        <div>
          <span className="text-3xs uppercase tracking-wider text-indigo-200 font-semibold block">
            Tổng điểm xét tuyển ({selectedComb})
          </span>
          <div className="text-3xl font-extrabold font-mono text-amber-300 mt-0.5 tabular-nums">
            {totalScore.toFixed(2)}
          </div>
          <p className="text-3xs text-indigo-200 mt-1 font-mono">
            Điểm 3 môn: {rawSum.toFixed(2)} + Điểm ưu tiên: {priorityScore.toFixed(2)}
          </p>
        </div>

        <div className="text-right">
          <span className="text-2xs bg-white/20 text-white px-2.5 py-1 rounded-full font-bold">
            Thang điểm 30
          </span>
          {rawSum >= 22.5 && priorityScore > 0 && (
            <span className="block text-3xs text-amber-300 mt-1.5">
              *Đã áp dụng giảm điểm UT theo Bộ GD&ĐT
            </span>
          )}
        </div>
      </div>

      {/* Prediction List with Safe / Target / Risky Badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Dự đoán cơ hội trúng tuyển ({predictions.length} ngành phù hợp):
            </h3>
          </div>
        </div>

        {predictions.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-slate-400 text-xs">
            Chưa có ngành nào xét tuyển khối {selectedComb}. Hãy thử đổi tổ hợp A00, A01 hoặc D01.
          </div>
        ) : (
          <div className="space-y-2.5">
            {predictions.map((res, idx) => {
              const isSafe = res.status === 'safe';
              const isRisky = res.status === 'risky';

              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-2xl p-3.5 shadow-2xs space-y-2 transition-all ${
                    isSafe
                      ? 'border-emerald-200 hover:border-emerald-400'
                      : isRisky
                      ? 'border-rose-200 hover:border-rose-400'
                      : 'border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-3xs font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                          {res.school.shortName}
                        </span>
                        <span className="text-3xs text-slate-400">· Miền {res.school.region}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{res.major.name}</h4>
                      <span className="text-3xs text-slate-500 font-medium">
                        {res.school.name}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="text-right shrink-0">
                      <span
                        className={`text-3xs font-bold px-2 py-0.5 rounded-full inline-block ${
                          isSafe
                            ? 'bg-emerald-100 text-emerald-800'
                            : isRisky
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isSafe ? '🟢 An toàn' : isRisky ? '🔴 Mạo hiểm' : '🟡 Vừa sức'}
                      </span>
                      <span className="block text-2xs font-mono font-bold text-slate-700 mt-1">
                        Chuẩn: {res.targetBenchmark}
                      </span>
                    </div>
                  </div>

                  {/* Difference comparison strip */}
                  <div className="flex items-center justify-between text-2xs bg-slate-50 p-2 rounded-xl">
                    <span className="text-slate-500">Chênh lệch điểm:</span>
                    <span
                      className={`font-mono font-bold ${
                        res.difference >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {res.difference >= 0 ? `+${res.difference}` : res.difference} điểm
                    </span>
                  </div>

                  <p className="text-3xs text-slate-500 leading-snug italic">
                    💡 {res.advice}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3-Tier Admission Strategy Guide */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
        <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Chiến lược xếp thứ tự nguyện vọng thông minh:</span>
        </h4>
        <ul className="space-y-1 text-2xs text-amber-800 leading-relaxed">
          <li>
            <strong>• NV 1 & NV 2 (Mơ ước):</strong> Đặt các ngành/trường bạn khao khát nhất dù điểm cao hơn từ 0.5 - 1.0 điểm.
          </li>
          <li>
            <strong>• NV 3, 4, 5 (Vừa sức):</strong> Đặt các ngành có điểm chuẩn bằng hoặc thấp hơn điểm của bạn 0.5 điểm.
          </li>
          <li>
            <strong>• NV 6 & 7 (An toàn lót đường):</strong> Đặt các trường chắc chắn đỗ (thấp hơn từ 1.5 - 2.5 điểm) để không bị trượt đại học.
          </li>
        </ul>
      </div>
    </div>
  );
}
