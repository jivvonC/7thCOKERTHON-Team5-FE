import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-dvh w-full bg-gray-100 flex justify-center">
      {/* 실제 앱 화면(폭 제한) */}

      <div id="app-shell" className="w-full max-w-[430px] min-h-dvh bg-white shadow-lg flex flex-col relative">
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
