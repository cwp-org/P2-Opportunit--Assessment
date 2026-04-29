import {
  operations,
  type ScreeningAnswer,
  type ImportanceAnswer,
} from "../data/operations";

export interface ScreeningData {
  [operationId: string]: {
    control: ScreeningAnswer;
    importance: ImportanceAnswer;
  };
}

interface ScreeningProps {
  data: ScreeningData;
  onChange: (data: ScreeningData) => void;
  onNext: () => void;
  onBack: () => void;
}

const isNoControl = (v: ScreeningAnswer) => (v as string) === "No";

export default function Screening({
  data,
  onChange,
  onNext,
  onBack,
}: ScreeningProps) {
  const updateControl = (opId: string, value: ScreeningAnswer) => {
    const entry = data[opId] ?? { control: null, importance: null };
    if (isNoControl(value)) {
      onChange({ ...data, [opId]: { control: value, importance: "Low" } });
    } else if (isNoControl(entry.control)) {
      // Clear auto-set importance when switching away from No
      onChange({ ...data, [opId]: { control: value, importance: null } });
    } else {
      onChange({ ...data, [opId]: { ...entry, control: value } });
    }
  };

  const updateImportance = (opId: string, value: ImportanceAnswer) => {
    onChange({
      ...data,
      [opId]: { ...data[opId], importance: value },
    });
  };

  const getPriorityStatus = (opId: string) => {
    const entry = data[opId];
    if (!entry?.control) return "incomplete";
    if (isNoControl(entry.control)) return "low";
    if (!entry.importance) return "incomplete";
    if (
      entry.control === "Yes" &&
      (entry.importance === "High" || entry.importance === "Medium")
    ) {
      return "priority";
    }
    return "low";
  };

  // An operation is "answered" if: control=No (auto-completes), or control is set AND importance is set
  const isAnswered = (opId: string) => {
    const entry = data[opId];
    if (!entry?.control) return false;
    if (isNoControl(entry.control)) return true;
    return !!entry.importance;
  };

  const allAnswered = operations.every((op) => isAnswered(op.id));
  const hasAnyPriority = operations.some(
    (op) => getPriorityStatus(op.id) === "priority"
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-epa-blue-dark mb-2">
          Screen Operations
        </h2>
        <p className="text-epa-gray">
          Review the operations below to identify which ones are relevant to
          your community. If your government does not have control over an
          operation, it will automatically be ranked as low priority. For
          operations you do control, rate their importance as a pollution source.
        </p>
      </div>

      <div className="space-y-4">
        {operations.map((op) => {
          const status = getPriorityStatus(op.id);
          const controlVal = data[op.id]?.control ?? null;
          const isAutoLowPriority = isNoControl(controlVal);

          return (
            <div
              key={op.id}
              className={`border rounded-lg overflow-hidden transition-colors ${
                status === "priority"
                  ? "border-epa-green bg-green-50/40"
                  : status === "low"
                    ? "border-epa-gray-lighter bg-gray-50/40"
                    : "border-epa-gray-lighter"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-epa-blue-dark">
                      {op.name}
                    </h3>
                    <p className="text-sm text-epa-gray mt-1">
                      {op.description}
                    </p>
                    <p className="text-xs text-epa-gray-light mt-1 italic">
                      <strong>Associated pollutants:</strong> {op.pollutants}
                    </p>
                  </div>
                  {status === "priority" && (
                    <span className="bg-epa-green text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      Priority
                    </span>
                  )}
                  {status === "low" && (
                    <span className="bg-epa-gray-light text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      Low Priority
                    </span>
                  )}
                </div>

                <details className="text-sm text-epa-gray mb-4">
                  <summary className="cursor-pointer text-epa-blue hover:text-epa-blue-dark font-medium">
                    Opportunities for Pollution Prevention
                  </summary>
                  <p className="mt-2 pl-4 border-l-2 border-epa-gray-lighter">
                    {op.opportunities}
                  </p>
                </details>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-epa-gray mb-1">
                      1. Does your government have control over this operation?
                    </label>
                    <select
                      value={controlVal ?? ""}
                      onChange={(e) =>
                        updateControl(
                          op.id,
                          (e.target.value as ScreeningAnswer) || null
                        )
                      }
                      className="w-full border border-epa-gray-lighter rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-epa-blue focus:border-transparent"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="N/A">N/A</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        isAutoLowPriority
                          ? "text-epa-gray-light"
                          : "text-epa-gray"
                      }`}
                    >
                      2. Rate the importance as a pollution source
                    </label>
                    {isAutoLowPriority ? (
                      <div className="w-full border border-epa-gray-lighter rounded-md px-3 py-2 text-sm bg-gray-50 text-epa-gray-light italic">
                        Auto-ranked as Low Priority (no control)
                      </div>
                    ) : (
                      <select
                        value={data[op.id]?.importance ?? ""}
                        onChange={(e) =>
                          updateImportance(
                            op.id,
                            (e.target.value as ImportanceAnswer) || null
                          )
                        }
                        disabled={!controlVal || isNoControl(controlVal)}
                        className="w-full border border-epa-gray-lighter rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-epa-blue focus:border-transparent disabled:bg-gray-50 disabled:text-epa-gray-light"
                      >
                        <option value="">Select...</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allAnswered && !hasAnyPriority && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          No operations were identified as high priority. Consider adjusting your
          responses if this doesn't reflect your situation, or proceed to view
          any general recommendations.
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
          disabled={!allAnswered}
          className="bg-epa-blue hover:bg-epa-blue-dark disabled:bg-epa-gray-light text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          Continue to Assessment &rarr;
        </button>
      </div>
    </div>
  );
}
