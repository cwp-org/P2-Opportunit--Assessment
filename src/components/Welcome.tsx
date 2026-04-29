interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-epa-blue-dark mb-2">
          Stormwater Pollution Prevention in Government Operations Tool
        </h2>
        <p className="text-epa-blue font-semibold text-lg mb-4">(SPPIGOT)</p>
        <p className="text-lg text-epa-gray leading-relaxed">
          Use the SPPIGOT to see how your municipality, tribe, or territory's
          stormwater operations address pollution prevention (P2) and identify
          actions for integrating P2 in your community.
        </p>
      </div>

      <div className="bg-epa-gray-lightest rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-epa-blue-dark mb-4">
          How It Works
        </h3>
        <ol className="space-y-3 text-epa-gray">
          <li className="flex gap-3">
            <span className="bg-epa-blue text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </span>
            <span>
              <strong>Screen Operations</strong> &mdash; Review 6 types of
              government operations and identify which ones are relevant to your
              community based on your control and their importance as pollution
              sources.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="bg-epa-blue text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </span>
            <span>
              <strong>Assess</strong> &mdash; Answer questions about your
              community's current pollution prevention practices for each
              prioritized operation.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="bg-epa-blue text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </span>
            <span>
              <strong>Review Results</strong> &mdash; Get a tailored list of
              recommended pollution prevention actions, filterable by pollutant
              type and co-benefits.
            </span>
          </li>
        </ol>
      </div>

      <div className="bg-white border border-epa-gray-lighter rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-epa-blue-dark mb-3">
          Government Operations Covered
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Parks and Landscaping",
            "Winter Road Maintenance",
            "Construction & Maintenance",
            "Vehicle & Fleet Management",
            "Public Facility Management",
            "Procurement & Regulations",
          ].map((op) => (
            <div key={op} className="flex items-center gap-2 text-epa-gray">
              <span className="text-epa-green font-bold">&bull;</span>
              {op}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          className="bg-epa-blue hover:bg-epa-blue-dark text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
