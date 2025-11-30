import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
    id: number;
    name: string;
    type: string;
    address: string;
    lastVisit: string;
}

const Clients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetch or real fetch
        const fetchClients = async () => {
            try {
                // const response = await axios.get('http://localhost:3000/api/clients', {
                //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                // });
                // setClients(response.data);

                // Mock data for now
                setClients([
                    { id: 1, name: 'Al-Amal Grocery', type: 'GROCERY', address: 'Riyadh, Olaya St', lastVisit: '2023-10-25' },
                    { id: 2, name: 'Hyper Panda', type: 'HYPERMARKET', address: 'Riyadh, King Fahd Rd', lastVisit: '2023-10-26' },
                ]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching clients', error);
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Clients</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add New Client
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.lastVisit}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer">Edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clients;
