import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map2 = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Map as Background */}
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        minZoom={3}
        maxZoom={18}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
      </MapContainer>

      {/* Overlay Components */}
      <div style={{ position: 'relative', zIndex: 10, padding: '20px', color: '#fff' }}>
        <h1>Overlay Content</h1>
        <p>This content is rendered on top of the map.</p>
        <button style={{ padding: '10px', fontSize: '16px' }}>Click Me</button>
      </div>
    </div>
  );
};

export default Map2;
