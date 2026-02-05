import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { communityTabState } from '../../store/atoms';
import { Card, Button, Badge } from '../../components/ui/Base';
import { MessageSquare, Search, ThumbsUp, Eye, Calendar, MessageCircle, Megaphone, Code2, PenSquare } from 'lucide-react';
import Editor from '@monaco-editor/react';
// Sub-component: Solution Sharing
const SolutionSharing = () => {
    const [activeSolutionId, setActiveSolutionId] = useState(1);
    const [view, setView] = useState('list'); // 'list' (problem list) or 'detail' (solutions for a problem)
    // Mock problems that have solutions
    const problems = [
        { id: 1000, title: "A+B", solutions: 152, bestLang: "Python" },
        { id: 1001, title: "A-B", solutions: 89, bestLang: "C++" },
        { id: 1920, title: "수 찾기", solutions: 42, bestLang: "Java" },
    ];
    // Mock solutions for a specific problem
    const solutions = [
        {
            id: 1,
            title: "1000번 A+B Java 최적화 풀이입니다.",
            user: '알고리즘마스터',
            avatar: 'Felix',
            time: '3시간 전',
            lang: 'Java',
            likes: 42,
            views: 128,
            tags: ['Math', 'Implementation'],
            code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
        
        // Scanner is slower than BufferedReader but easier to use for beginners
        sc.close();
    }
}`
        },
        {
            id: 2,
            title: "Python 한 줄 코딩 (Short coding)",
            user: 'pythonista',
            avatar: 'Aneka',
            time: '5시간 전',
            lang: 'Python3',
            likes: 38,
            views: 95,
            tags: ['Short', 'Math'],
            code: `print(sum(map(int, input().split())))`
        },
        {
            id: 3,
            title: "C++ 입출력 속도 향상 팁 포함",
            user: 'cppNinja',
            avatar: 'Bob',
            time: '1일 전',
            lang: 'C++',
            likes: 29,
            views: 150,
            tags: ['Performance', 'IO'],
            code: `#include <iostream>
using namespace std;

int main() {
    // Fast I/O
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`
        },
    ];
    const activeSolution = solutions.find(s => s.id === activeSolutionId) || solutions[0];
    const comments = [
        { id: 1, user: 'user123', content: '깔끔한 풀이네요! 배웠습니다.', time: '2시간 전' },
        { id: 2, user: 'coder99', content: 'Scanner 대신 BufferedReader를 쓰면 더 빠르지 않을까요?', time: '1시간 전' },
    ];
    // If in 'list' view, show Problem Cards
    if (view === 'list') {
        return (<div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-100">문제 풀이 공유</h2>
              <p className="text-slate-400 text-sm mt-1">다른 사람들의 풀이를 참고하여 실력을 키워보세요.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
              <input type="text" placeholder="문제 번호 또는 제목 검색" className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map(prob => (<Card key={prob.id} onClick={() => setView('detail')} className="p-6 bg-slate-900/50 border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:bg-slate-800/50">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="font-mono">{prob.id}</Badge>
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <Code2 className="w-3 h-3"/> {prob.solutions} 풀이
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">{prob.title}</h3>
                <div className="text-sm text-slate-500">
                  Top Language: <span className="text-emerald-500">{prob.bestLang}</span>
                </div>
              </Card>))}
          </div>
        </div>
      </div>);
    }
    // If in 'detail' view, show the 3-column layout (List | Code | Comments) or the 2-column layout from previous iteration
    return (<div className="flex h-full bg-[#0F1117]">
      {/* Sidebar: Solutions List for Selected Problem */}
      <div className="w-80 bg-[#0F1117] border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setView('list')} className="-ml-2">
             ← 목록
          </Button>
          <span className="font-bold text-slate-200">1000. A+B</span>
        </div>
        <div className="p-4 border-b border-slate-800">
          <input type="text" placeholder="언어, 작성자 검색" className="w-full h-9 bg-slate-900 border border-slate-800 rounded-lg pl-3 pr-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"/>
        </div>
        <div className="flex-1 overflow-y-auto">
          {solutions.map((sol) => (<div key={sol.id} onClick={() => setActiveSolutionId(sol.id)} className={`p-4 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-slate-800/30 ${sol.id === activeSolutionId ? 'bg-slate-800/40 border-l-4 border-l-emerald-500' : 'border-l-4 border-l-transparent'}`}>
              <div className="flex justify-between items-start mb-1">
                <Badge className="text-[10px] px-1.5 py-0.5">{sol.lang}</Badge>
                <span className="text-[10px] text-slate-500">{sol.time}</span>
              </div>
              <h3 className={`font-semibold text-sm mb-2 line-clamp-2 ${sol.id === activeSolutionId ? 'text-emerald-400' : 'text-slate-300'}`}>
                {sol.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{sol.user}</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5"><ThumbsUp className="w-3 h-3"/> {sol.likes}</span>
                </div>
              </div>
            </div>))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0F1117]">
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-[#0F1117]">
          <div>
            <h1 className="text-lg font-bold text-slate-100">{activeSolution.title}</h1>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {activeSolution.time}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3"/> {activeSolution.views}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              <ThumbsUp className="w-3 h-3"/> {activeSolution.likes}
            </Button>
          </div>
        </div>

        {/* Code */}
        <div className="flex-1 bg-[#1e1e1e] relative">
          <Editor height="100%" theme="vs-dark" language={activeSolution.lang.toLowerCase().replace('python3', 'python').replace('c++', 'cpp')} value={activeSolution.code} options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly: true,
            scrollBeyondLastLine: false,
            padding: { top: 16 }
        }}/>
        </div>

        {/* Comments (Collapsible or Fixed Height) */}
        <div className="h-64 border-t border-slate-800 bg-[#0F1117] flex flex-col">
          <div className="p-3 border-b border-slate-800 font-bold text-slate-200 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-500"/> 댓글
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map(c => (<div key={c.id} className="flex gap-3 text-sm">
                <div className="font-bold text-slate-300">{c.user}</div>
                <div className="text-slate-400 flex-1">{c.content}</div>
                <div className="text-slate-600 text-xs">{c.time}</div>
              </div>))}
          </div>
           <div className="p-3 border-t border-slate-800 bg-[#141820]">
            <div className="relative">
              <input type="text" placeholder="댓글 작성..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-3 pr-10 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"/>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-400">
                <MessageSquare className="w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
// Sub-component: Free Board
const FreeBoard = () => {
    const posts = [
        { id: 1, title: "이번 주 챌린지 같이 하실 분?", author: "CodeWarrior", date: "2024.02.10", likes: 5, comments: 2 },
        { id: 2, title: "BFS랑 DFS 중에 뭐가 더 어렵나요?", author: "Newbie", date: "2024.02.09", likes: 12, comments: 8 },
        { id: 3, title: "취업 준비하면서 알고리즘 공부 팁 공유합니다", author: "DevMaster", date: "2024.02.08", likes: 45, comments: 15 },
        { id: 4, title: "파이썬 시간초과 해결 방법 좀...", author: "PyLover", date: "2024.02.08", likes: 2, comments: 4 },
    ];
    return (<div className="flex-1 p-8 overflow-y-auto bg-[#0F1117]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-100">자유 게시판</h2>
            <p className="text-slate-400 text-sm mt-1">자유롭게 이야기를 나누어 보세요.</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <PenSquare className="w-4 h-4"/> 글쓰기
          </Button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#141820] text-slate-400 text-sm">
                <th className="p-4 font-medium w-16 text-center">#</th>
                <th className="p-4 font-medium">제목</th>
                <th className="p-4 font-medium w-32">작성자</th>
                <th className="p-4 font-medium w-32 text-center">날짜</th>
                <th className="p-4 font-medium w-20 text-center">추천</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {posts.map(post => (<tr key={post.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer group">
                  <td className="p-4 text-center text-slate-500 text-sm">{post.id}</td>
                  <td className="p-4 text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {post.title}
                    {post.comments > 0 && (<span className="ml-2 text-xs text-slate-500 font-mono">[{post.comments}]</span>)}
                  </td>
                  <td className="p-4 text-slate-400 text-sm">{post.author}</td>
                  <td className="p-4 text-center text-slate-500 text-xs">{post.date}</td>
                  <td className="p-4 text-center text-emerald-500 text-sm font-medium">{post.likes}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
};
// Sub-component: Notice Board
const NoticeBoard = () => {
    const notices = [
        { id: 1, title: "시스템 점검 안내 (02/10 02:00 ~ 04:00)", date: "2024.02.08", views: 1250 },
        { id: 2, title: "새로운 챌린지 시즌 5가 시작됩니다!", date: "2024.02.05", views: 3400 },
        { id: 3, title: "IDE 다크 모드 가독성 개선 업데이트", date: "2024.02.01", views: 890 },
    ];
    return (<div className="flex-1 p-8 overflow-y-auto bg-[#0F1117]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-100">공지사항</h2>
            <p className="text-slate-400 text-sm mt-1">새로운 소식과 업데이트를 확인하세요.</p>
          </div>
        </div>

        <div className="space-y-4">
          {notices.map(notice => (<div key={notice.id} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">공지</Badge>
                <span className="text-slate-500 text-xs">{notice.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">{notice.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3"/> {notice.views}</span>
                <span>작성자: 관리자</span>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
};
// Main Community Container
export const Community = () => {
    const [activeTab, setActiveTab] = useRecoilState(communityTabState);
    const tabs = [
        { id: 'solutions', label: '문제 풀이 공유', icon: Code2 },
        { id: 'free', label: '자유 게시판', icon: MessageCircle },
        { id: 'notices', label: '공지사항', icon: Megaphone },
    ];
    return (<div className="flex flex-col h-full bg-[#0F1117]">
      {/* Top Navigation Tabs */}
      <div className="h-14 border-b border-slate-800 flex items-center px-4 bg-[#0F1117]">
        <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
          {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
              <tab.icon className="w-4 h-4"/>
              {tab.label}
            </button>))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'solutions' && <SolutionSharing />}
        {activeTab === 'free' && <FreeBoard />}
        {activeTab === 'notices' && <NoticeBoard />}
      </div>
    </div>);
};
