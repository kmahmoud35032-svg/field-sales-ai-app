import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
    // Mock data for map markers (same as Dashboard)
    const markers = [
        { id: 1, lat: 24.7136, lng: 46.6753, name: 'Supervisor 1' },
        { id: 2, lat: 24.7236, lng: 46.6853, name: 'Supervisor 2' },
        { id: 3, lat: 24.7336, lng: 46.6653, name: 'Supervisor 3' },
        { id: 4, lat: 24.7036, lng: 46.6953, name: 'Supervisor 4' },
    ];

    return (
        <div className="h-full w-full flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Full Field Map</h2>
            <div className="flex-1 rounded-xl overflow-hidden shadow-lg border border-slate-200 relative z-0">
                <MapContainer center={[24.7136, 46.6753]} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map(marker => (
                        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
                            <Popup>
                                <div className="p-2">
                                    <h4 className="font-bold text-slate-800">{marker.name}</h4>
                                    <p className="text-xs text-slate-500">Active now</p>
                                    <p className="text-xs text-blue-500 mt-1">View Details</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;
