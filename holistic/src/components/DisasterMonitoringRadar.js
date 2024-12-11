import React, { useState, useEffect } from 'react';

const DisasterMonitoringRadar = () => {
  const [currentBatch, setCurrentBatch] = useState(0);
  const [alerts] = useState({
    'Maharashtra': true,
    'Gujarat': true
  });

  const alertStates = Object.keys(alerts);
  const normalStates = [
    'Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 
    'Madhya Pradesh', 'Rajasthan', 'Bihar', 'Uttar Pradesh', 'Punjab', 
    'Haryana', 'West Bengal', 'Odisha', 'Assam', 'Chhattisgarh', 
    'Jharkhand', 'Uttarakhand', 'Himachal Pradesh'
  ];

  const MAX_DISPLAY = 7;
  const remainingSlots = MAX_DISPLAY - alertStates.length;

  const getVisibleStates = () => {
    const start = (currentBatch * remainingSlots) % normalStates.length;
    const rotatingStates = normalStates.slice(start, start + remainingSlots);
    return [...alertStates, ...rotatingStates];
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % Math.ceil(normalStates.length / remainingSlots));
    }, 5000);
    return () => clearInterval(timer);
  }, [normalStates.length, remainingSlots]);

  return (
    <div className="w-full h-[15vh] min-h-[155px] pt-3">
      <div className="w-[65%] mx-0 bg-slate-50/90 rounded-lg overflow-x-auto h-full flex items-center backdrop-blur-sm">
        <div className="flex gap-6 p-4 min-w-full items-center justify-around">
          {getVisibleStates().map((state, index) => (
            <div key={state} className="relative flex-grow-0 flex-shrink-0 flex flex-col items-center">
              {/* Radar Circle */}
              <div
                className="w-20 h-20 rounded-full relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle, #1a365d 0%, #0f172a 100%)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}
              >
                {/* Rotating Radar Sweep */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    animation: 'spin 4s linear infinite',
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.2) 30deg, transparent 60deg)'
                  }}
                />
                
                {/* Grid Lines */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      radial-gradient(circle, transparent 0%, transparent 20%, rgba(59, 130, 246, 0.1) 20.1%, transparent 20.2%),
                      radial-gradient(circle, transparent 0%, transparent 40%, rgba(59, 130, 246, 0.1) 40.1%, transparent 40.2%),
                      radial-gradient(circle, transparent 0%, transparent 60%, rgba(59, 130, 246, 0.1) 60.1%, transparent 60.2%),
                      radial-gradient(circle, transparent 0%, transparent 80%, rgba(59, 130, 246, 0.1) 80.1%, transparent 80.2%)
                    `
                  }}
                />
                
                {/* Cross Lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(90deg, transparent 49.8%, rgba(59, 130, 246, 0.1) 49.9%, rgba(59, 130, 246, 0.1) 50.1%, transparent 50.2%),
                      linear-gradient(0deg, transparent 49.8%, rgba(59, 130, 246, 0.1) 49.9%, rgba(59, 130, 246, 0.1) 50.1%, transparent 50.2%)
                    `
                  }}
                />
  
                {/* Alert Waves */}
                {alerts[state] && (
                  <>
                    <div
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(239, 68, 68, 0.6)',
                        animation: 'pulse 1s ease-in-out infinite'
                      }}
                    />
                    <div
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid rgba(239, 68, 68, 0.6)',
                        animation: 'pingSmall 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                      }}
                    />
                    <div
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid rgba(239, 68, 68, 0.6)',
                        animation: 'pingSmall 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                        animationDelay: '0.5s'
                      }}
                    />
                  </>
                )}
  
                {/* Center Blip */}
                <div
                  className="absolute w-2 h-2 rounded-full bg-blue-400"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                  }}
                />
              </div>
              
              {/* State Name */}
              <div className="text-center mt-2 text-sm font-medium text-slate-800 whitespace-nowrap">
                {state}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pingSmall {
          75%, 100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
  
        @keyframes pulse {
          0% { opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default DisasterMonitoringRadar;
