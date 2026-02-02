import React from 'react';
import { Card } from '../components/ui/Card';

export default function Challenges() {
  return (
     <div className="space-y-8">
       <h1 className="text-4xl font-bold text-[#2F3E35]">Challenges</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="p-8">
           <h3 className="text-xl font-bold mb-2">Upcoming Challenges</h3>
           <p className="text-slate-500">Join the community for a 7-day detox.</p>
         </Card>
       </div>
    </div>
  );
}
