import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Challenges from './pages/Challenges';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<div className="p-20 text-center text-slate-500">Page Not Found</div>} />
      </Route>
    </Routes>
  );
}
