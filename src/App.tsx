import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { Leaderboard } from './pages/Leaderboard';
import { KingdomBuilders } from './games/kingdom-builders/KingdomBuilders';
import { ArkEscape } from './games/ark-escape/ArkEscape';
import { BibleCharades } from './games/bible-charades/BibleCharades';
import { authService } from './services/auth';
import { useAuthStore } from './store/useAuthStore';

export default function App() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          login(user);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuth();
  }, [login]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/games/kingdom-builders" element={<KingdomBuilders />} />
          <Route path="/games/ark-escape" element={<ArkEscape />} />
          <Route path="/games/bible-charades" element={<BibleCharades />} />
        </Routes>
      </div>
    </Router>
  );
}