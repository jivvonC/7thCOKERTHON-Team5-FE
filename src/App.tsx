import './App.css';
import Splash from './pages/Splash.tsx';
import Login from './pages/Login.tsx';
import SearchPage from './pages/SearchPage.tsx';
import MyRoomPage from './pages/MyRoomPage.tsx';
import CreateRoomPage from './pages/CreateRoomPage.tsx';
import Layout from './components/Layout.tsx';
import MainLayout from './components/MainLayout.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/splash" replace />}></Route>
        <Route path="/splash" element={<Splash />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/myroom" element={<MyRoomPage />}></Route>
        <Route path="/create" element={<CreateRoomPage />}></Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
