export type SymptomCategory =
  | 'toan_than'
  | 'than_kinh'
  | 'ho_hap'
  | 'tieu_hoa'
  | 'tiet_nieu'
  | 'tuan_hoan'
  | 'da_niem_mac'
  | 'can_lam_sang';

export interface Symptom {
  id: string;
  name: string;
  category: SymptomCategory;
  categoryLabel: string;
  description?: string;
  aliases?: string[];
}

export interface UserSymptom {
  symptomId: string;
  cf: number; // 0.1 to 1.0 (Certainty Factor from user observation)
}

export interface MycinRule {
  id: string;
  name: string;
  diseaseId: string;
  premises: string[]; // List of required symptom IDs
  ruleCf: number; // Measure of belief MB - MD, between 0.1 and 1.0
  rationale: string; // Clinical explanation for why premises imply disease
}

export interface DiseaseTreatment {
  antimicrobialRegimen: string[]; // Antibiotics / targeted therapy as in classic MYCIN
  supportiveCare: string[]; // Fluids, antipyretics, ventilation, etc.
  warnings: string[]; // Red flags requiring emergency escalation
}

export interface Disease {
  id: string;
  name: string;
  icdCode?: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  treatment: DiseaseTreatment;
  confirmativeTests: string[];
  isCustom?: boolean;
}

export interface InferenceTrace {
  ruleId: string;
  ruleName: string;
  premiseCf: number;
  ruleContributionCf: number;
  matchedSymptoms: {
    symptom: Symptom;
    userCf: number;
  }[];
  missingSymptoms: Symptom[];
  rationale: string;
  status: 'fully_satisfied' | 'partially_satisfied';
}

export interface DiagnosticResult {
  disease: Disease;
  finalCf: number; // -1 to 1, typically 0 to 1
  percentage: number; // 0 to 100
  confidenceLevel: 'Rất cao (Đặc hiệu)' | 'Khả năng cao' | 'Khả dĩ (Nghi ngờ)' | 'Thấp (Cần theo dõi)';
  rulesTriggered: InferenceTrace[];
  missingDifferentialSymptoms: {
    symptom: Symptom;
    potentialCfGain: number;
  }[];
  explanationSummary: string;
}

export interface PresetCase {
  id: string;
  title: string;
  patientProfile: string;
  symptoms: {
    symptomId: string;
    cf: number;
  }[];
  expectedDiagnosis: string;
}
