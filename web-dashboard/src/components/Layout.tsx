import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Clients', path: '/clients' },
        { name: 'Visits', path: '/visits' },
    ];

    const handleLogout = () => {
        // Clear token
        localStorage.removeItem('token');
        // Redirect to login (using window.location for full refresh or navigate for SPA)
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white shadow-xl flex flex-col">
                <div className="p-6 border-b border-secondary">
                    <h1 className="text-2xl font-bold tracking-wider">FieldSurvey</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${location.pathname === item.path
                                ? 'bg-accent text-white shadow-md'
                                : 'text-slate-300 hover:bg-secondary hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-secondary">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-slate-400">admin@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-surface shadow-sm h-16 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {navItems.find((i) => i.path === location.pathname)?.name || 'Dashboard'}
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                        Logout
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
