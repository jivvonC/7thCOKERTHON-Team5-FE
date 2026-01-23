import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { UilUser } from '@iconscout/react-unicons';
import { IoAdd } from 'react-icons/io5';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 활성화 상태: 기본 활성은 방구경(/search)
  const isSearchPage = location.pathname === '/search';
  const isMyRoomPage = location.pathname === '/myroom';
  const isCreatePage = location.pathname === '/create';

  return (
    <div className="min-h-dvh w-full bg-gray-100 flex justify-center">
      {/* 실제 앱 화면(폭 제한) */}
      <div id="app-shell" className="w-[375px] h-[812px] bg-B shadow-lg flex flex-col relative">
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto pb-28">
          <Outlet />
        </main>

        {/* 바텀 네비게이션 바 */}
        <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] h-28 relative overflow-hidden">
          {/* 배경 */}
          <div className="w-full h-20 left-0 top-[23px] absolute bg-neutral-900 shadow-[0px_-4px_6.4px_0px_rgba(255,0,0,0.19)]" />
          
          {/* 네비게이션 아이템들 */}
          <div className="w-full px-6 left-0 top-[30px] absolute inline-flex justify-center items-end">
            {/* 방구경 */}
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="w-44 inline-flex flex-col justify-start items-center gap-1.5"
              aria-label="방구경"
            >
              <FiSearch className={`w-5 h-5 ${isSearchPage ? 'text-Pri-R' : 'text-gray-400'}`} />
              <div className={`text-sm font-normal leading-5 ${isSearchPage ? 'text-Pri-R' : 'text-gray-400'}`}>방 찾기</div>
            </button>

            {/* 나의방 */}
            <button
              type="button"
              onClick={() => navigate('/myroom')}
              className="flex-1 inline-flex flex-col justify-start items-center gap-1.5"
              aria-label="나의방"
            >
              <div className="w-44 flex flex-col justify-start items-center gap-1.5">
                <UilUser className={`w-5 h-5 ${isMyRoomPage ? 'text-Pri-R' : 'text-gray-400'}`} />
                <div className={`text-sm font-normal leading-5 ${isMyRoomPage ? 'text-Pri-R' : 'text-gray-400'}`}>나의 방</div>
              </div>
            </button>
          </div>

          {/* 중앙 플러스 버튼 */}
          <button
            type="button"
            onClick={() => navigate('/create')}
            className={`w-12 h-12 p-3 left-1/2 transform -translate-x-1/2 top-[2px] absolute bg-neutral-900 rounded-[90px] inline-flex justify-center items-center z-10 ${
              isCreatePage
                ? 'shadow-[0px_2.7px_9.1px_0px_rgba(255,0,0,1.00)]'
                : 'shadow-[0_2.7px_9.1px_0_#6A6A6A]'
            }`}
            aria-label="방 만들기"
          >
            <IoAdd className={`w-5 h-5 ${isCreatePage ? 'text-Pri-R' : 'text-gray-400'}`} />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MainLayout;
