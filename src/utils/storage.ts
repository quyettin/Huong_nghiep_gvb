import { DEFAULT_DISEASES, DEFAULT_RULES, DEFAULT_SYMPTOMS } from '../data/defaultKnowledgeBase';
import { Disease, MycinRule, Symptom } from '../types/mycin';

const STORAGE_KEYS = {
  SYMPTOMS: 'mycin_kb_symptoms_v1',
  DISEASES: 'mycin_kb_diseases_v1',
  RULES: 'mycin_kb_rules_v1',
};

export function loadKnowledgeBase(): {
  symptoms: Symptom[];
  diseases: Disease[];
  rules: MycinRule[];
} {
  try {
    const rawSymptoms = localStorage.getItem(STORAGE_KEYS.SYMPTOMS);
    const rawDiseases = localStorage.getItem(STORAGE_KEYS.DISEASES);
    const rawRules = localStorage.getItem(STORAGE_KEYS.RULES);

    const symptoms: Symptom[] = rawSymptoms ? JSON.parse(rawSymptoms) : DEFAULT_SYMPTOMS;
    const diseases: Disease[] = rawDiseases ? JSON.parse(rawDiseases) : DEFAULT_DISEASES;
    const rules: MycinRule[] = rawRules ? JSON.parse(rawRules) : DEFAULT_RULES;

    return { symptoms, diseases, rules };
  } catch (err) {
    console.error('Failed to parse knowledge base from localStorage, falling back to defaults', err);
    return {
      symptoms: DEFAULT_SYMPTOMS,
      diseases: DEFAULT_DISEASES,
      rules: DEFAULT_RULES,
    };
  }
}

export function saveKnowledgeBase(
  symptoms: Symptom[],
  diseases: Disease[],
  rules: MycinRule[]
): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SYMPTOMS, JSON.stringify(symptoms));
    localStorage.setItem(STORAGE_KEYS.DISEASES, JSON.stringify(diseases));
    localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(rules));
  } catch (err) {
    console.error('Failed to save knowledge base to localStorage', err);
  }
}

export function resetKnowledgeBase(): {
  symptoms: Symptom[];
  diseases: Disease[];
  rules: MycinRule[];
} {
  try {
    localStorage.removeItem(STORAGE_KEYS.SYMPTOMS);
    localStorage.removeItem(STORAGE_KEYS.DISEASES);
    localStorage.removeItem(STORAGE_KEYS.RULES);
  } catch (err) {
    console.error('Failed to reset localStorage', err);
  }
  return {
    symptoms: DEFAULT_SYMPTOMS,
    diseases: DEFAULT_DISEASES,
    rules: DEFAULT_RULES,
  };
}

export function exportKnowledgeBaseAsJson(
  symptoms: Symptom[],
  diseases: Disease[],
  rules: MycinRule[]
): string {
  const payload = {
    app: 'MYCIN_EXPERT_SYSTEM',
    exportedAt: new Date().toISOString(),
    version: '1.0',
    data: {
      symptoms,
      diseases,
      rules,
    },
  };
  return JSON.stringify(payload, null, 2);
}
