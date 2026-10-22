import { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronRight,
  Download,
  Edit2,
  FileCode,
  FolderPlus,
  HelpCircle,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  Disease,
  MycinRule,
  Symptom,
  SymptomCategory,
} from '../types/mycin';
import { normalizeVietnamese } from '../utils/mycinEngine';

interface KnowledgeManagerProps {
  diseases: Disease[];
  rules: MycinRule[];
  symptoms: Symptom[];
  onSaveDisease: (disease: Disease, newRules: MycinRule[]) => void;
  onDeleteDisease: (diseaseId: string) => void;
  onAddRule: (rule: MycinRule) => void;
  onDeleteRule: (ruleId: string) => void;
  onAddSymptom: (symptom: Symptom) => void;
  onResetDefaults: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export default function KnowledgeManager({
  diseases,
  rules,
  symptoms,
  onSaveDisease,
  onDeleteDisease,
  onAddRule,
  onDeleteRule,
  onAddSymptom,
  onResetDefaults,
  onExportJson,
  onImportJson,
  isModalOpen,
  onCloseModal,
}: KnowledgeManagerProps) {
  const [activeTab, setActiveTab] = useState<'diseases' | 'new_disease' | 'symptoms' | 'rules'>('diseases');
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [selectedDiseaseDetail, setSelectedDiseaseDetail] = useState<Disease | null>(null);

  // New Disease Form State
  const [formName, setFormName] = useState('');
  const [formIcd, setFormIcd] = useState('');
  const [formCategory, setFormCategory] = useState('Bệnh nhiễm trùng');
  const [formSeverity, setFormSeverity] = useState<'critical' | 'high' | 'medium' | 'low'>('high');
  const [formDescription, setFormDescription] = useState('');
  const [formAntimicrobial, setFormAntimicrobial] = useState('');
  const [formSupportive, setFormSupportive] = useState('');
  const [formWarnings, setFormWarnings] = useState('');
  const [formConfirmative, setFormConfirmative] = useState('');

  // Initial Rule for New Disease
  const [formRuleName, setFormRuleName] = useState('Quy tắc lâm sàng khởi phát');
  const [formRulePremises, setFormRulePremises] = useState<string[]>([]);
  const [formRuleCf, setFormRuleCf] = useState(0.85);
  const [formRuleRationale, setFormRuleRationale] = useState('');

  // New Symptom Form State
  const [newSymName, setNewSymName] = useState('');
  const [newSymCategory, setNewSymCategory] = useState<SymptomCategory>('toan_than');
  const [newSymDesc, setNewSymDesc] = useState('');

  // Add rule to existing disease state
  const [ruleModalDisease, setRuleModalDisease] = useState<Disease | null>(null);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRulePremises, setNewRulePremises] = useState<string[]>([]);
  const [newRuleCf, setNewRuleCf] = useState(0.85);
  const [newRuleRationale, setNewRuleRationale] = useState('');

  const filteredDiseases = diseases.filter((d) => {
    if (!diseaseSearch) return true;
    const query = normalizeVietnamese(diseaseSearch);
    return (
      normalizeVietnamese(d.name).includes(query) ||
      normalizeVietnamese(d.category).includes(query) ||
      (d.icdCode && normalizeVietnamese(d.icdCode).includes(query))
    );
  });

  const resetForm = () => {
    setFormName('');
    setFormIcd('');
    setFormCategory('Bệnh nhiễm trùng');
    setFormSeverity('high');
    setFormDescription('');
    setFormAntimicrobial('');
    setFormSupportive('');
    setFormWarnings('');
    setFormConfirmative('');
    setFormRuleName('Quy tắc lâm sàng khởi phát');
    setFormRulePremises([]);
    setFormRuleCf(0.85);
    setFormRuleRationale('');
  };

  const handleCreateDiseaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Vui lòng nhập tên bệnh');
      return;
    }

    if (formRulePremises.length === 0) {
      alert('Vui lòng chọn ít nhất 1 triệu chứng điều kiện cho quy tắc suy diễn của bệnh này');
      return;
    }

    const newDiseaseId = 'd_' + Date.now();

    const antimicrobialList = formAntimicrobial
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const supportiveList = formSupportive
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const warningsList = formWarnings
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const confirmList = formConfirmative
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const newDisease: Disease = {
      id: newDiseaseId,
      name: formName.trim(),
      icdCode: formIcd.trim() || undefined,
      category: formCategory.trim(),
      severity: formSeverity,
      description: formDescription.trim() || `Bệnh lý ${formName.trim()}`,
      treatment: {
        antimicrobialRegimen:
          antimicrobialList.length > 0
            ? antimicrobialList
            : ['Điều trị đặc hiệu theo căn nguyên và kháng sinh đồ'],
        supportiveCare: supportiveList,
        warnings: warningsList,
      },
      confirmativeTests: confirmList,
      isCustom: true,
    };

    const newRule: MycinRule = {
      id: `RULE_${Date.now()}`,
      name: formRuleName.trim() || `Quy tắc chẩn đoán ${formName}`,
      diseaseId: newDiseaseId,
      premises: formRulePremises,
      ruleCf: formRuleCf,
      rationale:
        formRuleRationale.trim() ||
        `Sự kết hợp của các triệu chứng này củng cố chẩn đoán ${formName} với độ tin cậy CF=${formRuleCf}`,
    };

    onSaveDisease(newDisease, [newRule]);
    resetForm();
    setActiveTab('diseases');
    setSelectedDiseaseDetail(newDisease);
    if (isModalOpen) {
      onCloseModal();
    }
  };

  const handleAddNewRuleToExisting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleModalDisease) return;
    if (newRulePremises.length === 0) {
      alert('Vui lòng chọn triệu chứng tiền đề');
      return;
    }

    const rule: MycinRule = {
      id: `RULE_${Date.now()}`,
      name: newRuleName.trim() || `Quy tắc bổ sung cho ${ruleModalDisease.name}`,
      diseaseId: ruleModalDisease.id,
      premises: newRulePremises,
      ruleCf: newRuleCf,
      rationale: newRuleRationale.trim() || 'Lập luận y khoa bổ sung cho bệnh',
    };

    onAddRule(rule);
    setRuleModalDisease(null);
    setNewRuleName('');
    setNewRulePremises([]);
    setNewRuleCf(0.85);
    setNewRuleRationale('');
  };

  const handleCreateSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymName.trim()) return;

    const catLabels: Record<SymptomCategory, string> = {
      toan_than: 'Toàn thân',
      than_kinh: 'Thần kinh',
      ho_hap: 'Hô hấp',
      tieu_hoa: 'Tiêu hóa',
      tiet_nieu: 'Tiết niệu',
      tuan_hoan: 'Tim mạch - Tuần hoàn',
      da_niem_mac: 'Da & Niêm mạc',
      can_lam_sang: 'Xét nghiệm - Cận lâm sàng',
    };

    const newSymptom: Symptom = {
      id: 's_' + Date.now(),
      name: newSymName.trim(),
      category: newSymCategory,
      categoryLabel: catLabels[newSymCategory],
      description: newSymDesc.trim() || undefined,
      aliases: [newSymName.trim().toLowerCase()],
    };

    onAddSymptom(newSymptom);
    setNewSymName('');
    setNewSymDesc('');
  };

  // If used as dedicated full modal
  if (isModalOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center">
                <FolderPlus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Cập nhật bệnh mới vào hệ tri thức MYCIN
                </h3>
                <p className="text-xs text-slate-500">
                  Thêm bệnh học, phác đồ điều trị và thiết lập quy tắc suy diễn IF-THEN kèm hệ số CF
                </p>
              </div>
            </div>
            <button
              onClick={onCloseModal}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {renderDiseaseForm(
              formName,
              setFormName,
              formIcd,
              setFormIcd,
              formCategory,
              setFormCategory,
              formSeverity,
              setFormSeverity,
              formDescription,
              setFormDescription,
              formAntimicrobial,
              setFormAntimicrobial,
              formSupportive,
              setFormSupportive,
              formWarnings,
              setFormWarnings,
              formConfirmative,
              setFormConfirmative,
              formRuleName,
              setFormRuleName,
              formRulePremises,
              setFormRulePremises,
              formRuleCf,
              setFormRuleCf,
              formRuleRationale,
              setFormRuleRationale,
              symptoms,
              handleCreateDiseaseSubmit,
              onCloseModal
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full page view when navigating via nav link
  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Quản trị cơ sở tri thức & Quy tắc suy diễn
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống lưu trữ {diseases.length} bệnh, {rules.length} quy tắc suy diễn, và {symptoms.length} triệu chứng
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Xuất cơ sở tri thức thành tệp JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất JSON</span>
            </button>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Nhập JSON</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    onImportJson(e.target.files[0]);
                  }
                }}
              />
            </label>
            <button
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
              title="Khôi phục lại cơ sở tri thức gốc chuẩn MYCIN"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Khôi phục mặc định</span>
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('diseases')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'diseases'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Danh mục bệnh ({diseases.length})
          </button>
          <button
            onClick={() => setActiveTab('new_disease')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'new_disease'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            + Thêm bệnh mới
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'rules'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tập luật IF-THEN ({rules.length})
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'symptoms'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Từ điển triệu chứng ({symptoms.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Disease list */}
      {activeTab === 'diseases' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={diseaseSearch}
                onChange={(e) => setDiseaseSearch(e.target.value)}
                placeholder="Tìm kiếm bệnh theo tên hoặc ICD-10..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {filteredDiseases.map((d) => {
                const diseaseRules = rules.filter((r) => r.diseaseId === d.id);
                const isSelected = selectedDiseaseDetail?.id === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDiseaseDetail(d)}
                    className={`p-3 cursor-pointer transition-colors ${
                      isSelected ? 'bg-cyan-50/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{d.name}</span>
                          {d.isCustom && (
                            <span className="text-2xs bg-amber-100 text-amber-800 px-1 rounded">
                              Tự thêm
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">
                          {d.category} · {diseaseRules.length} luật suy diễn
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disease Detail View */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            {selectedDiseaseDetail ? (
              <div className="space-y-5">
                <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500 font-mono">
                      Mã: {selectedDiseaseDetail.id} {selectedDiseaseDetail.icdCode && `· ICD-10: ${selectedDiseaseDetail.icdCode}`}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedDiseaseDetail.name}
                    </h3>
                    <span className="text-xs text-cyan-700 font-medium">
                      {selectedDiseaseDetail.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setRuleModalDisease(selectedDiseaseDetail);
                        setNewRuleName(`Quy tắc lâm sàng cho ${selectedDiseaseDetail.name}`);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
                    >
                      + Thêm luật
                    </button>
                    {selectedDiseaseDetail.isCustom && (
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa bệnh "${selectedDiseaseDetail.name}"?`)) {
                            onDeleteDisease(selectedDiseaseDetail.id);
                            setSelectedDiseaseDetail(null);
                          }
                        }}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Xóa bệnh này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1">Mô tả bệnh học:</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedDiseaseDetail.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                    Phác đồ kháng sinh & điều trị:
                  </h4>
                  <ul className="space-y-1">
                    {selectedDiseaseDetail.treatment.antimicrobialRegimen.map((m, idx) => (
                      <li key={idx} className="text-xs text-slate-800 flex items-start gap-1.5">
                        <span className="text-cyan-600 font-bold">›</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rules attached to this disease */}
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">
                    Các luật suy diễn áp dụng cho bệnh này:
                  </h4>
                  <div className="space-y-2">
                    {rules
                      .filter((r) => r.diseaseId === selectedDiseaseDetail.id)
                      .map((rule) => (
                        <div
                          key={rule.id}
                          className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900">{rule.name}</span>
                            <span className="font-mono text-cyan-700 font-bold">
                              CF: {rule.ruleCf.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-slate-600">
                            <span className="font-semibold">NẾU: </span>
                            {rule.premises
                              .map((pId) => symptoms.find((s) => s.id === pId)?.name || pId)
                              .join(' VÀ ')}
                          </p>
                          <p className="text-2xs text-slate-500 italic">{rule.rationale}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">Chọn một bệnh ở danh sách bên trái để xem chi tiết và quy tắc suy diễn</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Create New Disease */}
      {activeTab === 'new_disease' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs max-w-3xl mx-auto">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Biểu mẫu thêm bệnh mới và thiết lập luật MYCIN
            </h3>
            <p className="text-xs text-slate-500">
              Nhập thông tin bệnh học, phác đồ điều trị và quy tắc kết hợp triệu chứng (Premises) với hệ số tin cậy
            </p>
          </div>

          {renderDiseaseForm(
            formName,
            setFormName,
            formIcd,
            setFormIcd,
            formCategory,
            setFormCategory,
            formSeverity,
            setFormSeverity,
            formDescription,
            setFormDescription,
            formAntimicrobial,
            setFormAntimicrobial,
            formSupportive,
            setFormSupportive,
            formWarnings,
            setFormWarnings,
            formConfirmative,
            setFormConfirmative,
            formRuleName,
            setFormRuleName,
            formRulePremises,
            setFormRulePremises,
            formRuleCf,
            setFormRuleCf,
            formRuleRationale,
            setFormRuleRationale,
            symptoms,
            handleCreateDiseaseSubmit
          )}
        </div>
      )}

      {/* Tab 3: Rules Base Table */}
      {activeTab === 'rules' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Tất cả các quy tắc suy diễn IF-THEN trong hệ thống ({rules.length})
            </h3>
            <span className="text-xs text-slate-500">Mô hình suy luận tiến & lùi MYCIN</span>
          </div>

          <div className="divide-y divide-slate-100">
            {rules.map((rule) => {
              const targetDisease = diseases.find((d) => d.id === rule.diseaseId);
              return (
                <div key={rule.id} className="py-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-700">{rule.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-slate-900">{rule.name}</span>
                    </div>
                    <span className="font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      CF: {rule.ruleCf.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                    <div>
                      <span className="font-semibold text-slate-700">NẾU (IF): </span>
                      {rule.premises.map((pId, idx) => {
                        const sym = symptoms.find((s) => s.id === pId);
                        return (
                          <span key={pId}>
                            <span className="text-slate-900 font-medium">
                              {sym ? sym.name : pId}
                            </span>
                            {idx < rule.premises.length - 1 ? ' VÀ ' : ''}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-700">THÌ KẾT LUẬN (THEN): </span>
                      <span className="text-emerald-900 font-bold">
                        {targetDisease ? targetDisease.name : rule.diseaseId}
                      </span>
                    </div>
                    <p className="text-2xs text-slate-500 italic pt-0.5">{rule.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Symptoms dictionary */}
      {activeTab === 'symptoms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Thêm triệu chứng mới vào từ điển</h3>
            <form onSubmit={handleCreateSymptomSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên triệu chứng lâm sàng:
                </label>
                <input
                  type="text"
                  required
                  value={newSymName}
                  onChange={(e) => setNewSymName(e.target.value)}
                  placeholder="Ví dụ: Đau tức vùng hạ sườn phải..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nhóm cơ quan:
                </label>
                <select
                  value={newSymCategory}
                  onChange={(e) => setNewSymCategory(e.target.value as SymptomCategory)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="toan_than">Toàn thân</option>
                  <option value="than_kinh">Thần kinh</option>
                  <option value="ho_hap">Hô hấp</option>
                  <option value="tieu_hoa">Tiêu hóa</option>
                  <option value="tiet_nieu">Tiết niệu</option>
                  <option value="tuan_hoan">Tim mạch - Tuần hoàn</option>
                  <option value="da_niem_mac">Da & Niêm mạc</option>
                  <option value="can_lam_sang">Xét nghiệm - Cận lâm sàng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô tả đặc điểm lâm sàng:
                </label>
                <textarea
                  rows={3}
                  value={newSymDesc}
                  onChange={(e) => setNewSymDesc(e.target.value)}
                  placeholder="Đặc điểm khởi phát, tính chất cơn đau, thăm khám..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                + Lưu triệu chứng vào từ điển
              </button>
            </form>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Danh sách từ điển triệu chứng ({symptoms.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[600px] overflow-y-auto">
              {symptoms.map((s) => (
                <div
                  key={s.id}
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{s.name}</span>
                    <span className="text-2xs text-cyan-700">{s.categoryLabel}</span>
                  </div>
                  {s.description && (
                    <p className="text-2xs text-slate-500 line-clamp-1">{s.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding rule to an existing disease */}
      {ruleModalDisease && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Thêm quy tắc mới cho: {ruleModalDisease.name}
              </h3>
              <button
                onClick={() => setRuleModalDisease(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewRuleToExisting} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên quy tắc:
                </label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Triệu chứng tiền đề (Premises - chọn các triệu chứng NẾU):
                </label>
                <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-2 space-y-1 text-xs">
                  {symptoms.map((s) => {
                    const isChecked = newRulePremises.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRulePremises([...newRulePremises, s.id]);
                            } else {
                              setNewRulePremises(newRulePremises.filter((id) => id !== s.id));
                            }
                          }}
                          className="rounded text-cyan-600"
                        />
                        <span>{s.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Hệ số tin cậy của quy tắc (CF quy tắc):</span>
                  <span className="font-mono text-cyan-700 font-bold">{newRuleCf.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={newRuleCf}
                  onChange={(e) => setNewRuleCf(parseFloat(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lập luận y khoa:
                </label>
                <textarea
                  rows={2}
                  value={newRuleRationale}
                  onChange={(e) => setNewRuleRationale(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRuleModalDisease(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg"
                >
                  Lưu quy tắc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Disease Form Helper Function
function renderDiseaseForm(
  formName: string,
  setFormName: (v: string) => void,
  formIcd: string,
  setFormIcd: (v: string) => void,
  formCategory: string,
  setFormCategory: (v: string) => void,
  formSeverity: 'critical' | 'high' | 'medium' | 'low',
  setFormSeverity: (v: 'critical' | 'high' | 'medium' | 'low') => void,
  formDescription: string,
  setFormDescription: (v: string) => void,
  formAntimicrobial: string,
  setFormAntimicrobial: (v: string) => void,
  formSupportive: string,
  setFormSupportive: (v: string) => void,
  formWarnings: string,
  setFormWarnings: (v: string) => void,
  formConfirmative: string,
  setFormConfirmative: (v: string) => void,
  formRuleName: string,
  setFormRuleName: (v: string) => void,
  formRulePremises: string[],
  setFormRulePremises: (v: string[]) => void,
  formRuleCf: number,
  setFormRuleCf: (v: number) => void,
  formRuleRationale: string,
  setFormRuleRationale: (v: string) => void,
  symptoms: Symptom[],
  handleSubmit: (e: React.FormEvent) => void,
  onCancel?: () => void
) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Basic disease info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tên bệnh lý * :
          </label>
          <input
            type="text"
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Ví dụ: Viêm tai giữa cấp mủ..."
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mã ICD-10 (nếu có):
          </label>
          <input
            type="text"
            value={formIcd}
            onChange={(e) => setFormIcd(e.target.value)}
            placeholder="Ví dụ: H66.0"
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Chuyên khoa / Phân loại bệnh:
          </label>
          <input
            type="text"
            value={formCategory}
            onChange={(e) => setFormCategory(e.target.value)}
            placeholder="Ví dụ: Nhiễm trùng tai mũi họng"
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mức độ nghiêm trọng:
          </label>
          <select
            value={formSeverity}
            onChange={(e) =>
              setFormSeverity(e.target.value as 'critical' | 'high' | 'medium' | 'low')
            }
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white"
          >
            <option value="critical">Nguy kịch (Critical - Cần hồi sức ICU)</option>
            <option value="high">Nặng (High - Nhập viện điều trị tích cực)</option>
            <option value="medium">Trung bình (Medium - Điều trị nội/ngoại trú)</option>
            <option value="low">Nhẹ (Low)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Mô tả tóm tắt bệnh học:
        </label>
        <textarea
          rows={2}
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Mô tả nguyên nhân vi sinh, sinh lý bệnh..."
          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500"
        />
      </div>

      {/* Regimen */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase">
          Phác đồ điều trị & Kháng sinh liệu pháp (Mỗi mục một dòng):
        </h4>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Kháng sinh hoặc thuốc đặc hiệu:
          </label>
          <textarea
            rows={3}
            value={formAntimicrobial}
            onChange={(e) => setFormAntimicrobial(e.target.value)}
            placeholder="Amoxicillin/Clavulanate 1g uống mỗi 12 giờ trong 7 ngày&#10;Hoặc Cefuroxime axetil 500mg uống mỗi 12 giờ"
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:ring-1 focus:ring-cyan-500 font-mono"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chăm sóc hỗ trợ:
            </label>
            <textarea
              rows={2}
              value={formSupportive}
              onChange={(e) => setFormSupportive(e.target.value)}
              placeholder="Hạ sốt giảm đau bằng Paracetamol&#10;Vệ sinh tai mũi họng"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dấu hiệu cảnh báo nguy hiểm:
            </label>
            <textarea
              rows={2}
              value={formWarnings}
              onChange={(e) => setFormWarnings(e.target.value)}
              placeholder="Sưng đau sau tai lan vào xương chũm&#10;Liệt mặt ngoại biên"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Xét nghiệm khẳng định (mỗi xét nghiệm 1 dòng):
          </label>
          <input
            type="text"
            value={formConfirmative}
            onChange={(e) => setFormConfirmative(e.target.value)}
            placeholder="Nội soi tai mũi họng, Cấy dịch mủ tai làm kháng sinh đồ..."
            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white"
          />
        </div>
      </div>

      {/* Rule Definition for this new Disease */}
      <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-cyan-950 uppercase">
            Quy tắc suy diễn IF-THEN cho bệnh này (Bắt buộc ít nhất 1 quy tắc):
          </h4>
          <span className="text-2xs font-mono text-cyan-800">Cơ chế MYCIN</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tên quy tắc:
          </label>
          <input
            type="text"
            value={formRuleName}
            onChange={(e) => setFormRuleName(e.target.value)}
            className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Chọn các triệu chứng điều kiện (NẾU có các triệu chứng này đồng thời):
          </label>
          <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-2.5 bg-white space-y-1">
            {symptoms.map((s) => {
              const isChecked = formRulePremises.includes(s.id);
              return (
                <label
                  key={s.id}
                  className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded text-xs cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormRulePremises([...formRulePremises, s.id]);
                      } else {
                        setFormRulePremises(formRulePremises.filter((id) => id !== s.id));
                      }
                    }}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="font-medium text-slate-800">{s.name}</span>
                  <span className="text-2xs text-slate-400">({s.categoryLabel})</span>
                </label>
              );
            })}
          </div>
          <p className="text-2xs text-slate-500 mt-1">
            Đã chọn: {formRulePremises.length} triệu chứng điều kiện
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Hệ số tin cậy quy tắc ($CF_{'{'}rule{'}'}$):</span>
            <span className="font-mono text-cyan-700 font-bold">{formRuleCf.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.3"
            max="1.0"
            step="0.05"
            value={formRuleCf}
            onChange={(e) => setFormRuleCf(parseFloat(e.target.value))}
            className="w-full accent-cyan-600 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Lập luận logic / Ghi chú lâm sàng:
          </label>
          <input
            type="text"
            value={formRuleRationale}
            onChange={(e) => setFormRuleRationale(e.target.value)}
            placeholder="Lý do y khoa các triệu chứng trên chứng minh bệnh..."
            className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Hủy bỏ
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-xs"
        >
          Lưu bệnh và quy tắc vào cơ sở tri thức
        </button>
      </div>
    </form>
  );
}
