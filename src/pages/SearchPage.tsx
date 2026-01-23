import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import RoomCardList, { type Room } from '../components/RoomCardList';

interface ApiRoom {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  place: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

interface ApiResponse {
  success: boolean;
  code: string;
  message: string;
  data: ApiRoom[];
}

// API 레벨을 한글로 변환
const convertLevel = (level: string): string => {
  switch (level) {
    case 'BEGINNER':
      return '초급';
    case 'INTERMEDIATE':
      return '중급';
    case 'ADVANCED':
      return '고급';
    default:
      return '초급';
  }
};

// 날짜 형식 변환: "2026-01-23" -> "2026.01.23"
const formatDate = (dateString: string): string => {
  return dateString.replace(/-/g, '.');
};

// 시간 형식 변환: "18:00:00" -> "PM 6:00"
const formatTime = (timeString: string): string => {
  // "HH:mm:ss" 형식을 파싱
  const [hour, minute] = timeString.split(':');
  const hourNum = parseInt(hour, 10);
  
  // 24시간 형식을 12시간 형식으로 변환
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
  
  return `${period} ${hour12}:${minute}`;
};

// API 데이터를 Room 타입으로 변환
const convertApiRoomToRoom = (apiRoom: ApiRoom): Room => {
  return {
    id: apiRoom.id,
    level: convertLevel(apiRoom.level),
    title: apiRoom.title.trim(), // 공백 제거
    date: formatDate(apiRoom.eventDate),
    time: formatTime(apiRoom.eventTime),
    location: apiRoom.place.trim(), // 공백 제거
  };
};

// Mock 데이터
const mockRooms: Room[] = [
  {
    id: 1,
    level: '초급',
    title: '누구든 함께해 환영방!',
    date: '2026.01.29',
    time: 'PM 6:00',
    location: '여의도 한강공원',
  },
  {
    id: 2,
    level: '중급',
    title: '누구든 함께해 환영방!',
    date: '2026.01.29',
    time: 'PM 6:00',
    location: '한강공원',
  },
  {
    id: 3,
    level: '고급',
    title: '누구든 함께해 환영방!',
    date: '2026.01.29',
    time: 'PM 6:00',
    location: '한강공원',
  },
];

export default function SearchPage() {
  const [allRooms, setAllRooms] = useState<Room[]>([]); // 원본 방 리스트
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]); // 필터링된 방 리스트
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://43.202.168.163.nip.io/api/rooms', {
          credentials: 'include', // 세션 쿠키 포함
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          const convertedRooms = data.data.map(convertApiRoomToRoom);
          setAllRooms(convertedRooms);
          setFilteredRooms(convertedRooms); // 초기에는 모든 방 표시
        } else {
          throw new Error(data.message || 'Failed to fetch rooms');
        }
      } catch (err) {
        console.error('Error fetching rooms:', err);
        // API 연결 실패 시 mock 데이터 사용
        setAllRooms(mockRooms);
        setFilteredRooms(mockRooms);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // 검색어로 필터링하는 함수
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      // 검색어가 비어있으면 모든 방 표시
      setFilteredRooms(allRooms);
    } else {
      // 제목이나 위치에 검색어가 포함된 방만 필터링
      const filtered = allRooms.filter(
        (room) =>
          room.title.toLowerCase().includes(query.toLowerCase()) ||
          room.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  };

  // 엔터 키 입력 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e.currentTarget.value);
    }
  };

  return (
    <div className="w-full h-full bg-B flex flex-col">
      {/* 헤더 */}
      <header className="w-full px-6 pt-12 pb-4">
        {/* BLACKOUT 타이틀 */}
        <div className="mb-4">
          <img 
            src="/BLACKOUT.svg" 
            alt="BLACKOUT" 
            className="h-auto"
          />
        </div>
        
        {/* 검색바 */}
        <div className="w-80 h-11 px-2.5 bg-[var(--color-R15)] rounded-[10px] inline-flex justify-start items-center gap-[5px]">
          <FiSearch className="w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="방을 찾아 검색해보세요!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent Body16_R text-[var(--color-N4)] outline-none placeholder:text-[var(--color-N4)]"
          />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-6 pb-4">
        {/* 그래픽 영역 */}
        <div className="w-full mb-6">
          <img 
            src="/img_search.svg" 
            alt="VS 그래픽" 
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* 방 카드 리스트 */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-stone-50">로딩 중...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">오류: {error}</div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-stone-50">
              {searchQuery ? '검색 결과가 없습니다.' : '참가 가능한 방이 없습니다.'}
            </div>
          </div>
        ) : (
          <RoomCardList rooms={filteredRooms} />
        )}
      </main>
    </div>
  );
}
