import { useState } from "react";
import {
  operations,
  POLLUTANT_LABELS,
  BENEFIT_LABELS,
  type Pollutant,
  type Benefit,
} from "../data/operations";
import type { ScreeningData } from "./Screening";
import type { AssessmentData } from "./Assessment";

interface ResultsProps {
  screeningData: ScreeningData;
  assessmentData: AssessmentData;
  onBack: () => void;
  onRestart: () => void;
}

interface RecommendedAction {
  operationName: string;
  operationId: string;
  questionId: string;
  question: string;
  action: string;
  answer: string;
  pollutants: Pollutant[];
  benefits: Benefit[];
}

export default function Results({
  screeningData,
  assessmentData,
  onBack,
  onRestart,
}: ResultsProps) {
  const [pollutantFilters, setPollutantFilters] = useState<Set<Pollutant>>(
    new Set()
  );
  const [benefitFilters, setBenefitFilters] = useState<Set<Benefit>>(
    new Set()
  );

  const priorityOperations = operations.filter((op) => {
    const entry = screeningData[op.id];
    return (
      entry?.control === "Yes" &&
      (entry?.importance === "High" || entry?.importance === "Medium")
    );
  });

  // Gather all recommended actions (No or Unknown answers)
  const allActions: RecommendedAction[] = [];
  for (const op of priorityOperations) {
    for (const q of op.questions) {
      const answer = assessmentData[q.id];
      if (answer === "No" || answer === "Unknown") {
        allActions.push({
          operationName: op.name,
          operationId: op.id,
          questionId: q.id,
          question: q.question,
          action: q.action,
          answer,
          pollutants: q.pollutants,
          benefits: q.benefits,
        });
      }
    }
  }

  // Also gather unanswered questions as "Unknown" for display purposes
  const unansweredActions: RecommendedAction[] = [];
  for (const op of priorityOperations) {
    for (const q of op.questions) {
      if (assessmentData[q.id] == null) {
        unansweredActions.push({
          operationName: op.name,
          operationId: op.id,
          questionId: q.id,
          question: q.question,
          action: q.action,
          answer: "Not answered",
          pollutants: q.pollutants,
          benefits: q.benefits,
        });
      }
    }
  }

  const combinedActions = [...allActions, ...unansweredActions];

  // Apply filters
  const filteredActions = combinedActions.filter((a) => {
    if (
      pollutantFilters.size > 0 &&
      !a.pollutants.some((p) => pollutantFilters.has(p))
    ) {
      return false;
    }
    if (
      benefitFilters.size > 0 &&
      !a.benefits.some((b) => benefitFilters.has(b))
    ) {
      return false;
    }
    return true;
  });

  const togglePollutant = (p: Pollutant) => {
    const next = new Set(pollutantFilters);
    if (next.has(p)) next.delete(p);
    else next.add(p);
    setPollutantFilters(next);
  };

  const toggleBenefit = (b: Benefit) => {
    const next = new Set(benefitFilters);
    if (next.has(b)) next.delete(b);
    else next.add(b);
    setBenefitFilters(next);
  };

  const clearFilters = () => {
    setPollutantFilters(new Set());
    setBenefitFilters(new Set());
  };

  const groupedActions = filteredActions.reduce(
    (acc, action) => {
      if (!acc[action.operationId]) {
        acc[action.operationId] = { name: action.operationName, actions: [] };
      }
      acc[action.operationId].actions.push(action);
      return acc;
    },
    {} as Record<string, { name: string; actions: RecommendedAction[] }>
  );

  // Summary statistics
  const totalQuestions = priorityOperations.reduce(
    (sum, op) => sum + op.questions.length,
    0
  );
  const answeredCount = Object.values(assessmentData).filter(
    (a) => a != null
  ).length;
  const yesCount = Object.values(assessmentData).filter(
    (a) => a === "Yes"
  ).length;
  const opportunityCount = allActions.length + unansweredActions.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Print styles injected inline for simplicity */}
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { font-size: 12px; }
        }
      `}</style>

      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-epa-blue-dark mb-2">
            Assessment Results
          </h2>
          <p className="text-epa-gray">
            Based on your responses, the following pollution prevention actions
            are recommended. Use the filters to focus on specific pollutants or
            co-benefits.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="no-print flex items-center gap-2 bg-epa-green hover:bg-epa-green-light text-white font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print / Save as PDF
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-epa-gray-lightest rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-epa-blue-dark">
            {priorityOperations.length}
          </div>
          <div className="text-sm text-epa-gray">Priority Operations</div>
        </div>
        <div className="bg-epa-gray-lightest rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-epa-blue-dark">
            {answeredCount}/{totalQuestions}
          </div>
          <div className="text-sm text-epa-gray">Questions Answered</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-epa-green">{yesCount}</div>
          <div className="text-sm text-epa-gray">Already In Place</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {opportunityCount}
          </div>
          <div className="text-sm text-epa-gray">Opportunities Identified</div>
        </div>
      </div>

      {/* Filters */}
      <div className="no-print bg-white border border-epa-gray-lighter rounded-lg p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-epa-blue-dark">
            Filter Recommendations
          </h3>
          {(pollutantFilters.size > 0 || benefitFilters.size > 0) && (
            <button
              onClick={clearFilters}
              className="text-sm text-epa-blue hover:text-epa-blue-dark font-medium cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-epa-gray mb-2">
            Filter by Pollutant
          </h4>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(POLLUTANT_LABELS) as [Pollutant, string][]).map(
              ([key, label]) => {
                const count = combinedActions.filter((a) =>
                  a.pollutants.includes(key)
                ).length;
                if (count === 0) return null;
                return (
                  <button
                    key={key}
                    onClick={() => togglePollutant(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      pollutantFilters.has(key)
                        ? "bg-epa-blue text-white"
                        : "bg-blue-50 text-epa-blue hover:bg-blue-100"
                    }`}
                  >
                    {label}{" "}
                    <span className="opacity-70">({count})</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-epa-gray mb-2">
            Filter by Co-Benefit
          </h4>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(BENEFIT_LABELS) as [Benefit, string][]).map(
              ([key, label]) => {
                const count = combinedActions.filter((a) =>
                  a.benefits.includes(key)
                ).length;
                if (count === 0) return null;
                return (
                  <button
                    key={key}
                    onClick={() => toggleBenefit(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      benefitFilters.has(key)
                        ? "bg-epa-green text-white"
                        : "bg-green-50 text-epa-green hover:bg-green-100"
                    }`}
                  >
                    {label}{" "}
                    <span className="opacity-70">({count})</span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-epa-gray mb-4">
        Showing {filteredActions.length} of {combinedActions.length} recommended
        actions
        {(pollutantFilters.size > 0 || benefitFilters.size > 0) &&
          " (filtered)"}
      </div>

      {/* Grouped recommendations */}
      {filteredActions.length === 0 ? (
        <div className="bg-green-50 border border-epa-green/20 rounded-lg p-8 text-center">
          {combinedActions.length === 0 ? (
            <>
              <div className="text-4xl mb-3">&#127881;</div>
              <h3 className="text-xl font-semibold text-epa-green mb-2">
                Excellent Work!
              </h3>
              <p className="text-epa-gray">
                Your community already has all assessed pollution prevention
                practices in place. Continue maintaining these practices!
              </p>
            </>
          ) : (
            <p className="text-epa-gray">
              No recommendations match your current filters. Try adjusting or
              clearing the filters above.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedActions).map(([opId, group]) => (
            <div
              key={opId}
              className="border border-epa-gray-lighter rounded-lg overflow-hidden"
            >
              <div className="bg-epa-blue-dark text-white px-5 py-3">
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-blue-200">
                  {group.actions.length} recommended action
                  {group.actions.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="divide-y divide-epa-gray-lighter">
                {group.actions.map((action) => (
                  <div key={action.questionId} className="p-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded mt-0.5 shrink-0 ${
                          action.answer === "No"
                            ? "bg-red-100 text-epa-red"
                            : action.answer === "Unknown"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-epa-gray"
                        }`}
                      >
                        {action.answer}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-epa-gray mb-1">
                          {action.question}
                        </p>
                        <p className="font-medium text-gray-800">
                          &#8594; {action.action}
                        </p>
                        {(action.pollutants.length > 0 ||
                          action.benefits.length > 0) && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {action.pollutants.map((p) => (
                              <span
                                key={p}
                                className={`text-xs px-2 py-0.5 rounded ${
                                  pollutantFilters.has(p)
                                    ? "bg-epa-blue text-white"
                                    : "bg-blue-100 text-epa-blue"
                                }`}
                              >
                                {POLLUTANT_LABELS[p]}
                              </span>
                            ))}
                            {action.benefits.map((b) => (
                              <span
                                key={b}
                                className={`text-xs px-2 py-0.5 rounded ${
                                  benefitFilters.has(b)
                                    ? "bg-epa-green text-white"
                                    : "bg-green-100 text-epa-green"
                                }`}
                              >
                                {BENEFIT_LABELS[b]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="no-print flex justify-between mt-8 pt-6 border-t border-epa-gray-lighter">
        <button
          onClick={onBack}
          className="px-6 py-2 text-epa-blue hover:text-epa-blue-dark font-medium transition-colors cursor-pointer"
        >
          &larr; Back
        </button>
        <button
          onClick={onRestart}
          className="bg-epa-gray hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
