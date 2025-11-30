import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Dashboard = () => {
    // Mock data for stats
    const stats = [
        { label: 'Total Visits Today', value: 42, color: 'bg-blue-500' },
        { label: 'Active Supervisors', value: 8, color: 'bg-green-500' },
        { label: 'Pending Issues', value: 5, color: 'bg-red-500' },
        { label: 'Coverage', value: '85%', color: 'bg-purple-500' },
    ];

    // Mock data for map markers
    const markers = [
        { id: 1, lat: 24.7136, lng: 46.6753, name: 'Supervisor 1' },
        { id: 2, lat: 24.7236, lng: 46.6853, name: 'Supervisor 2' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>
                <span className="text-sm text-slate-500">Last updated: Just now</span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                <span className="text-xl font-bold">{stat.label[0]}</span>
                            </div>
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Stat</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                            <h3 className="text-slate-500 text-sm font-medium mt-1">{stat.label}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Map Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Live Field Tracking</h3>
                    <Link to="/map" className="text-sm text-accent hover:text-blue-600 font-medium">View Full Map</Link>
                </div>
                <div className="h-96 w-full rounded-lg overflow-hidden shadow-inner border border-slate-200">
                    <MapContainer center={[24.7136, 46.6753]} zoom={13} style={{ height: '100%', width: '100%' }}>
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
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
