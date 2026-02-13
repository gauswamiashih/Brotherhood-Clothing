import React from 'react';

interface StatsCardProps {
   title: string;
   value: string | number;
   icon: React.ReactNode;
   color: string;
   loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, loading }) => {
   return (
      <div className={`bg-[#0d0d0d] border border-white/5 p-6 rounded-xl shadow-lg relative overflow-hidden group hover:border-${color}-500/50 transition-all duration-300`}>
         <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-500 text-6xl font-black`}>
            {icon}
         </div>

         <div className="relative z-10 space-y-2">
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">{title}</h3>
            {loading ? (
               <div className="h-10 w-24 bg-white/5 animate-pulse rounded"></div>
            ) : (
               <div className="text-4xl font-serif font-bold text-white group-hover:text-purple-400 transition-colors">
                  {value}
               </div>
            )}
         </div>

         <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-600 to-transparent opacity-50`}></div>
      </div>
   );
};

export default StatsCard;
