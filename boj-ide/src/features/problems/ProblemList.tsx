import React from 'react';
import { Card, Button } from '../../components/ui/Base';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { navigationState } from '../../store/atoms';

export const ProblemList = () => {
  const setPage = useSetRecoilState(navigationState);

  // Mock data for problems
  const problems = Array.from({ length: 15 }).map((_, i) => ({
    id: 1000 + i,
    title: i % 2 === 0 ? 'A+B' : '행렬 곱셈 순서',
    difficulty: i % 3 === 0 ? 'Gold' : i % 3 === 1 ? 'Silver' : 'Bronze',
    tier: i % 5 + 1,
    tags: ['DP', 'Math', 'Implementation'].slice(0, (i % 3) + 1),
    rate: '45%',
    solved: i % 4 === 0
  }));

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Gold': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Silver': return 'text-slate-300 bg-slate-400/10 border-slate-400/20';
      case 'Bronze': return 'text-amber-700 bg-amber-700/10 border-amber-700/20';
      default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0F1117] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-100">문제 리스트</h1>
            <Button onClick={() => {}} variant="primary">+ 문제 가져오기</Button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="문제 번호, 제목, 태그로 검색..." 
                className="w-full h-12 bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" /> 필터
            </Button>
          </div>

          {/* Problem List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_120px_200px_100px] gap-4 p-4 border-b border-slate-800 bg-[#141820] text-sm font-semibold text-slate-400">
              <div className="text-center">#</div>
              <div>제목</div>
              <div>난이도</div>
              <div>알고리즘 분류</div>
              <div className="text-center">정답률</div>
            </div>
            
            <div className="divide-y divide-slate-800/50">
              {problems.map((problem) => (
                <div 
                  key={problem.id}
                  onClick={() => setPage('ide')}
                  className="grid grid-cols-[80px_1fr_120px_200px_100px] gap-4 p-4 items-center hover:bg-slate-800/30 transition-colors cursor-pointer group"
                >
                  <div className="text-center text-slate-500 font-mono">{problem.id}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-200 font-medium group-hover:text-emerald-400 transition-colors">{problem.title}</span>
                    {problem.solved && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty} {problem.tier}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {problem.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-center text-slate-400 text-sm">{problem.rate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="ghost" size="sm" disabled>Previous</Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
