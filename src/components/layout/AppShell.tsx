import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Shield, Settings, Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Challenges', icon: Shield, path: '/challenges' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-[#F0F7F4] text-slate-700 font-sans selection:bg-[#6B9080] selection:text-white flex overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/60 backdrop-blur-2xl border-r border-white/50 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B9080] to-[#A4C3B2] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#6B9080]/20">
            M
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#2F3E35]">MindfulTech</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group font-medium text-lg",
                  isActive 
                    ? "bg-[#6B9080] text-white shadow-lg shadow-[#6B9080]/30 translate-x-1" 
                    : "text-slate-500 hover:bg-white/80 hover:text-[#6B9080] hover:translate-x-1"
                )}
              >
                <item.icon size={22} className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/50">
          <div className="bg-white/40 rounded-2xl p-4 border border-white/60 flex items-center gap-4 cursor-pointer hover:bg-white/60 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-[#A4C3B2] flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm truncate">Alex Chen</p>
              <p className="text-xs text-slate-500 truncate">Free Plan</p>
            </div>
            <LogOut size={18} className="text-slate-400 group-hover:text-[#6B9080] transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth bg-gradient-to-br from-[#F0F7F4] via-[#E8F3EF] to-[#F0F7F4]">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 sticky top-0 z-30 bg-[#F0F7F4]/80 backdrop-blur-md border-b border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6B9080] flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="font-semibold text-lg text-[#2F3E35]">MindfulTech</span>
          </div>
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-white/50 border border-white/50 text-slate-600 active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
