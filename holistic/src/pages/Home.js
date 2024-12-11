import React, { useState } from 'react';
import Map from '../components/Map2';
import Radar from '../components/DisasterMonitoringRadar';
import DisasterAlert from './DisasterAlert';
import OngoingDisaster from './OngoingDisaster';

const Home = () => {
  const [ongoingDisasterData, setOngoingDisasterData] = useState(null);

  const handleDisasterAcknowledge = (disasterData) => {
    setOngoingDisasterData(disasterData);
  };

  return (
    <div className="relative w-full h-full">
      {/* Map component as base layer */}
      <div className="absolute inset-0">
        <Map />
      </div>
      
      {/* Radar overlay positioned below header */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Radar />
      </div>

      {/* Disaster Alert Component */}
      <div className="absolute top-4 right-4 z-20">
        <DisasterAlert onAcknowledge={handleDisasterAcknowledge} />
      </div>

      {/* Ongoing Disaster Component */}
      {ongoingDisasterData && (
        <div className="absolute top-4 left-4 z-20">
          <OngoingDisaster disasterData={ongoingDisasterData} />
        </div>
      )}
    </div>
  );
};

export default Home;