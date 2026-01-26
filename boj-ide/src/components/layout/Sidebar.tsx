import React from 'react';
import { useRecoilState } from 'recoil';
import { navigationState } from '../../store/atoms';
import { 
  LayoutDashboard, 
  Code2, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  UserCircle
} from 'lucide-react';
import { cn } from '../ui/Base';

export const Sidebar = () => {
  const [currentPage, setCurrentPage] = useRecoilState(navigationState);

  const menuItems = [
    { id: 'dashboard', label: '워크스페이스', icon: LayoutDashboard },
    { id: 'problems', label: '문제', icon: BookOpen },
    { id: 'ide', label: 'IDE', icon: Code2 },
    { id: 'community', label: '커뮤니티', icon: Users },
  ];

  const bottomItems = [
    { id: 'profile', label: '프로필', icon: UserCircle },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  return (
    <div className="w-64 h-full bg-[#0F1117] border-r border-slate-800 flex flex-col flex-shrink-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center font-bold text-white text-xl">C</div>
          <span className="font-bold text-lg text-slate-100 tracking-tight">CodeSpace</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
              currentPage === item.id 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            )}
          >
            <item.icon className={cn("w-5 h-5", currentPage === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300")} />
            <span className="flex-1 text-left">{item.label}</span>
            {currentPage === item.id && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-slate-800/50">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
              currentPage === item.id 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            )}
          >
            <item.icon className={cn("w-5 h-5", currentPage === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300")} />
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-1 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="flex-1 text-left">로그아웃</span>
        </button>
      </div>
    </div>
  );
};
