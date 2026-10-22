import { useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  HelpCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { CAREER_DATABASE, HOLLAND_QUESTIONS } from '../data/unipathData';
import { CareerMatch, HollandScore } from '../types/unipath';

interface CareerTabProps {
  onNavigateTab: (tab: 'home' | 'search' | 'career' | 'calc' | 'ai') => void;
}

export default function CareerTab({ onNavigateTab }: CareerTabProps) {
  // Test states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Pre-fill demo answers if user wants to see instant result
  const handleQuickDemo = () => {
    const demoAnswers: Record<number, number> = {
      1: 3, 2: 2, 3: 4, // R: 9
      4: 5, 5: 5, 6: 5, // I: 15 (High)
      7: 4, 8: 5, 9: 4, // A: 13 (High)
      10: 4, 11: 3, 12: 4, // S: 11
      13: 4, 14: 3, 15: 4, // E: 11
      16: 3, 17: 2, 18: 3, // C: 8
    };
    setAnswers(demoAnswers);
    setIsCompleted(true);
  };

  const handleSelectScore = (score: number) => {
    const question = HOLLAND_QUESTIONS[currentQuestionIndex];
    setAnswers((prev) => ({ ...prev, [question.id]: score }));

    if (currentQuestionIndex < HOLLAND_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Calculate Holland RIASEC Scores
  const calculateScores = (): HollandScore => {
    const score: HollandScore = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    HOLLAND_QUESTIONS.forEach((q) => {
      const ans = answers[q.id] || 3;
      score[q.category] += ans;
    });
    return score;
  };

  const scores = calculateScores();

  // Top 3 Holland traits
  const traitDetails: Record<
    keyof HollandScore,
    { name: string; title: string; desc: string; color: string; bg: string }
  > = {
    R: {
      name: 'R - Thực tế (Realistic)',
      title: 'Người hành động',
      desc: 'Thích máy móc, công cụ, kỹ thuật, thể thao và thao tác thực tiễn ngoài trời.',
      color: 'text-amber-600',
      bg: 'bg-amber-500',
    },
    I: {
      name: 'I - Nghiên cứu (Investigative)',
      title: 'Nhà tư duy',
      desc: 'Thích khám phá khoa học, giải quyết vấn đề trừu tượng, phân tích dữ liệu và AI.',
      color: 'text-blue-600',
      bg: 'bg-blue-500',
    },
    A: {
      name: 'A - Nghệ thuật (Artistic)',
      title: 'Người sáng tạo',
      desc: 'Giàu trí tưởng tượng, độc đáo, yêu nghệ thuật, thiết kế, âm nhạc và đổi mới.',
      color: 'text-purple-600',
      bg: 'bg-purple-500',
    },
    S: {
      name: 'S - Xã hội (Social)',
      title: 'Người kết nối',
      desc: 'Thấu cảm, thích giúp đỡ, giảng dạy, tư vấn và làm việc vì cộng đồng.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-500',
    },
    E: {
      name: 'E - Quản lý (Enterprising)',
      title: 'Nhà lãnh đạo',
      desc: 'Tự tin, thích kinh doanh, đàm phán, quản trị dự án và dẫn dắt người khác.',
      color: 'text-rose-600',
      bg: 'bg-rose-500',
    },
    C: {
      name: 'C - Quy củ (Conventional)',
      title: 'Người tổ chức',
      desc: 'Cẩn thận, tỉ mỉ, làm việc theo quy trình chuẩn, tài chính, kế toán và số liệu.',
      color: 'text-slate-600',
      bg: 'bg-slate-500',
    },
  };

  const sortedTraits = (Object.keys(scores) as (keyof HollandScore)[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  const topCode = sortedTraits.slice(0, 3).join('');

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-0.5">
          <Compass className="w-4 h-4" />
          <span>Trụ cột 1: Hướng nghiệp Cá nhân hóa</span>
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Trắc nghiệm Tính cách & Sở thích Holland (RIASEC)
        </h2>
        <p className="text-xs text-slate-500">
          Bộ công cụ hướng nghiệp tiêu chuẩn quốc tế giúp bạn thấu hiểu bản thân và chọn đúng ngành học
        </p>
      </div>

      {!isCompleted ? (
        /* Test in progress */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs space-y-5">
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-2xs mb-1.5">
              <span className="font-semibold text-slate-700">
                Câu hỏi {currentQuestionIndex + 1} / {HOLLAND_QUESTIONS.length}
              </span>
              <span className="font-mono text-indigo-600 font-bold">
                {Math.round(((currentQuestionIndex + 1) / HOLLAND_QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / HOLLAND_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 min-h-[110px] flex flex-col justify-center">
            <span className="text-3xs uppercase font-bold tracking-wider text-indigo-600 mb-1">
              {HOLLAND_QUESTIONS[currentQuestionIndex].categoryName}
            </span>
            <p className="text-sm font-semibold text-slate-900 leading-snug">
              &ldquo;{HOLLAND_QUESTIONS[currentQuestionIndex].text}&rdquo;
            </p>
          </div>

          {/* 5-scale Likert Answer buttons */}
          <div className="space-y-2">
            <span className="text-2xs font-semibold text-slate-500 block text-center">
              Mức độ phù hợp với bạn:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {[
                { score: 5, label: 'Rất thích / Rất đúng với tôi', color: 'hover:bg-emerald-50 hover:border-emerald-300 text-emerald-900' },
                { score: 4, label: 'Khá thích / Khá giống tôi', color: 'hover:bg-blue-50 hover:border-blue-300 text-blue-900' },
                { score: 3, label: 'Bình thường / Phân vân', color: 'hover:bg-slate-100 hover:border-slate-300 text-slate-700' },
                { score: 2, label: 'Không thích lắm', color: 'hover:bg-amber-50 hover:border-amber-300 text-amber-900' },
                { score: 1, label: 'Hoàn toàn không thích', color: 'hover:bg-rose-50 hover:border-rose-300 text-rose-900' },
              ].map((opt) => (
                <button
                  key={opt.score}
                  onClick={() => handleSelectScore(opt.score)}
                  className={`w-full text-left py-2.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold transition-all shadow-2xs active:scale-[0.99] ${opt.color}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demo button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
            <span>Bạn muốn xem kết quả mẫu ngay?</span>
            <button
              onClick={handleQuickDemo}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Xem kết quả mẫu &rarr;
            </button>
          </div>
        </div>
      ) : (
        /* Test Result View */
        <div className="space-y-4">
          {/* Top Result Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xs uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">
                Mã Hướng Nghiệp Của Bạn
              </span>
              <button
                onClick={handleReset}
                className="text-2xs text-indigo-200 hover:text-white flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            </div>

            <div className="text-3xl font-extrabold font-mono tracking-wider text-amber-300 mt-1 mb-1">
              {topCode}
            </div>

            <div className="text-xs font-semibold text-white">
              {traitDetails[sortedTraits[0]].name.split('-')[1]} +{' '}
              {traitDetails[sortedTraits[1]].name.split('-')[1]} +{' '}
              {traitDetails[sortedTraits[2]].name.split('-')[1]}
            </div>

            <p className="text-2xs text-indigo-100/90 mt-2 leading-relaxed">
              Bạn có thế mạnh nổi trội về tư duy phân tích, khả năng nghiên cứu độc lập và sự sáng tạo. Bạn phù hợp nhất với môi trường khuyến khích đổi mới, giải quyết các thách thức trí tuệ cao.
            </p>
          </div>

          {/* 6 RIASEC Score Breakdown Bars */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Phân bố điểm số 6 nhóm Holland:
            </h3>

            <div className="space-y-2.5">
              {sortedTraits.map((traitKey) => {
                const trait = traitDetails[traitKey];
                const score = scores[traitKey];
                const maxPossible = 15;
                const percentage = Math.round((score / maxPossible) * 100);

                return (
                  <div key={traitKey} className="space-y-1">
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-semibold text-slate-800">{trait.name}</span>
                      <span className="font-mono font-bold text-slate-600">
                        {score}/{maxPossible} điểm
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${trait.bg} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Job Matching Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Gợi ý Ngành nghề phù hợp nhất (Job Matching):
                </h3>
              </div>
              <span className="text-3xs text-slate-400">Xu hướng 2027-2030</span>
            </div>

            <div className="space-y-3">
              {CAREER_DATABASE.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2.5 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-3xs font-mono font-bold bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded">
                          Mã {job.hollandCode}
                        </span>
                        <span className="text-3xs font-semibold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded">
                          Nhu cầu: {job.marketDemand}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{job.title}</h4>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-3xs text-slate-400 block font-medium">Lương khởi điểm</span>
                      <span className="text-xs font-bold font-mono text-emerald-600">
                        {job.salaryAvg}
                      </span>
                    </div>
                  </div>

                  <p className="text-2xs text-slate-600 leading-relaxed">{job.description}</p>

                  <div className="bg-slate-50 rounded-xl p-2.5 text-2xs space-y-1">
                    <div className="text-slate-500">
                      <strong className="text-slate-700">Trường đào tạo hàng đầu: </strong>
                      {job.topSchools.join(', ')}
                    </div>
                    <div className="text-slate-500">
                      <strong className="text-slate-700">Môn học nên tập trung: </strong>
                      {job.recommendedSubjects.join(' · ')}
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onNavigateTab('calc')}
                      className="text-2xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Tính điểm đỗ ngành này</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
