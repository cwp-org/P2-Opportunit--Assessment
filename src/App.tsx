import { useState } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Screening, { type ScreeningData } from "./components/Screening";
import Assessment, { type AssessmentData } from "./components/Assessment";
import Results from "./components/Results";

type Step = "welcome" | "screening" | "assessment" | "results";

const STEP_NUMBER: Record<Step, number> = {
  welcome: 0,
  screening: 1,
  assessment: 2,
  results: 3,
};

function App() {
  const [step, setStep] = useState<Step>("welcome");
  const [screeningData, setScreeningData] = useState<ScreeningData>({});
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});

  const goTo = (next: Step) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setScreeningData({});
    setAssessmentData({});
    goTo("welcome");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentStep={STEP_NUMBER[step]} totalSteps={3} />
      <main>
        {step === "welcome" && <Welcome onStart={() => goTo("screening")} />}
        {step === "screening" && (
          <Screening
            data={screeningData}
            onChange={setScreeningData}
            onNext={() => goTo("assessment")}
            onBack={() => goTo("welcome")}
          />
        )}
        {step === "assessment" && (
          <Assessment
            screeningData={screeningData}
            data={assessmentData}
            onChange={setAssessmentData}
            onNext={() => goTo("results")}
            onBack={() => goTo("screening")}
          />
        )}
        {step === "results" && (
          <Results
            screeningData={screeningData}
            assessmentData={assessmentData}
            onBack={() => goTo("assessment")}
            onRestart={handleRestart}
          />
        )}
      </main>
      <footer className="bg-epa-gray-lightest border-t border-epa-gray-lighter mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-epa-gray">
          P2 Opportunity Assessment Tool &mdash; Stormwater Pollution Prevention
          in Government Operations
        </div>
      </footer>
    </div>
  );
}

export default App;
