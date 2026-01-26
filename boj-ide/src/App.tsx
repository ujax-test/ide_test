import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { navigationState } from './store/atoms';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './features/dashboard/Dashboard';
import { IDE } from './features/ide/IDE';
import { ProblemList } from './features/problems/ProblemList';
import { Profile } from './features/user/Profile';
import { SolutionForm } from './features/community/SolutionForm';
import { Community } from './features/community/Community';

function AppContent() {
  const currentPage = useRecoilValue(navigationState);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'problems': return <ProblemList />;
      case 'ide': return <IDE />;
      case 'solution-form': return <SolutionForm />;
      case 'community': return <Community />;
      case 'profile': return <Profile />;
      default: return <div className="flex-1 flex items-center justify-center text-slate-500">준비 중인 페이지입니다.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#0F1117] text-white font-sans overflow-hidden selection:bg-emerald-500/30">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}
