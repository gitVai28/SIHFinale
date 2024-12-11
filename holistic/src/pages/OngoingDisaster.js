import React from 'react';

const OngoingDisaster = ({ disasterData }) => {
  // If no disaster data is passed, return null
  if (!disasterData) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-red-600 mb-3">
        Ongoing Disaster Details
      </h2>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Type:</span>
          <p className="text-gray-700">{disasterData.type}</p>
        </div>
        <div>
          <span className="font-semibold">Location:</span>
          <p className="text-gray-700">{disasterData.location}</p>
        </div>
        <div>
          <span className="font-semibold">Severity:</span>
          <p className={`
            font-medium 
            ${disasterData.severity === 'Severe' ? 'text-red-600' : 
              disasterData.severity === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}
          `}>
            {disasterData.severity}
          </p>
        </div>
        <div>
          <span className="font-semibold">Summary:</span>
          <p className="text-gray-600 italic">{disasterData.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default OngoingDisaster;