interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["Welcome", "Screen Operations", "Assess", "Results"];

export default function Header({ currentStep, totalSteps }: HeaderProps) {
  return (
    <header className="bg-epa-blue text-white">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold m-0">
          Stormwater Pollution Prevention in Government Operations Tool
        </h1>
        <p className="text-sm text-blue-100 mt-1 font-semibold tracking-wide">
          SPPIGOT
        </p>
      </div>
      {currentStep > 0 && (
        <div className="bg-epa-blue-dark">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2">
              {STEP_LABELS.slice(1).map((label, i) => {
                const step = i + 1;
                const isActive = step === currentStep;
                const isComplete = step < currentStep;
                return (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div
                      className={`flex items-center gap-2 text-sm font-medium ${
                        isActive
                          ? "text-white"
                          : isComplete
                            ? "text-blue-200"
                            : "text-blue-300/60"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive
                            ? "bg-white text-epa-blue"
                            : isComplete
                              ? "bg-epa-green text-white"
                              : "bg-blue-300/30 text-blue-200/60"
                        }`}
                      >
                        {isComplete ? "\u2713" : step}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                    {step < totalSteps && (
                      <div
                        className={`flex-1 h-0.5 ${
                          isComplete ? "bg-epa-green" : "bg-blue-300/30"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
