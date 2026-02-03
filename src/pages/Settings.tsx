import React from 'react';
import { Card } from '../components/ui/Card';

export default function Settings() {
  return (
    <div className="space-y-8">
       <h1 className="text-4xl font-bold text-[#2F3E35]">Settings</h1>
       <Card className="p-8">
         <h3 className="text-xl font-bold mb-4">Account Preferences</h3>
         <div className="space-y-4">
           <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
             <span>Dark Mode</span>
             <div className="w-10 h-6 bg-slate-300 rounded-full" />
           </div>
         </div>
       </Card>
    </div>
  );
}
