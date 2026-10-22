import { Calendar, Newspaper, Share2, X } from 'lucide-react';
import { NewsItem } from '../types/unipath';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export default function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className={`text-3xs font-bold uppercase px-2.5 py-0.5 rounded ${news.tagColor}`}>
            {news.tag}
          </span>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-3xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày đăng: {news.date}</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">{news.title}</h3>
          <p className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
            {news.summary}
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-xl"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
