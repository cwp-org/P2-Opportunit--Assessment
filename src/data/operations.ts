export type Pollutant =
  | "nutrients"
  | "sediment"
  | "pesticide"
  | "trash"
  | "oil_grease_fuel"
  | "chloride"
  | "solvent";

export type Benefit = "saves_money" | "reduces_ghg" | "conserves_water";

export const POLLUTANT_LABELS: Record<Pollutant, string> = {
  nutrients: "Nutrient Pollution",
  sediment: "Sediment Pollution",
  pesticide: "Pesticide Pollution",
  trash: "Trash Pollution",
  oil_grease_fuel: "Oil/Grease/Fuel Pollution",
  chloride: "Chloride Pollution",
  solvent: "Solvent Pollution",
};

export const BENEFIT_LABELS: Record<Benefit, string> = {
  saves_money: "Saves Money",
  reduces_ghg: "Reduces Greenhouse Gas Emissions",
  conserves_water: "Conserves Water",
};

export type ScreeningAnswer = "Yes" | "No" | "N/A" | "Unknown" | null;
export type ImportanceAnswer = "High" | "Medium" | "Low" | null;
export type QuestionAnswer = "Yes" | "No" | "N/A" | "Unknown" | null;

export interface AssessmentQuestion {
  id: string;
  question: string;
  action: string;
  pollutants: Pollutant[];
  benefits: Benefit[];
  isSubQuestion?: boolean;
  parentContext?: string;
}

export interface Operation {
  id: string;
  name: string;
  description: string;
  opportunities: string;
  questions: AssessmentQuestion[];
}

export const operations: Operation[] = [
  {
    id: "parks",
    name: "Parks & Open Space Management",
    description:
      "The management and care of trees, grass, and other vegetation at public parks, golf courses, conservation areas, community open space, and other publicly-owned properties. Specifically, this includes planting, mowing, trimming, fertilizer/pesticide application, organic debris management, irrigation, and waste management.",
    opportunities:
      "Transitioning to native landscapes reduces runoff and requires less fertilizer/pesticides/water, while low-maintenance lawn care practices also reduce organic waste and the need for chemical applications/irrigation. Transitioning to electric maintenance equipment reduces oil and fuel pollution from spills.",
    questions: [
      {
        id: "parks-1",
        question:
          "Have on-site investigations been conducted on public properties to identify locations for tree planting/native landscaping?",
        action:
          "Conduct on-site investigations on public properties to identify locations for tree planting/native landscaping",
        pollutants: ["nutrients", "sediment"],
        benefits: [],
      },
      {
        id: "parks-2",
        question:
          "Has your community developed an integrated pest management plan that will help ensure that pesticides are used only as a last resort?",
        action: "Consider developing an integrated pest management plan",
        pollutants: ["pesticide"],
        benefits: [],
      },
      {
        id: "parks-3",
        question:
          "Are there procedures in place to help ensure that herbicides, pesticides, and fertilizers are properly used on public properties?",
        action:
          "Put procedures in place to help ensure that herbicides, pesticides, and fertilizers are properly used on public properties",
        pollutants: ["nutrients", "pesticide"],
        benefits: [],
      },
      {
        id: "parks-4",
        question:
          "Does your community use native and naturalized landscaping guidance and plant lists when working on public properties?",
        action:
          "Use native and naturalized landscaping guidance and plant lists when working on public properties",
        pollutants: ["nutrients", "sediment"],
        benefits: ["saves_money", "conserves_water"],
      },
      {
        id: "parks-5",
        question:
          "Are irrigation systems carefully designed to help conserve potable water and provide only the water that plants need to survive?",
        action:
          "Design irrigation systems carefully to help conserve potable water and provide only the water that plants need to survive",
        pollutants: [],
        benefits: ["saves_money", "conserves_water"],
      },
      {
        id: "parks-6",
        question:
          "Does your community provide regular stormwater pollution prevention trainings to employees and contractors involved with park and landscape maintenance activities?",
        action:
          "Provide regular stormwater pollution prevention trainings to employees and contractors involved with park and landscape maintenance activities",
        pollutants: [],
        benefits: [],
      },
      {
        id: "parks-7",
        question: "Does your community have a tree canopy goal?",
        action: "Establish a tree canopy goal for your community",
        pollutants: ["nutrients", "sediment"],
        benefits: [],
      },
      {
        id: "parks-8",
        question:
          "Does your community conduct soil tests at public properties to calibrate fertilizer needs?",
        action:
          "Conduct soil tests at public properties to calibrate fertilizer needs",
        pollutants: ["nutrients"],
        benefits: ["saves_money"],
      },
      {
        id: "parks-9",
        question:
          "Are weeds controlled by mechanical efforts (hand pulling or hoeing) with herbicide as a last resort?",
        action:
          "Control weeds by mechanical efforts (hand pulling or hoeing) with herbicide as a last resort",
        pollutants: ["pesticide"],
        benefits: [],
      },
      {
        id: "parks-10",
        question:
          "Does your community use WaterSense irrigation fixtures on public properties?",
        action: "Use WaterSense irrigation fixtures on public properties",
        pollutants: [],
        benefits: ["conserves_water"],
      },
      {
        id: "parks-11",
        question:
          "Does your community have an irrigation plan for public properties that includes water conservation as a goal?",
        action:
          "Develop an irrigation plan for public properties that includes water conservation as a goal",
        pollutants: [],
        benefits: ["conserves_water"],
      },
      {
        id: "parks-12",
        question:
          "Does your community have procedures in place to replace gas powered landscape equipment with battery powered?",
        action:
          "Put procedures in place to replace gas powered landscape equipment with battery powered",
        pollutants: ["oil_grease_fuel"],
        benefits: ["reduces_ghg"],
      },
      {
        id: "parks-13",
        question:
          "Has your community passed laws on the use of gas powered landscape equipment?",
        action:
          "Consider passing laws on the use of gas powered landscape equipment",
        pollutants: ["oil_grease_fuel"],
        benefits: ["reduces_ghg"],
      },
      {
        id: "parks-14",
        question:
          "Does your community offer free soil testing services to residents to help them determine fertilizer and other lawn care needs?",
        action:
          "Offer free soil testing services to residents to help them determine fertilizer and other lawn care needs",
        pollutants: ["nutrients"],
        benefits: [],
      },
      {
        id: "parks-15",
        question:
          "Does your community encourage tree planting and native landscaping through outreach and incentives (e.g. coupons at local nursery)?",
        action:
          "Encourage tree planting and native landscaping through outreach and incentives (e.g. coupons at local nursery)",
        pollutants: ["nutrients", "sediment"],
        benefits: [],
      },
      {
        id: "parks-16",
        question:
          "Has your community installed hydration refill stations in public properties?",
        action: "Install hydration refill stations in public properties",
        pollutants: ["trash"],
        benefits: [],
      },
      {
        id: "parks-17",
        question:
          'Does your community have outreach programs that encourage homeowners to minimize the production of organic yard debris? (e.g., use leaves as mulch, set mower blades higher, "let it lie")',
        action:
          'Develop outreach programs that encourage homeowners to minimize the production of organic yard debris (e.g., use leaves as mulch, set mower blades higher, "let it lie")',
        pollutants: ["nutrients"],
        benefits: [],
      },
      {
        id: "parks-18",
        question:
          "Does your community have a program or plan to address heat island mitigation?",
        action:
          "Develop a program or plan to address heat island mitigation",
        pollutants: ["nutrients", "sediment"],
        benefits: [],
      },
      {
        id: "parks-19",
        question:
          "Does your community have public unpaved trails or roads (i.e., dirt, gravel, native rock, or other non-durable surfacing)?",
        action:
          "Assess and inventory public unpaved trails or roads",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "parks-20",
        question:
          "Does your community have an inventory of public and private unpaved trails and roads (i.e., dirt, gravel, native rock, or other non-durable surfacing)?",
        action:
          "Create an inventory of public and private unpaved trails and roads",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "parks-21",
        question:
          "Does your community know the general condition of those roads?",
        action:
          "Assess the general condition of unpaved roads in your community",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "parks-22",
        question:
          "Does your community have a maintenance program that prioritizes road improvements within the annual budget?",
        action:
          "Develop a maintenance program that prioritizes road improvements within the annual budget",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "parks-23",
        question:
          "Does permitting and enforcement of new roads in your community result in substantial compliance with unpaved road standards?",
        action:
          "Strengthen permitting and enforcement to ensure compliance with unpaved road standards",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "parks-24",
        question:
          "Is your community bringing existing roads into compliance with unpaved road standards?",
        action:
          "Work toward bringing existing roads into compliance with unpaved road standards",
        pollutants: ["sediment"],
        benefits: [],
      },
    ],
  },
  {
    id: "winter",
    name: "Winter Road Maintenance",
    description:
      "Planning and deployment of ice prevention and deicing operations across public transportation infrastructure to ensure safe travel in winter conditions. These activities impact salt storage facilities, roads, parking lots, bridges, sidewalks, and other public transit spaces.",
    opportunities:
      "Process changes, equipment investments and calibration, road salt alternatives, and training on best practices can all help to minimize the amount of chloride entering waterways while still meeting public safety needs.",
    questions: [
      {
        id: "winter-1",
        question:
          "Does your community apply a direct liquid application such as a brine mixture on roadways before a known storm event?",
        action:
          "Apply a direct liquid application such as a brine mixture on roadways before a known storm event",
        pollutants: ["chloride"],
        benefits: ["saves_money"],
      },
      {
        id: "winter-2",
        question:
          "Does your community calibrate road salt application equipment to maintain a consistent application rate?",
        action:
          "Calibrate road salt application equipment to maintain a consistent application rate",
        pollutants: ["chloride"],
        benefits: ["saves_money"],
      },
      {
        id: "winter-3",
        question:
          "Does your community provide salt application training for plow operators?",
        action: "Provide salt application training for plow operators",
        pollutants: ["chloride"],
        benefits: ["saves_money"],
      },
      {
        id: "winter-4",
        question:
          "Does your community store salt under a covered structure?",
        action: "Store salt under a covered structure",
        pollutants: ["chloride"],
        benefits: [],
      },
    ],
  },
  {
    id: "construction",
    name: "Construction & Maintenance",
    description:
      "Planning, design, construction, maintenance, and repair of public infrastructure projects (e.g., water/wastewater/stormwater, transportation, energy, telecommunications, restoration projects, and public facilities).",
    opportunities:
      "Minimizing site disturbance and conducting regular inspections and maintenance helps prevent erosion of sediment, while substituting materials and processes reduces stormwater pollution potential (with less toxic alternatives).",
    questions: [
      {
        id: "construction-1",
        question:
          "Does your community encourage outdoor maintenance during dry weather to limit spills and leaks from being washed away by rain water?",
        action:
          "Encourage outdoor maintenance during dry weather to limit spills and leaks from being washed away by rain water",
        pollutants: ["oil_grease_fuel", "solvent"],
        benefits: [],
      },
      {
        id: "construction-2",
        question:
          "Does your community's local Erosion and Sediment Control ordinance require minimized site clearing?",
        action:
          "Update your Erosion and Sediment Control ordinance to require minimized site clearing",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "construction-3",
        question:
          "Does your community have a local erosion and sediment control ordinance that includes the following?",
        action:
          "Develop or strengthen a local erosion and sediment control ordinance",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "construction-3a",
        question: "Minimize clearing",
        action: "Include minimize clearing requirements in erosion and sediment control ordinance",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "construction-3b",
        question: "Rapid soil stabilization",
        action: "Include rapid soil stabilization requirements in erosion and sediment control ordinance",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "construction-3c",
        question: "Assess erosion and sediment control practices after storms",
        action: "Include post-storm assessment requirements in erosion and sediment control ordinance",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "construction-4",
        question: "Does your community use solvents in construction and maintenance?",
        action:
          "Evaluate solvent use in construction and maintenance operations",
        pollutants: ["solvent"],
        benefits: [],
      },
      {
        id: "construction-4a",
        question:
          "If yes, has your community identified replacement with less toxic materials?",
        action:
          "Identify replacement of solvents with less toxic materials in construction and maintenance",
        pollutants: ["solvent"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Solvent use in construction",
      },
      {
        id: "construction-4b",
        question:
          "If yes, has your community identified alternative processes to use less solvents?",
        action:
          "Identify alternative processes to use less solvents in construction and maintenance",
        pollutants: ["solvent"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Solvent use in construction",
      },
    ],
  },
  {
    id: "vehicle",
    name: "Vehicle & Fleet Management",
    description:
      "Powering, maintaining, cleaning, and storing publicly-owned fleets, such as buses, street sweepers, construction equipment, police cars, fire trucks, municipal vehicles, and school buses.",
    opportunities:
      "Conducting regular vehicle inspections minimizes spills and leaks, while substituting materials and processes (e.g., steam clean parts instead of using solvents) reduces stormwater pollution potential. Converting fleets from gasoline-powered to electric also reduces oil and fuel pollution from spills.",
    questions: [
      {
        id: "vehicle-1",
        question:
          "Does your community have procedures in place to replace gas powered vehicles with electric vehicles?",
        action:
          "Develop procedures to replace gas powered vehicles with electric vehicles",
        pollutants: ["oil_grease_fuel"],
        benefits: ["reduces_ghg", "saves_money"],
      },
      {
        id: "vehicle-2",
        question:
          "Does your community have procedures in place to regularly inspect and maintain fleet vehicles to minimize leaking contaminants?",
        action:
          "Develop procedures to regularly inspect and maintain fleet vehicles to minimize leaking contaminants",
        pollutants: ["oil_grease_fuel"],
        benefits: [],
      },
      {
        id: "vehicle-3",
        question:
          "Does your community use solvents in vehicle and fleet operations?",
        action:
          "Evaluate solvent use in vehicle and fleet operations",
        pollutants: ["solvent"],
        benefits: [],
      },
      {
        id: "vehicle-3a",
        question:
          "If yes, has your community identified replacement with less toxic materials?",
        action:
          "Identify replacement of solvents with less toxic materials in vehicle and fleet operations",
        pollutants: ["solvent"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Solvent use in vehicle/fleet operations",
      },
      {
        id: "vehicle-3b",
        question:
          "If yes, has your community identified alternative processes to use less solvents?",
        action:
          "Identify alternative processes to use less solvents in vehicle and fleet operations",
        pollutants: ["solvent"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Solvent use in vehicle/fleet operations",
      },
    ],
  },
  {
    id: "facility",
    name: "Outdoor Facility Management",
    description:
      "Operating and maintaining outdoor hardscape portions of publicly-owned facilities, such as municipal buildings, public works yards, and public swimming pools.",
    opportunities:
      "Using less toxic chemical alternatives and dry cleaning methods for washing buildings, pavement, and swimming pools reduces stormwater pollution potential. Inventorying stored products can help to minimize overpurchase and overuse of chemicals, further reducing pollution potential.",
    questions: [
      {
        id: "facility-1",
        question:
          "Does your community maintain an inventory of materials stored at each facility?",
        action:
          "Maintain an inventory of materials stored at each facility",
        pollutants: ["solvent", "oil_grease_fuel"],
        benefits: ["saves_money"],
      },
      {
        id: "facility-2",
        question:
          "Does your community have an ordinance that requires dechlorination of pool water and draining to a landscaped area at the end of the season?",
        action:
          "Develop an ordinance that requires dechlorination of pool water and draining to a landscaped area at the end of the season",
        pollutants: ["chloride"],
        benefits: [],
      },
      {
        id: "facility-3",
        question:
          "Does your community use solvents in facility management?",
        action: "Evaluate solvent use in facility management",
        pollutants: ["solvent"],
        benefits: [],
      },
      {
        id: "facility-3a",
        question:
          "If yes, has your community identified replacement with less toxic materials?",
        action:
          "Identify replacement of solvents with less toxic materials in facility management",
        pollutants: ["solvent"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Solvent use in facility management",
      },
      {
        id: "facility-3b",
        question:
          "If yes, has your community identified alternative processes to use less solvents?",
        action:
          "Identify alternative processes to use less solvents in facility management",
        pollutants: ["solvent"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Solvent use in facility management",
      },
      {
        id: "facility-4",
        question:
          "Does your community have procedures in place to use dry materials instead of liquids to cleanup spills (i.e., absorbent materials, brooms or shovels)?",
        action:
          "Develop procedures to use dry materials instead of liquids to cleanup spills (i.e., absorbent materials, brooms or shovels)",
        pollutants: ["oil_grease_fuel", "solvent"],
        benefits: [],
      },
    ],
  },
  {
    id: "policies",
    name: "Policies & Regulations",
    description:
      "Development, adoption, and implementation of policies and regulations by municipal and territorial agencies or Tribal nations. Also includes use of existing regulations to encourage or enforce pollutant prevention initiatives.",
    opportunities:
      "Include bans or fees on specific pollution-generating products, green purchasing policies, and using existing regulations to encourage pollution prevention.",
    questions: [
      {
        id: "policies-1",
        question:
          "Does your community have a ban on single-use consumer products?",
        action: "Consider a ban on single-use consumer products",
        pollutants: ["trash"],
        benefits: [],
      },
      {
        id: "policies-2",
        question:
          "Does your community have a ban on single-use plastic bags?",
        action: "Consider a ban on single-use plastic bags",
        pollutants: ["trash"],
        benefits: [],
      },
      {
        id: "policies-3",
        question:
          "Does your community have a ban on Expanded Polystyrene (EPS) products?",
        action: "Consider a ban on Expanded Polystyrene (EPS) products",
        pollutants: ["trash"],
        benefits: [],
      },
      {
        id: "policies-4",
        question:
          "Does your community have a ban on coal-tar sealants?",
        action: "Consider a ban on coal-tar sealants",
        pollutants: ["oil_grease_fuel"],
        benefits: [],
      },
      {
        id: "policies-5",
        question:
          "Has your community adopted a green purchasing policy or Environmentally Preferable Purchasing Program?",
        action:
          "Adopt a green purchasing policy or Environmentally Preferable Purchasing Program",
        pollutants: ["solvent"],
        benefits: ["saves_money"],
      },
      {
        id: "policies-6",
        question:
          "Does your community assess a fee to provide single use paper or plastic items to a consumer?",
        action:
          "Consider assessing a fee to provide single use paper or plastic items to a consumer",
        pollutants: ["trash"],
        benefits: [],
      },
      {
        id: "policies-7",
        question:
          "Does your community have an emergency response plan as required under the Emergency Planning and Community Right-To-Know Act?",
        action:
          "Develop an emergency response plan, inventory chemicals, and replace with non-toxic alternatives",
        pollutants: ["solvent", "oil_grease_fuel"],
        benefits: [],
      },
      {
        id: "policies-7a",
        question:
          "If yes, does your community have a local ordinance to work with businesses on outreach and compliance?",
        action:
          "Develop a local ordinance to work with businesses on outreach and compliance",
        pollutants: ["solvent", "oil_grease_fuel"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Emergency response plan",
      },
      {
        id: "policies-8",
        question:
          "Does your community have a local erosion and sediment control ordinance? If yes, does it include the following?",
        action:
          "Develop or strengthen a local erosion and sediment control ordinance",
        pollutants: ["sediment"],
        benefits: [],
      },
      {
        id: "policies-8a",
        question: "Minimize clearing",
        action: "Include minimize clearing requirements",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8b",
        question: "Protect waterways and stabilize drainageways",
        action:
          "Include requirements to protect waterways and stabilize drainageways",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8c",
        question: "Phase construction",
        action: "Include phased construction requirements",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8d",
        question: "Rapid soil stabilization",
        action: "Include rapid soil stabilization requirements",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8e",
        question: "Protect steep slopes",
        action: "Include steep slope protection requirements",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8f",
        question: "Perimeter controls",
        action: "Include perimeter control requirements",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8g",
        question: "Employ advanced settling devices",
        action: "Include advanced settling device requirements",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8h",
        question: "Certified contractors implement plan",
        action: "Require certified contractors to implement erosion and sediment control plans",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
      {
        id: "policies-8i",
        question:
          "Assess erosion and sediment control practices after storms",
        action:
          "Include post-storm assessment of erosion and sediment control practices",
        pollutants: ["sediment"],
        benefits: [],
        isSubQuestion: true,
        parentContext: "Erosion and sediment control ordinance",
      },
    ],
  },
];
