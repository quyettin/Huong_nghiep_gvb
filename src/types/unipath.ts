export type Region = 'Bắc' | 'Trung' | 'Nam';
export type SchoolType = 'Công lập' | 'Tư thục' | 'Quốc tế';

export interface AdmissionMethod {
  id: string;
  name: string;
  description: string;
}

export interface Major {
  id: string;
  name: string;
  code: string;
  combinations: string[]; // e.g. ['A00', 'A01', 'D01']
  benchmark2023: number;
  benchmark2024: number;
  benchmark2025: number;
  tuitionYear: number; // in million VND
  employmentRate: number; // percentage e.g. 96.5
  description: string;
  hollandTraits: ('R' | 'I' | 'A' | 'S' | 'E' | 'C')[];
  salaryRange: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string; // e.g. 'BKA', 'NEU', 'UEH'
  region: Region;
  province: string;
  type: SchoolType;
  benchmarkAvg2025: number;
  benchmarkAvg2024: number;
  benchmarkAvg2023: number;
  minBenchmark2025: number;
  maxBenchmark2025: number;
  tuitionRange: string; // e.g. '28 - 45 tr/năm'
  employmentRate: number; // e.g. 98.2
  logoIcon: string; // emoji or icon key
  color: string;
  badgeBg: string;
  description: string;
  website: string;
  admissionMethods: string[];
  scholarshipInfo: string;
  majors: Major[];
}

export interface HollandQuestion {
  id: number;
  text: string;
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  categoryName: string;
}

export interface HollandScore {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface CareerMatch {
  title: string;
  hollandCode: string;
  matchScore: number;
  salaryAvg: string;
  marketDemand: 'Rất cao' | 'Cao' | 'Ổn định' | 'Mới nổi';
  description: string;
  topSchools: string[];
  recommendedSubjects: string[];
}

export interface NewsItem {
  id: string;
  tag: 'HOT' | 'IELTS' | 'ĐGNL' | 'HỌC PHÍ';
  tagColor: string;
  title: string;
  date: string;
  summary: string;
  linkText?: string;
}

export interface ScoreSubject {
  math: number;
  literature: number;
  english: number;
  physics: number;
  chemistry: number;
  biology: number;
  history: number;
  geography: number;
  civic: number;
  dgnlHcm?: number; // max 1200
  dgnlHn?: number; // max 150
  ieltsBand?: number; // 4.0 - 9.0
}

export interface PredictionResult {
  school: University;
  major: Major;
  userScore: number;
  targetBenchmark: number;
  difference: number;
  status: 'safe' | 'target' | 'risky'; // An toàn, Vừa sức, Rủi ro
  percentage: number;
  advice: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
