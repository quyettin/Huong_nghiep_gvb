import { ReactNode } from 'react';
import {
  Battery,
  Bot,
  Calculator,
  Compass,
  Home,
  Monitor,
  Search,
  Smartphone,
  Wifi,
} from 'lucide-react';

interface MobileFrameProps {
  children: ReactNode;
  activeTab: 'home' | 'search' | 'career' | 'calc' | 'ai';
  onNavigateTab: (tab: 'home' | 'search' | 'career' | 'calc' | 'ai') => void;
  isMobileOnlyMode: boolean;
  onToggleMode: () => void;
  onOpenMobileInstallModal: () => void;
}

export default function MobileFrame({
  children,
  activeTab,
  onNavigateTab,
  isMobileOnlyMode,
  onToggleMode,
  onOpenMobileInstallModal,
}: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 transition-colors">
      {/* Top Device Toolbar (Responsive controller for desktop users) */}
      <header className="w-full max-w-4xl mx-auto mb-3 px-4 py-2 hidden sm:flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-bold text-white tracking-tight">UniPath VN Mobile Preview</span>
          <span className="text-slate-500">· Định hướng tương lai Gen Z</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMode}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-2xs font-medium"
          >
            {isMobileOnlyMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                <span>Xem Toàn màn hình</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Khung iPhone 16</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenMobileInstallModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors text-2xs font-semibold shadow-xs"
          >
            <span>📲 Cài lên điện thoại / QR</span>
          </button>
        </div>
      </header>

      {/* Main Container - either bounded phone or full responsive */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${
          isMobileOnlyMode
            ? 'max-w-[410px] bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[9px] border-slate-800 overflow-hidden min-h-[844px]'
            : 'max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-700 overflow-hidden min-h-[850px]'
        }`}
      >
        {/* Dynamic Island / Status Bar (matching screenshot: 05:43, wifi, cell, 98% battery) */}
        <div className="bg-indigo-600 text-white px-6 pt-3 pb-2 flex items-center justify-between text-2xs font-semibold select-none shrink-0 z-30">
          {/* Time */}
          <div className="flex items-center gap-1 font-mono tracking-tight text-white/95">
            <span>05:43</span>
          </div>

          {/* Dynamic Island pill */}
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />

          {/* Signal, Wifi, Battery */}
          <div className="flex items-center gap-2 text-white/95 text-3xs font-mono">
            <div className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-1 bg-white rounded-xs" />
              <span className="w-0.5 h-1.5 bg-white rounded-xs" />
              <span className="w-0.5 h-2 bg-white rounded-xs" />
              <span className="w-0.5 h-2.5 bg-white rounded-xs" />
            </div>
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5 border border-white/80 rounded px-1 py-0.2">
              <span className="text-3xs font-bold">98%</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 bg-slate-50">
          {children}
        </div>

        {/* Fixed Mobile Bottom Navigation Bar (5 tabs matching user screenshot) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
          {/* Tab 1: Trang chủ */}
          <button
            onClick={() => onNavigateTab('home')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors min-w-[56px] ${
              activeTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-3xs tracking-tight">Trang chủ</span>
          </button>

          {/* Tab 2: Tra cứu */}
          <button
            onClick={() => onNavigateTab('search')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors min-w-[56px] ${
              activeTab === 'search' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-3xs tracking-tight">Tra cứu</span>
          </button>

          {/* Tab 3: Hướng nghiệp */}
          <button
            onClick={() => onNavigateTab('career')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors min-w-[56px] ${
              activeTab === 'career' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-3xs tracking-tight">Hướng nghiệp</span>
          </button>

          {/* Tab 4: Tính điểm */}
          <button
            onClick={() => onNavigateTab('calc')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors min-w-[56px] ${
              activeTab === 'calc' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span className="text-3xs tracking-tight">Tính điểm</span>
          </button>

          {/* Tab 5: Trợ lý AI */}
          <button
            onClick={() => onNavigateTab('ai')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors min-w-[56px] ${
              activeTab === 'ai' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span className="text-3xs tracking-tight">Trợ lý AI</span>
          </button>
        </nav>

        {/* Home Indicator bar on mobile */}
        {isMobileOnlyMode && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full z-40 pointer-events-none" />
        )}
      </div>
    </div>
  );
}
