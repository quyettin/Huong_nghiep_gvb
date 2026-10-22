import {
  DiagnosticResult,
  Disease,
  InferenceTrace,
  MycinRule,
  Symptom,
  UserSymptom,
} from '../types/mycin';

/**
 * Normalizes Vietnamese string for accent-insensitive and case-insensitive searching
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

/**
 * Standard MYCIN Certainty Factor Combination Formula
 * CF_combine(CF1, CF2) = CF1 + CF2 - CF1 * CF2 (when both >= 0)
 */
export function combineCertaintyFactors(cf1: number, cf2: number): number {
  if (cf1 >= 0 && cf2 >= 0) {
    return cf1 + cf2 * (1 - cf1);
  }
  if (cf1 < 0 && cf2 < 0) {
    return cf1 + cf2 * (1 + cf1);
  }
  const minAbs = Math.min(Math.abs(cf1), Math.abs(cf2));
  if (minAbs === 1) return 0;
  return (cf1 + cf2) / (1 - minAbs);
}

/**
 * Executes MYCIN Inference Engine on current symptoms and knowledge base
 */
export function runMycinInference(
  userSymptoms: UserSymptom[],
  allDiseases: Disease[],
  allRules: MycinRule[],
  allSymptoms: Symptom[]
): DiagnosticResult[] {
  if (!userSymptoms || userSymptoms.length === 0) {
    return [];
  }

  const symptomMap = new Map<string, Symptom>(allSymptoms.map((s) => [s.id, s]));
  const userSymptomMap = new Map<string, number>(
    userSymptoms.map((us) => [us.symptomId, us.cf])
  );

  const results: DiagnosticResult[] = [];

  for (const disease of allDiseases) {
    const diseaseRules = allRules.filter((r) => r.diseaseId === disease.id);
    if (diseaseRules.length === 0) continue;

    const triggeredTraces: InferenceTrace[] = [];
    const missingDifferentialMap = new Map<string, number>();

    let cumulativeCf = 0;

    for (const rule of diseaseRules) {
      const premises = rule.premises;
      const matchedSymptoms: { symptom: Symptom; userCf: number }[] = [];
      const missingSymptoms: Symptom[] = [];
      const userCfsInPremise: number[] = [];

      for (const pId of premises) {
        const sym = symptomMap.get(pId) || {
          id: pId,
          name: pId,
          category: 'toan_than',
          categoryLabel: 'Khác',
        };

        if (userSymptomMap.has(pId)) {
          const uCf = userSymptomMap.get(pId)!;
          matchedSymptoms.push({ symptom: sym, userCf: uCf });
          userCfsInPremise.push(uCf);
        } else {
          missingSymptoms.push(sym);
        }
      }

      // If all premises are met in user's symptom profile
      if (missingSymptoms.length === 0 && userCfsInPremise.length > 0) {
        // MYCIN: CF(Premise) = min(CF(E1), CF(E2)...)
        const premiseCf = Math.min(...userCfsInPremise);

        // CF_rule(H, E) = CF(Premise) * CF(Rule)
        const ruleContribution = premiseCf * rule.ruleCf;

        if (ruleContribution > 0.15) {
          triggeredTraces.push({
            ruleId: rule.id,
            ruleName: rule.name,
            premiseCf,
            ruleContributionCf: ruleContribution,
            matchedSymptoms,
            missingSymptoms: [],
            rationale: rule.rationale,
            status: 'fully_satisfied',
          });

          // Combine with cumulative CF using MYCIN combination rule
          if (cumulativeCf === 0) {
            cumulativeCf = ruleContribution;
          } else {
            cumulativeCf = combineCertaintyFactors(cumulativeCf, ruleContribution);
          }
        }
      } else if (matchedSymptoms.length > 0 && missingSymptoms.length > 0) {
        // Partially matched rule (at least one matched, but some missing)
        // If the matched portion has high confidence, record missing symptoms for clinical guidance
        const matchedCfs = matchedSymptoms.map((m) => m.userCf);
        const partialPremiseCf = Math.min(...matchedCfs);
        const potentialContribution = partialPremiseCf * rule.ruleCf;

        // Record missing symptoms and their potential impact
        for (const missing of missingSymptoms) {
          const currentGain = missingDifferentialMap.get(missing.id) || 0;
          if (potentialContribution > currentGain) {
            missingDifferentialMap.set(missing.id, potentialContribution);
          }
        }

        // If the majority of premises are met (e.g. 2 out of 3 or 1 out of 2) and cumulativeCf is still 0,
        // we provide a partial indicative score so that users who entered only 1-2 symptoms still see relevant diseases
        const matchRatio = matchedSymptoms.length / premises.length;
        if (matchRatio >= 0.5) {
          const partialCf = partialPremiseCf * rule.ruleCf * (matchRatio * 0.7);
          if (triggeredTraces.length === 0 && partialCf > cumulativeCf) {
            cumulativeCf = Math.max(cumulativeCf, partialCf);
          }

          triggeredTraces.push({
            ruleId: rule.id,
            ruleName: rule.name,
            premiseCf: partialPremiseCf,
            ruleContributionCf: potentialContribution,
            matchedSymptoms,
            missingSymptoms,
            rationale: rule.rationale,
            status: 'partially_satisfied',
          });
        }
      }
    }

    if (cumulativeCf > 0.18 || triggeredTraces.length > 0) {
      // Clamp between 0 and 0.999
      const finalCf = Math.min(0.99, Math.max(0, cumulativeCf));
      const percentage = Math.round(finalCf * 1000) / 10;

      let confidenceLevel: 'Rất cao (Đặc hiệu)' | 'Khả năng cao' | 'Khả dĩ (Nghi ngờ)' | 'Thấp (Cần theo dõi)';
      if (percentage >= 80) {
        confidenceLevel = 'Rất cao (Đặc hiệu)';
      } else if (percentage >= 60) {
        confidenceLevel = 'Khả năng cao';
      } else if (percentage >= 40) {
        confidenceLevel = 'Khả dĩ (Nghi ngờ)';
      } else {
        confidenceLevel = 'Thấp (Cần theo dõi)';
      }

      const missingDifferentialSymptoms = Array.from(missingDifferentialMap.entries())
        .map(([symId, potentialCfGain]) => ({
          symptom: symptomMap.get(symId) || {
            id: symId,
            name: symId,
            category: 'toan_than',
            categoryLabel: 'Khác',
          },
          potentialCfGain: Math.round(potentialCfGain * 100) / 100,
        }))
        .filter((item) => !userSymptomMap.has(item.symptom.id))
        .sort((a, b) => b.potentialCfGain - a.potentialCfGain)
        .slice(0, 4);

      // Generate medical explanation summary
      const fullCount = triggeredTraces.filter((t) => t.status === 'fully_satisfied').length;
      const partialCount = triggeredTraces.filter((t) => t.status === 'partially_satisfied').length;
      let explanationSummary = '';

      if (fullCount > 0) {
        explanationSummary = `Kích hoạt thành công ${fullCount} luật suy diễn đầy đủ với độ tin cậy kết hợp đạt ${percentage}%.`;
      } else if (partialCount > 0) {
        explanationSummary = `Phù hợp từng phần với ${partialCount} luật suy diễn. Cần bổ sung xét nghiệm hoặc kiểm tra triệu chứng thiếu để khẳng định.`;
      } else {
        explanationSummary = `Các dấu hiệu lâm sàng hiện tại có mức độ tương thích sơ bộ ${percentage}%.`;
      }

      results.push({
        disease,
        finalCf,
        percentage,
        confidenceLevel,
        rulesTriggered: triggeredTraces,
        missingDifferentialSymptoms,
        explanationSummary,
      });
    }
  }

  // Sort by highest certainty factor first
  results.sort((a, b) => b.finalCf - a.finalCf);
  return results;
}
