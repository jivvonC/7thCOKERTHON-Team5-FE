import './App.css';
import Splash from './pages/Splash.tsx';
import Login from './pages/Login.tsx';
import StartPage from './pages/StartPage.tsx';
import JoinPage from './pages/JoinPage.tsx';
import JoinListPage from './pages/JoinListPage.tsx';
import Layout from './components/Layout.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/join" element={<JoinPage />}></Route>
        <Route path="/joinlist" element={<JoinListPage />}></Route>
        <Route path="/splash" element={<Splash />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
