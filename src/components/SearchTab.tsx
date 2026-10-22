import { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  Filter,
  GraduationCap,
  Layers,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { UNIVERSITIES } from '../data/unipathData';
import { Region, SchoolType, University } from '../types/unipath';

interface SearchTabProps {
  onSelectUniversity: (uni: University) => void;
  onNavigateTab: (tab: 'home' | 'search' | 'career' | 'calc' | 'ai') => void;
}

export default function SearchTab({ onSelectUniversity, onNavigateTab }: SearchTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [selectedType, setSelectedType] = useState<SchoolType | 'all'>('all');
  const [benchmarkFilter, setBenchmarkFilter] = useState<'all' | 'under22' | '22to25' | '25to27' | 'above27'>('all');

  // Comparison State (Max 3 schools)
  const [comparedSchoolIds, setComparedSchoolIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filter logic
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter((uni) => {
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = uni.name.toLowerCase().includes(query);
        const matchesShort = uni.shortName.toLowerCase().includes(query);
        const matchesProvince = uni.province.toLowerCase().includes(query);
        const matchesMajor = uni.majors.some(
          (m) => m.name.toLowerCase().includes(query) || m.code.includes(query)
        );

        if (!matchesName && !matchesShort && !matchesProvince && !matchesMajor) {
          return false;
        }
      }

      // Region
      if (selectedRegion !== 'all' && uni.region !== selectedRegion) {
        return false;
      }

      // Type
      if (selectedType !== 'all' && uni.type !== selectedType) {
        return false;
      }

      // Benchmark filter
      if (benchmarkFilter === 'under22' && uni.benchmarkAvg2025 >= 22) return false;
      if (benchmarkFilter === '22to25' && (uni.benchmarkAvg2025 < 22 || uni.benchmarkAvg2025 > 25)) return false;
      if (benchmarkFilter === '25to27' && (uni.benchmarkAvg2025 < 25 || uni.benchmarkAvg2025 > 27)) return false;
      if (benchmarkFilter === 'above27' && uni.benchmarkAvg2025 <= 27) return false;

      return true;
    });
  }, [searchQuery, selectedRegion, selectedType, benchmarkFilter]);

  const toggleCompare = (uniId: string) => {
    if (comparedSchoolIds.includes(uniId)) {
      setComparedSchoolIds((prev) => prev.filter((id) => id !== uniId));
    } else {
      if (comparedSchoolIds.length >= 3) {
        alert('Bạn chỉ có thể so sánh tối đa 3 trường cùng lúc.');
        return;
      }
      setComparedSchoolIds((prev) => [...prev, uniId]);
    }
  };

  const comparedUniversities = UNIVERSITIES.filter((u) => comparedSchoolIds.includes(u.id));

  return (
    <div className="space-y-4 pb-24">
      {/* Tab Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Tra cứu & So sánh Trường ĐH - CĐ
        </h2>
        <p className="text-xs text-slate-500">
          Dữ liệu tuyển sinh chuẩn xác 2023 - 2026, điểm chuẩn, học phí và tỷ lệ việc làm
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm tên trường (Bách Khoa, NEU...), ngành học (CNTT, Y khoa...)"
          className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Smart Filters */}
      <div className="space-y-2">
        {/* Region filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
            Khu vực:
          </span>
          {(['all', 'Bắc', 'Trung', 'Nam'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3 py-1 rounded-full text-2xs font-semibold whitespace-nowrap transition-colors ${
                selectedRegion === r
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {r === 'all' ? 'Tất cả miền' : `Miền ${r}`}
            </button>
          ))}
        </div>

        {/* Benchmark filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
            Điểm chuẩn:
          </span>
          {[
            { id: 'all', label: 'Tất cả mức điểm' },
            { id: 'above27', label: '≥ 27 điểm (Top đầu)' },
            { id: '25to27', label: '25 - 27 điểm' },
            { id: '22to25', label: '22 - 25 điểm' },
            { id: 'under22', label: '< 22 điểm' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setBenchmarkFilter(item.id as typeof benchmarkFilter)}
              className={`px-3 py-1 rounded-full text-2xs font-semibold whitespace-nowrap transition-colors ${
                benchmarkFilter === item.id
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Comparison Status */}
      <div className="flex items-center justify-between text-2xs text-slate-500 px-1">
        <span>
          Tìm thấy <strong>{filteredUniversities.length}</strong> trường phù hợp
        </span>
        {comparedSchoolIds.length > 0 && (
          <span className="text-indigo-600 font-semibold">
            Đang chọn so sánh: {comparedSchoolIds.length}/3
          </span>
        )}
      </div>

      {/* University Card List */}
      <div className="space-y-3">
        {filteredUniversities.map((uni) => {
          const isCompared = comparedSchoolIds.includes(uni.id);

          return (
            <div
              key={uni.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:border-indigo-300 transition-all space-y-3"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div
                  onClick={() => onSelectUniversity(uni)}
                  className="flex items-start gap-2.5 cursor-pointer flex-1"
                >
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                    {uni.logoIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-3xs font-bold font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">
                        {uni.shortName}
                      </span>
                      <span className="text-3xs text-slate-400">· {uni.type}</span>
                      <span className="text-3xs text-slate-400">· Miền {uni.region}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mt-0.5 hover:text-indigo-600 leading-tight">
                      {uni.name}
                    </h3>
                  </div>
                </div>

                {/* Compare Checkbox Trigger */}
                <button
                  onClick={() => toggleCompare(uni.id)}
                  className={`text-2xs font-semibold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 shrink-0 ${
                    isCompared
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700'
                  }`}
                >
                  {isCompared ? <Check className="w-3 h-3" /> : <ArrowLeftRight className="w-3 h-3" />}
                  <span>{isCompared ? 'Đã chọn' : '+ So sánh'}</span>
                </button>
              </div>

              {/* Benchmarks & Key stats */}
              <div
                onClick={() => onSelectUniversity(uni)}
                className="grid grid-cols-3 gap-2 bg-slate-50/80 rounded-xl p-2.5 text-center cursor-pointer"
              >
                <div>
                  <span className="text-3xs text-slate-400 block font-medium">Điểm TB 2025</span>
                  <span className="text-xs font-bold font-mono text-indigo-600">
                    {uni.benchmarkAvg2025.toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block font-medium">Khoảng điểm</span>
                  <span className="text-xs font-bold font-mono text-slate-800">
                    {uni.minBenchmark2025} - {uni.maxBenchmark2025}
                  </span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block font-medium">Việc làm</span>
                  <span className="text-xs font-bold font-mono text-emerald-600">
                    {uni.employmentRate}%
                  </span>
                </div>
              </div>

              {/* Majors preview */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1">
                  {uni.majors.slice(0, 2).map((m) => (
                    <span
                      key={m.id}
                      className="text-3xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {m.name.split('(')[0]}
                    </span>
                  ))}
                  {uni.majors.length > 2 && (
                    <span className="text-3xs text-slate-400 self-center">
                      +{uni.majors.length - 2} ngành
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectUniversity(uni)}
                  className="text-2xs font-semibold text-indigo-600 flex items-center gap-0.5 hover:text-indigo-800 shrink-0"
                >
                  <span>Chi tiết</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Compare Bottom Bar */}
      {comparedSchoolIds.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 max-w-sm mx-auto z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-3 shadow-xl flex items-center justify-between border border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">
              {comparedSchoolIds.length}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">So sánh trường</h4>
              <p className="text-3xs text-slate-400">Đã chọn {comparedSchoolIds.length}/3 trường</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparedSchoolIds([])}
              className="text-3xs text-slate-400 hover:text-white px-2 py-1"
            >
              Hủy
            </button>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>So sánh ngay</span>
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Bảng so sánh song song ({comparedUniversities.length} trường)
                </h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Matrix Table */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-3">
                <div className="text-2xs font-bold uppercase text-slate-400 self-end">
                  Tiêu chí so sánh
                </div>
                {comparedUniversities.map((uni) => (
                  <div key={uni.id} className="text-center space-y-1">
                    <div className="text-xl mx-auto">{uni.logoIcon}</div>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{uni.name}</h4>
                    <span className="text-3xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                      {uni.shortName}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 1: Điểm chuẩn 3 năm */}
              <div className="space-y-1.5 pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase text-slate-500">
                  1. Điểm chuẩn 3 năm (2023 - 2024 - 2025):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-2xs text-slate-400">Điểm TB qua các năm</span>
                  {comparedUniversities.map((uni) => (
                    <div key={uni.id} className="bg-slate-50 p-2 rounded-xl text-center space-y-0.5">
                      <div className="font-bold text-indigo-600 font-mono text-xs">
                        2025: {uni.benchmarkAvg2025}
                      </div>
                      <div className="text-3xs text-slate-500 font-mono">
                        2024: {uni.benchmarkAvg2024} | 2023: {uni.benchmarkAvg2023}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Học phí */}
              <div className="space-y-1.5 pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase text-slate-500">
                  2. Mức học phí dự kiến:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-2xs text-slate-400">Học phí / năm</span>
                  {comparedUniversities.map((uni) => (
                    <div key={uni.id} className="bg-slate-50 p-2 rounded-xl text-center font-bold text-slate-800 text-2xs">
                      {uni.tuitionRange}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3: Tỷ lệ việc làm */}
              <div className="space-y-1.5 pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase text-slate-500">
                  3. Tỷ lệ có việc làm sau tốt nghiệp:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-2xs text-slate-400">Tỷ lệ có việc</span>
                  {comparedUniversities.map((uni) => (
                    <div key={uni.id} className="bg-emerald-50 text-emerald-800 p-2 rounded-xl text-center font-bold text-xs font-mono">
                      {uni.employmentRate}%
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 4: Loại hình & Khu vực */}
              <div className="space-y-1.5 pb-3 border-b border-slate-100">
                <span className="text-2xs font-bold uppercase text-slate-500">
                  4. Loại hình & Tỉnh thành:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-2xs text-slate-400">Vị trí địa lý</span>
                  {comparedUniversities.map((uni) => (
                    <div key={uni.id} className="bg-slate-50 p-2 rounded-xl text-center text-3xs text-slate-700">
                      {uni.type} · Miền {uni.region} ({uni.province})
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Đóng so sánh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
