import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// 임시 홈 컴포넌트 생성
const Home = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">ATTABOY 커피 홈페이지</h1>
    <p>환영합니다! 이 페이지는 현재 개발 중입니다.</p>
  </div>
);

// 임시 레이아웃 컴포넌트 생성
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-white shadow-md p-4">
      <h1 className="text-xl font-bold">ATTABOY 커피</h1>
    </header>
    <main>{children}</main>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 기본 홈 페이지 */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        
        {/* 404 페이지 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App; 