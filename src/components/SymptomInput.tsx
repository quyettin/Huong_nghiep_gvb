import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  Layers,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { PRESET_CASES } from '../data/defaultKnowledgeBase';
import { PresetCase, Symptom, SymptomCategory, UserSymptom } from '../types/mycin';
import { normalizeVietnamese } from '../utils/mycinEngine';

interface SymptomInputProps {
  allSymptoms: Symptom[];
  selectedSymptoms: UserSymptom[];
  onAddSymptom: (symptomId: string, cf?: number) => void;
  onRemoveSymptom: (symptomId: string) => void;
  onUpdateCf: (symptomId: string, cf: number) => void;
  onClearAll: () => void;
  onApplyPreset: (preset: PresetCase) => void;
  onQuickCreateSymptom: (name: string, category: SymptomCategory) => void;
}

const CATEGORIES: { id: SymptomCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tất cả nhóm' },
  { id: 'toan_than', label: 'Toàn thân' },
  { id: 'than_kinh', label: 'Thần kinh' },
  { id: 'ho_hap', label: 'Hô hấp' },
  { id: 'tieu_hoa', label: 'Tiêu hóa' },
  { id: 'tiet_nieu', label: 'Tiết niệu' },
  { id: 'da_niem_mac', label: 'Da & Niêm mạc' },
  { id: 'can_lam_sang', label: 'Xét nghiệm' },
];

const CF_OPTIONS = [
  { value: 1.0, label: 'Chắc chắn (1.0)', short: '100%' },
  { value: 0.8, label: 'Rất rõ (0.8)', short: '80%' },
  { value: 0.6, label: 'Vừa phải (0.6)', short: '60%' },
  { value: 0.4, label: 'Nghi ngờ (0.4)', short: '40%' },
  { value: 0.2, label: 'Ít khả năng (0.2)', short: '20%' },
];

export default function SymptomInput({
  allSymptoms,
  selectedSymptoms,
  onAddSymptom,
  onRemoveSymptom,
  onUpdateCf,
  onClearAll,
  onApplyPreset,
  onQuickCreateSymptom,
}: SymptomInputProps) {
  const [query, setQuery] = useState('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory | 'all'>('all');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedIds = new Set(selectedSymptoms.map((s) => s.symptomId));
  const symptomMap = new Map<string, Symptom>(allSymptoms.map((s) => [s.id, s]));

  // Filter symptoms based on search query and category
  const normalizedQuery = normalizeVietnamese(query);

  const filteredSuggestions = allSymptoms.filter((symptom) => {
    if (selectedIds.has(symptom.id)) return false;
    if (selectedCategory !== 'all' && symptom.category !== selectedCategory) return false;

    if (!normalizedQuery) return true;

    const normName = normalizeVietnamese(symptom.name);
    const normDesc = normalizeVietnamese(symptom.description || '');
    const normCategory = normalizeVietnamese(symptom.categoryLabel);
    const matchesAliases =
      symptom.aliases?.some((alias) => normalizeVietnamese(alias).includes(normalizedQuery)) ||
      false;

    return (
      normName.includes(normalizedQuery) ||
      normDesc.includes(normalizedQuery) ||
      normCategory.includes(normalizedQuery) ||
      matchesAliases
    );
  });

  // Limit suggestions to prevent performance stutter
  const visibleSuggestions = filteredSuggestions.slice(0, 8);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation for autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpenDropdown) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpenDropdown(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < visibleSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : visibleSuggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleSuggestions.length > 0 && visibleSuggestions[highlightedIndex]) {
        handleSelectSymptom(visibleSuggestions[highlightedIndex].id);
      } else if (query.trim()) {
        // Quick create
        onQuickCreateSymptom(query.trim(), 'toan_than');
        setQuery('');
        setIsOpenDropdown(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpenDropdown(false);
    }
  };

  const handleSelectSymptom = (symptomId: string) => {
    onAddSymptom(symptomId, 1.0);
    setQuery('');
    setIsOpenDropdown(false);
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  // Popular symptoms for quick addition
  const popularSymptoms = allSymptoms
    .filter((s) => !selectedIds.has(s.id))
    .slice(0, 6);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-6">
      {/* Header section with Presets */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              1. Khai báo triệu chứng lâm sàng
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Gõ triệu chứng để nhận đề xuất tự động hoặc chọn các ca bệnh mẫu kiểm thử
            </p>
          </div>

          {selectedSymptoms.length > 0 && (
            <button
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium self-start sm:self-auto transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa toàn bộ ({selectedSymptoms.length})</span>
            </button>
          )}
        </div>

        {/* Clinical Presets Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Thử nghiệm nhanh ca bệnh mẫu:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_CASES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onApplyPreset(preset)}
                className="text-left text-xs bg-white hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 px-2.5 py-1.5 rounded-md transition-all shadow-2xs"
                title={preset.patientProfile}
              >
                <span className="font-semibold">{preset.title.split(':')[0]}:</span>{' '}
                <span className="text-slate-500">{preset.expectedDiagnosis}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Autocomplete Search Input with Live Suggestions */}
      <div className="relative">
        <label htmlFor="symptom-search" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Nhập triệu chứng (Tìm kiếm và gợi ý thông minh):
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="symptom-search"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpenDropdown(true);
              setHighlightedIndex(0);
            }}
            onFocus={() => setIsOpenDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder="Ví dụ: sốt cao, cổ cứng, ho đờm, đau hố chậu phải, tiểu buốt..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-2xs"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills for Autocomplete */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setIsOpenDropdown(true);
              }}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Autocomplete Dropdown List */}
        {isOpenDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-80 overflow-y-auto divide-y divide-slate-100"
          >
            {visibleSuggestions.length > 0 ? (
              visibleSuggestions.map((symptom, index) => {
                const isHighlighted = index === highlightedIndex;
                return (
                  <button
                    key={symptom.id}
                    onClick={() => handleSelectSymptom(symptom.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full text-left px-4 py-2.5 transition-colors flex items-start justify-between gap-3 ${
                      isHighlighted ? 'bg-cyan-50/70 text-cyan-950' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {symptom.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          · {symptom.categoryLabel}
                        </span>
                      </div>
                      {symptom.description && (
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {symptom.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-medium text-cyan-600 shrink-0 mt-1 inline-flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" />
                      Chọn
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center">
                <p className="text-xs text-slate-500 mb-2">
                  Không tìm thấy triệu chứng sẵn có khớp với &ldquo;{query}&rdquo;
                </p>
                {query.trim() && (
                  <button
                    onClick={() => {
                      onQuickCreateSymptom(query.trim(), 'toan_than');
                      setQuery('');
                      setIsOpenDropdown(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Thêm &ldquo;{query}&rdquo; vào từ điển triệu chứng
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick suggestions when query is empty */}
      {!query && popularSymptoms.length > 0 && selectedSymptoms.length < 3 && (
        <div>
          <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Gợi ý triệu chứng phổ biến thường gặp:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {popularSymptoms.map((sym) => (
              <button
                key={sym.id}
                onClick={() => handleSelectSymptom(sym.id)}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 transition-all"
              >
                <Plus className="w-3 h-3 text-slate-400" />
                <span>{sym.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Symptoms List with Certainty Factor (CF) Controls */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Triệu chứng đã chọn ({selectedSymptoms.length})
            </h3>
            <span className="text-xs text-slate-400">· Hệ số tin cậy lâm sàng (CF)</span>
          </div>
          <span className="text-xs text-slate-500">Mặc định: 1.0 (100% Chắc chắn)</span>
        </div>

        {selectedSymptoms.length === 0 ? (
          <div className="border border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 space-y-1">
            <AlertCircle className="w-6 h-6 mx-auto text-slate-300" />
            <p className="text-xs font-medium text-slate-600">Chưa có triệu chứng nào được ghi nhận</p>
            <p className="text-xs text-slate-400">
              Nhập triệu chứng ở ô tìm kiếm phía trên hoặc chọn ca bệnh mẫu để bắt đầu suy diễn MYCIN
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedSymptoms.map((userSym) => {
              const sym = symptomMap.get(userSym.symptomId);
              if (!sym) return null;

              return (
                <div
                  key={userSym.symptomId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-cyan-700 font-semibold">
                        {sym.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-sm font-semibold text-slate-900">{sym.name}</span>
                    </div>
                    {sym.description && (
                      <p className="text-xs text-slate-500">{sym.description}</p>
                    )}
                  </div>

                  {/* Certainty factor picker */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                      <span className="text-xs font-mono font-medium text-slate-600">
                        CF: {userSym.cf.toFixed(1)}
                      </span>
                      <div className="relative group">
                        <select
                          value={userSym.cf}
                          onChange={(e) =>
                            onUpdateCf(userSym.symptomId, parseFloat(e.target.value))
                          }
                          className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                        >
                          {CF_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveSymptom(userSym.symptomId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                      title="Xóa triệu chứng này"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
