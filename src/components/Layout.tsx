import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh w-full bg-gray-100 flex justify-center">
      {/* 실제 앱 화면(폭 제한) */}
      <div id="app-shell" className="w-full max-w-[430px] min-h-dvh bg-white shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default Layout;
