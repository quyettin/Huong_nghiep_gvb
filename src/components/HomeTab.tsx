import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Bot,
  Calculator,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  Newspaper,
  Search,
  Sparkles,
} from 'lucide-react';
import { NEWS_ITEMS, UNIVERSITIES } from '../data/unipathData';
import { NewsItem, University } from '../types/unipath';

interface HomeTabProps {
  onNavigateTab: (tab: 'home' | 'search' | 'career' | 'calc' | 'ai') => void;
  onSelectUniversity: (uni: University) => void;
  onSelectNews: (news: NewsItem) => void;
}

export default function HomeTab({
  onNavigateTab,
  onSelectUniversity,
  onSelectNews,
}: HomeTabProps) {
  // Live countdown to THPT National Exam (Expected late June 2027)
  const targetDate = new Date('2027-06-25T07:30:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 245,
    hours: 1,
    minutes: 46,
    seconds: 7,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const featuredUniversities = UNIVERSITIES.slice(0, 5);

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Header (Brand: UniPath VN + Bookmark & AI Help button) */}
      <div className="bg-indigo-600 -mx-4 -mt-4 px-4 pt-5 pb-5 rounded-b-3xl text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-indigo-500/80 border border-indigo-400 flex items-center justify-center text-xl shadow-xs">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white">UniPath</span>
                <span className="text-3xs font-bold uppercase tracking-wider bg-indigo-800/80 border border-indigo-400/50 px-1.5 py-0.5 rounded text-indigo-100">
                  VN
                </span>
              </div>
              <p className="text-2xs text-indigo-200 font-medium">Định hướng tương lai Gen Z</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Đã lưu trường và bài viết yêu thích vào danh bạ của bạn!')}
              className="p-2 rounded-xl bg-indigo-500/40 hover:bg-indigo-500/60 text-white transition-colors"
              title="Danh sách đã lưu"
            >
              <Bookmark className="w-4 h-4 text-amber-300" />
            </button>
            <button
              onClick={() => onNavigateTab('ai')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-semibold text-white transition-colors border border-white/25"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Help</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Countdown Card (Matching user screenshot) */}
      <div className="bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#4338ca] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden border border-indigo-900/50">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between text-2xs mb-2">
          <div className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 px-2.5 py-1 rounded-full font-medium">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Đếm ngược Kỳ Thi 2027</span>
          </div>
          <span className="text-indigo-200 bg-indigo-900/60 px-2 py-0.5 rounded-md font-mono text-3xs">
            Dự kiến 06/2027
          </span>
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight mt-1 mb-3">
          Thi Tốt Nghiệp THPT Quốc Gia
        </h2>

        {/* 4 Countdown Blocks */}
        <div className="grid grid-cols-4 gap-2 text-center my-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl py-2 px-1">
            <div className="text-xl font-bold font-mono text-amber-300 tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-3xs uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">
              NGÀY
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl py-2 px-1">
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-3xs uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">
              GIỜ
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl py-2 px-1">
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-3xs uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">
              PHÚT
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl py-2 px-1">
            <div className="text-xl font-bold font-mono text-emerald-300 tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-3xs uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">
              GIÂY
            </div>
          </div>
        </div>

        <p className="text-3xs text-indigo-200/90 italic text-center mt-2.5">
          “Cố gắng hôm nay – Tương lai ngày mai! Bắt đầu chuẩn bị nguyện vọng ngay.”
        </p>
      </div>

      {/* 3. 4 Quick Actions (Tra trường, Trắc nghiệm, Tính điểm, Hỏi AI) */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigateTab('search')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-slate-800"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-2xs font-semibold text-slate-800 text-center whitespace-nowrap">
            Tra trường
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('career')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-slate-800"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-2xs font-semibold text-slate-800 text-center whitespace-nowrap">
            Trắc nghiệm
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('calc')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-slate-800"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-2xs font-semibold text-slate-800 text-center whitespace-nowrap">
            Tính điểm
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('ai')}
          className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 text-slate-800"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <span className="text-2xs font-semibold text-slate-800 text-center whitespace-nowrap">
            Hỏi AI
          </span>
        </button>
      </div>

      {/* 4. AI Assistant Promo Banner */}
      <div
        onClick={() => onNavigateTab('ai')}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-md cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-white">Trợ lý Tuyển sinh AI 24/7</h3>
              <span className="bg-amber-400 text-slate-900 text-3xs font-extrabold px-1.5 py-0.2 rounded uppercase">
                NEW
              </span>
            </div>
            <p className="text-3xs text-indigo-100 mt-0.5 line-clamp-1">
              Giải đáp IELTS, tổ hợp môn & quy đổi NV
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/80 shrink-0" />
      </div>

      {/* 5. Featured Universities Section (Horizontal Scroll Carousel) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Đại học nổi bật 2026
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('search')}
            className="text-2xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 snap-x">
          {featuredUniversities.map((uni) => (
            <div
              key={uni.id}
              onClick={() => onSelectUniversity(uni)}
              className="min-w-[190px] max-w-[210px] bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between shrink-0 snap-start active:scale-95"
            >
              <div>
                <div className="flex items-start justify-between gap-1.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                    {uni.logoIcon}
                  </div>
                  <span className="text-3xs font-bold font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                    {uni.shortName}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                  {uni.name}
                </h4>

                <div className="mt-2 text-2xs text-slate-500">
                  <span>Điểm 2025: </span>
                  <span className="font-bold text-indigo-600 font-mono">
                    {uni.benchmarkAvg2025.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-2xs">
                <span className="text-slate-500">{uni.region}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Admission News Section */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Newspaper className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Tin tuyển sinh quan trọng
          </h3>
        </div>

        <div className="space-y-3">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="flex items-start gap-2.5 p-1 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span
                className={`text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mt-0.5 ${item.tagColor}`}
              >
                {item.tag}
              </span>
              <div className="space-y-0.5">
                <h4 className="text-xs font-medium text-slate-800 leading-snug hover:text-indigo-600">
                  {item.title}
                </h4>
                <span className="text-3xs text-slate-400 block">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
