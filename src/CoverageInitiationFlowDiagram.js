import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const DiagramBox = ({ x, y, width, height, text, color = '#E2E8F0', onClick }) => (
  <g onClick={onClick} style={{ cursor: 'pointer' }}>
    <rect x={x} y={y} width={width} height={height} fill={color} rx={5} ry={5} />
    <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#1A202C" fontSize="12">
      {text}
    </text>
  </g>
);

const DiagramDiamond = ({ x, y, width, height, text, color = '#FEF3C7', onClick }) => (
  <g onClick={onClick} style={{ cursor: 'pointer' }}>
    <polygon 
      points={`${x},${y + height / 2} ${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height}`} 
      fill={color} 
    />
    <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#1A202C" fontSize="12">
      {text}
    </text>
  </g>
);

const CoverageInitiationFlowDiagram = () => {
  const [activeStep, setActiveStep] = useState(null);

  const handleClick = (step) => {
    setActiveStep(step === activeStep ? null : step);
  };

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 p-4">
      <svg width="1000" height="800" viewBox="0 0 1000 800">
        {/* Start */}
        <DiagramBox x={10} y={10} width={150} height={50} text="Analyst logs in" color="#4ADE80" onClick={() => handleClick('start')} />
        <ArrowRight className="text-gray-500" size={20} style={{ transform: 'translate(165px, 25px)' }} />
        
        {/* Action */}
        <DiagramBox x={200} y={10} width={200} height={50} text="Click 'Initiate New Coverage'" color="#4ADE80" onClick={() => handleClick('action')} />
        <ArrowRight className="text-gray-500" size={20} style={{ transform: 'translate(405px, 25px)' }} />
        
        {/* Select Options */}
        <DiagramDiamond x={440} y={0} width={120} height={70} text="Select Options" onClick={() => handleClick('options')} />
        
        {/* Option branches */}
        <ArrowDown className="text-gray-500" size={20} style={{ transform: 'translate(490px, 75px)' }} />
        <DiagramBox x={420} y={110} width={160} height={40} text="Select Company" color="#93C5FD" onClick={() => handleClick('company')} />
        <ArrowDown className="text-gray-500" size={20} style={{ transform: 'translate(490px, 155px)' }} />
        <DiagramBox x={420} y={190} width={160} height={40} text="Choose Coverage Depth" color="#93C5FD" onClick={() => handleClick('depth')} />
        <ArrowDown className="text-gray-500" size={20} style={{ transform: 'translate(490px, 235px)' }} />
        <DiagramBox x={420} y={270} width={160} height={40} text="Select Output Format" color="#93C5FD" onClick={() => handleClick('format')} />
        
        {/* Analysis Phase */}
        <ArrowDown className="text-gray-500" size={20} style={{ transform: 'translate(490px, 315px)' }} />
        <DiagramBox x={10} y={350} width={980} height={250} text="Analysis Phase" color="#BFDBFE" onClick={() => handleClick('analysis')} />
        
        {/* Analysis sub-steps */}
        <DiagramBox x={30} y={400} width={140} height={40} text="Data Gathering" color="#93C5FD" onClick={() => handleClick('data')} />
        <DiagramBox x={180} y={400} width={140} height={40} text="Industry Analysis" color="#93C5FD" onClick={() => handleClick('industry')} />
        <DiagramBox x={330} y={400} width={140} height={40} text="Company Analysis" color="#93C5FD" onClick={() => handleClick('company-analysis')} />
        <DiagramBox x={480} y={400} width={160} height={40} text="Competitive Positioning" color="#93C5FD" onClick={() => handleClick('competitive')} />
        <DiagramBox x={650} y={400} width={140} height={40} text="Financial Modeling" color="#93C5FD" onClick={() => handleClick('financial')} />
        <DiagramBox x={800} y={400} width={140} height={40} text="Risk Assessment" color="#93C5FD" onClick={() => handleClick('risk')} />
        
        {/* Dashboard Presentation */}
        <ArrowDown className="text-gray-500" size={20} style={{ transform: 'translate(490px, 605px)' }} />
        <DiagramBox x={400} y={640} width={200} height={50} text="Dashboard Presentation" color="#4ADE80" onClick={() => handleClick('dashboard')} />
        
        {/* Review and Refine */}
        <ArrowRight className="text-gray-500" size={20} style={{ transform: 'translate(605px, 655px)' }} />
        <DiagramDiamond x={640} y={630} width={120} height={70} text="Review and Refine" onClick={() => handleClick('review')} />
        
        {/* Generate Report */}
        <ArrowRight className="text-gray-500" size={20} style={{ transform: 'translate(765px, 655px)' }} />
        <DiagramBox x={800} y={640} width={160} height={50} text="Generate Report" color="#93C5FD" onClick={() => handleClick('generate')} />
        
        {/* Legend */}
        <DiagramBox x={10} y={730} width={120} height={30} text="User Action" color="#4ADE80" />
        <DiagramBox x={140} y={730} width={120} height={30} text="AI Process" color="#93C5FD" />
        <DiagramDiamond x={270} y={720} width={100} height={50} text="Decision" />
      </svg>
      
      {activeStep && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2">
            {activeStep.charAt(0).toUpperCase() + activeStep.slice(1)}
          </h3>
          <p>
            {getStepDescription(activeStep)}
          </p>
        </div>
      )}
    </div>
  );
};

const getStepDescription = (step) => {
  const descriptions = {
    start: "The analyst logs into the multi-agent web app to begin the process of initiating coverage on a new company.",
    action: "The analyst clicks on the 'Initiate New Coverage' button to start the coverage initiation process.",
    options: "The analyst is presented with several options to customize the coverage initiation process.",
    company: "The analyst selects the company for which they want to initiate coverage.",
    depth: "The analyst chooses the depth of coverage: comprehensive, standard, or quick.",
    format: "The analyst selects the desired output format: PDF report, PowerPoint presentation, or interactive dashboard.",
    analysis: "The AI agents perform various analyses to gather and process information about the company and its industry.",
    data: "The Data Intelligence Agent gathers relevant data about the company, its competitors, and the industry.",
    industry: "The Industry Analysis Agent analyzes market trends, size, and growth projections.",
    "company-analysis": "The Fundamental Analysis Agent conducts a detailed analysis of the company's business model and financials.",
    competitive: "The Comparative Analysis Agent assesses the company's position relative to its competitors.",
    financial: "The Financial Modeling Agent creates detailed financial projections and valuation models.",
    risk: "The Risk Analysis Agent identifies and assesses various risks associated with the company and its industry.",
    dashboard: "A unified dashboard is presented to the analyst, summarizing key findings and analyses.",
    review: "The analyst reviews the generated content and decides whether to refine the analysis or proceed to report generation.",
    generate: "The system generates the final report in the chosen format, incorporating all analyses and insights."
  };
  return descriptions[step] || "No description available.";
};

export default CoverageInitiationFlowDiagram;
