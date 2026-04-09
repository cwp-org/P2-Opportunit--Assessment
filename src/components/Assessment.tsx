import { useState } from "react";
import { operations, type QuestionAnswer } from "../data/operations";
import type { ScreeningData } from "./Screening";

export interface AssessmentData {
  [questionId: string]: QuestionAnswer;
}

interface AssessmentProps {
  screeningData: ScreeningData;
  data: AssessmentData;
  onChange: (data: AssessmentData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Assessment({
  screeningData,
  data,
  onChange,
  onNext,
  onBack,
}: AssessmentProps) {
  const priorityOperations = operations.filter((op) => {
    const entry = screeningData[op.id];
    return (
      entry?.control === "Yes" &&
      (entry?.importance === "High" || entry?.importance === "Medium")
    );
  });

  const [activeTab, setActiveTab] = useState(
    priorityOperations[0]?.id ?? ""
  );

  const updateAnswer = (questionId: string, value: QuestionAnswer) => {
    onChange({ ...data, [questionId]: value });
  };

  const activeOp = operations.find((op) => op.id === activeTab);

  const getCompletionCount = (opId: string) => {
    const op = operations.find((o) => o.id === opId);
    if (!op) return { answered: 0, total: 0 };
    const total = op.questions.length;
    const answered = op.questions.filter((q) => data[q.id] != null).length;
    return { answered, total };
  };

  const allQuestionsAnswered = priorityOperations.every((op) => {
    const { answered, total } = getCompletionCount(op.id);
    return answered === total;
  });

  if (priorityOperations.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="bg-epa-gray-lightest rounded-lg p-8">
          <h2 className="text-2xl font-bold text-epa-blue-dark mb-4">
            No Priority Operations
          </h2>
          <p className="text-epa-gray mb-6">
            Based on your screening responses, no operations were identified as
            high priority for pollution prevention assessment. You can go back to
            adjust your screening answers or proceed to view general
            recommendations.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-6 py-2 text-epa-blue hover:text-epa-blue-dark font-medium transition-colors cursor-pointer"
            >
              &larr; Back to Screening
            </button>
            <button
              onClick={onNext}
              className="bg-epa-blue hover:bg-epa-blue-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
            >
              View Results &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-epa-blue-dark mb-2">
          Assessment Questions
        </h2>
        <p className="text-epa-gray">
          Answer the following questions about your community's current
          pollution prevention practices for each prioritized operation. For
          "No" or "Unknown" answers, recommended actions will be provided in
          your results.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-epa-gray-lighter mb-6 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {priorityOperations.map((op) => {
            const { answered, total } = getCompletionCount(op.id);
            const isComplete = answered === total;
            return (
              <button
                key={op.id}
                onClick={() => setActiveTab(op.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === op.id
                    ? "border-epa-blue text-epa-blue"
                    : "border-transparent text-epa-gray hover:text-epa-blue-dark hover:border-epa-gray-lighter"
                }`}
              >
                {op.name}
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    isComplete
                      ? "bg-epa-green text-white"
                      : "bg-epa-gray-lightest text-epa-gray"
                  }`}
                >
                  {answered}/{total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions for active tab */}
      {activeOp && (
        <div className="space-y-4">
          {activeOp.questions.map((q) => (
            <div
              key={q.id}
              className={`border rounded-lg p-4 transition-colors ${
                data[q.id]
                  ? data[q.id] === "Yes"
                    ? "border-epa-green/30 bg-green-50/30"
                    : data[q.id] === "No" || data[q.id] === "Unknown"
                      ? "border-epa-gold/30 bg-amber-50/30"
                      : "border-epa-gray-lighter bg-gray-50/30"
                  : "border-epa-gray-lighter"
              } ${q.isSubQuestion ? "ml-8" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {q.isSubQuestion && q.parentContext && (
                    <span className="text-xs text-epa-gray-light font-medium uppercase tracking-wide">
                      {q.parentContext}
                    </span>
                  )}
                  <p
                    className={`${q.isSubQuestion ? "text-sm" : "text-base"} text-gray-800 font-medium`}
                  >
                    {q.question}
                  </p>
                  {q.pollutants.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {q.pollutants.map((p) => (
                        <span
                          key={p}
                          className="text-xs bg-blue-100 text-epa-blue px-2 py-0.5 rounded"
                        >
                          {p.replace(/_/g, " ")}
                        </span>
                      ))}
                      {q.benefits.map((b) => (
                        <span
                          key={b}
                          className="text-xs bg-green-100 text-epa-green px-2 py-0.5 rounded"
                        >
                          {b.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <select
                  value={data[q.id] ?? ""}
                  onChange={(e) =>
                    updateAnswer(
                      q.id,
                      (e.target.value as QuestionAnswer) || null
                    )
                  }
                  className="border border-epa-gray-lighter rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-epa-blue focus:border-transparent min-w-[130px]"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="N/A">N/A</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation between tabs */}
      {priorityOperations.length > 1 && activeOp && (
        <div className="flex justify-between mt-6 pt-4 border-t border-epa-gray-lighter">
          {priorityOperations.indexOf(activeOp) > 0 ? (
            <button
              onClick={() => {
                const idx = priorityOperations.indexOf(activeOp);
                setActiveTab(priorityOperations[idx - 1].id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-epa-blue hover:text-epa-blue-dark font-medium cursor-pointer"
            >
              &larr; Previous:{" "}
              {
                priorityOperations[priorityOperations.indexOf(activeOp) - 1]
                  .name
              }
            </button>
          ) : (
            <div />
          )}
          {priorityOperations.indexOf(activeOp) <
          priorityOperations.length - 1 ? (
            <button
              onClick={() => {
                const idx = priorityOperations.indexOf(activeOp);
                setActiveTab(priorityOperations[idx + 1].id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-epa-blue hover:text-epa-blue-dark font-medium cursor-pointer"
            >
              Next:{" "}
              {
                priorityOperations[priorityOperations.indexOf(activeOp) + 1]
                  .name
              }{" "}
              &rarr;
            </button>
          ) : (
            <div />
          )}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 text-epa-blue hover:text-epa-blue-dark font-medium transition-colors cursor-pointer"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!allQuestionsAnswered}
          className="bg-epa-blue hover:bg-epa-blue-dark disabled:bg-epa-gray-light text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          View Results &rarr;
        </button>
      </div>
    </div>
  );
}
