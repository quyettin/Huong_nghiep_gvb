import { Activity, BookOpen, GitFork, PlusCircle } from 'lucide-react';

interface TopBarProps {
  activeTab: 'consultation' | 'knowledge' | 'rules' | 'about';
  onSelectTab: (tab: 'consultation' | 'knowledge' | 'rules' | 'about') => void;
  onOpenNewDiseaseModal: () => void;
  onOpenMobileModal: () => void;
}

export default function TopBar({
  activeTab,
  onSelectTab,
  onOpenNewDiseaseModal,
  onOpenMobileModal,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center text-white shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectTab('consultation');
              }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-cyan-700 transition-colors"
            >
              MYCIN Clinical Expert
            </a>
          </div>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('consultation')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'consultation'
                  ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                  : ''
              }`}
            >
              Chẩn đoán lâm sàng
            </button>
            <button
              onClick={() => onSelectTab('knowledge')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'knowledge'
                  ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                  : ''
              }`}
            >
              Cơ sở tri thức bệnh học
            </button>
            <button
              onClick={() => onSelectTab('rules')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'rules'
                  ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                  : ''
              }`}
            >
              Tập luật suy diễn (Rules)
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                activeTab === 'about'
                  ? 'text-cyan-600 font-semibold border-b-2 border-cyan-600'
                  : ''
              }`}
            >
              Mô hình suy diễn MYCIN
            </button>
            <button
              onClick={onOpenMobileModal}
              className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors whitespace-nowrap shrink-0 pb-0.5 inline-flex items-center gap-1"
            >
              Cài đặt điện thoại (App)
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenNewDiseaseModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-600"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm bệnh mới</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
