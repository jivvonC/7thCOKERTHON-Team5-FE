import { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin, FiLink } from 'react-icons/fi';
import { UilClockThree, UilUsersAlt, UilSmile } from '@iconscout/react-unicons';
import Modal from '../components/Modal';

interface MyRoom {
  id: number;
  level: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipant: number;
  currentParticipant: number;
  description: string;
  openchatUrl?: string;
  isCreator: boolean; // 방 생성자 여부
}

interface ApiRoom {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  place: string;
  maxParticipant: number;
  currentParticipant: number;
  description: string;
  openchatUrl?: string;
  isCreator: boolean;
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
  const [hour, minute] = timeString.split(':');
  const hourNum = parseInt(hour, 10);
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
  return `${period} ${hour12}:${minute}`;
};

// 레벨에 따른 배지 SVG 선택
const getBadgeSrc = (level: string): string => {
  if (level === '초급') return '/Badge_01.svg';
  if (level === '중급') return '/Badge_02.svg';
  if (level === '고급') return '/Badge_03.svg';
  return '/Badge_01.svg';
};

// Mock 데이터
const mockRooms: MyRoom[] = [
  {
    id: 1,
    level: '초급',
    title: '누구든 함께해 환영방!',
    date: '2026.01.29',
    time: 'PM 10:00',
    location: '여의도 한강공원',
    maxParticipant: 15,
    currentParticipant: 6,
    description: '모두들 같이 모여서 같이 흑백팀전해요~\n저도 처음이라 재밌게 놀았으면해요',
    openchatUrl: 'https://open.kakao.com/o/...',
    isCreator: true,
  },
  {
    id: 2,
    level: '중급',
    title: '누구든 함께해 환영방!',
    date: '2026.01.29',
    time: 'PM 10:00',
    location: '여의도 한강공원',
    maxParticipant: 15,
    currentParticipant: 6,
    description: '모두들 같이 모여서 같이 흑백팀전해요~\n저도 처음이라 재밌게 놀았으면해요',
    openchatUrl: 'https://open.kakao.com/o/...',
    isCreator: false,
  },
];

export default function MyRoomPage() {
  const [rooms, setRooms] = useState<MyRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [roomToCancel, setRoomToCancel] = useState<number | null>(null);

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://43.202.168.163.nip.io/api/me/rooms', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          const convertedRooms: MyRoom[] = data.data.map((apiRoom) => ({
            id: apiRoom.id,
            level: convertLevel(apiRoom.level),
            title: apiRoom.title.trim(),
            date: formatDate(apiRoom.eventDate),
            time: formatTime(apiRoom.eventTime),
            location: apiRoom.place.trim(),
            maxParticipant: apiRoom.maxParticipant,
            currentParticipant: apiRoom.currentParticipant,
            description: apiRoom.description,
            openchatUrl: apiRoom.openchatUrl,
            isCreator: apiRoom.isCreator,
          }));
          setRooms(convertedRooms);
        } else {
          throw new Error(data.message || 'Failed to fetch rooms');
        }
      } catch (err) {
        console.error('Error fetching my rooms:', err);
        // API 연결 실패 시 mock 데이터 사용
        setRooms(mockRooms);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, []);

  const handleDeleteRoomClick = (roomId: number) => {
    setRoomToDelete(roomId);
    setShowDeleteModal(true);
  };

  const handleDeleteRoom = async () => {
    if (!roomToDelete) return;

    try {
      const response = await fetch(`https://43.202.168.163.nip.io/api/rooms/${roomToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('방 삭제에 실패했습니다.');
      }

      // 삭제 성공 시 리스트에서 제거
      setRooms(rooms.filter((room) => room.id !== roomToDelete));
      setShowDeleteModal(false);
      setRoomToDelete(null);
    } catch (err) {
      console.error('Error deleting room:', err);
      alert('방 삭제에 실패했습니다.');
      setShowDeleteModal(false);
      setRoomToDelete(null);
    }
  };

  const handleCancelParticipationClick = (roomId: number) => {
    setRoomToCancel(roomId);
    setShowCancelModal(true);
  };

  const handleCancelParticipation = async () => {
    if (!roomToCancel) return;

    try {
      const response = await fetch(`https://43.202.168.163.nip.io/api/rooms/${roomToCancel}/leave`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('참가 취소에 실패했습니다.');
      }

      // 취소 성공 시 리스트에서 제거
      setRooms(rooms.filter((room) => room.id !== roomToCancel));
      setShowCancelModal(false);
      setRoomToCancel(null);
    } catch (err) {
      console.error('Error canceling participation:', err);
      alert('참가 취소에 실패했습니다.');
      setShowCancelModal(false);
      setRoomToCancel(null);
    }
  };

  return (
    <div className="w-full h-full bg-B flex flex-col">
      {/* 헤더 */}
      <header className="w-full px-6 pt-12 pb-[30px] flex justify-center items-center">
        <h1 className="text-[var(--color-N1)] Title24_SB">참가목록</h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-6 pb-[10px]">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-stone-50">로딩 중...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-red-500">오류: {error}</div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-stone-50">참가한 방이 없습니다.</div>
          </div>
        ) : (
          <div className="space-y-12">
            {rooms.map((room) => {
              const [year, month, day] = room.date.split('.');
              const timeMatch = room.time.match(/(AM|PM)\s+(\d+):(\d+)/);
              const period = timeMatch?.[1] || '';
              const startHour = timeMatch?.[2] || '';
              const startMin = timeMatch?.[3] || '';

              return (
                <div
                  key={room.id}
                  className="w-full py-4 px-4 rounded-[10px] bg-[var(--color-B)] shadow-[0_0_12px_0_var(--color-Pri-R)]"
                >
                  {/* 상단: 레벨 태그와 액션 버튼 */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-[77px] h-[25px] p-2.5 bg-[var(--color-R6)] rounded-[15px] flex justify-center items-center">
                      <div className="Subtitle16_R text-[var(--color-N1)]">{room.level}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (room.isCreator) {
                          handleDeleteRoomClick(room.id);
                        } else {
                          handleCancelParticipationClick(room.id);
                        }
                      }}
                      className="Subtitle14_R text-[var(--color-R9)]"
                    >
                      {room.isCreator ? '방 삭제' : '참가 취소'}
                    </button>
                  </div>

                  {/* 카드 내용 */}
                  <div className="flex flex-col items-center gap-3">
                    {/* 배지 아이콘 */}
                    <div className="w-[64px] h-[67px] flex-shrink-0">
                      <img
                        src={getBadgeSrc(room.level)}
                        alt={`${room.level} 배지`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* 방 정보 */}
                    <div className="w-full flex flex-col gap-2">
                      {/* 제목 */}
                      <div className="text-center Title24_SB text-[var(--color-N1)]">{room.title}</div>

                      {/* 날짜 */}
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-[24px] h-[24px] text-Pri-R flex-shrink-0" />
                        <div className="Title20_R text-[var(--color-N1)]">
                          {year}.{month}.{day}
                        </div>
                      </div>

                      {/* 시간 */}
                      <div className="flex items-center gap-2">
                        <UilClockThree className="w-[24px] h-[24px] text-Pri-R flex-shrink-0" />
                        <div className="Title20_R text-[var(--color-N1)]">
                          {period} {startHour}:{startMin}
                        </div>
                      </div>

                      {/* 위치 */}
                      <div className="flex items-center gap-2">
                        <FiMapPin className="w-[24px] h-[24px] text-Pri-R flex-shrink-0" />
                        <div className="Title20_R text-[var(--color-N1)]">{room.location}</div>
                      </div>

                      {/* 참가자 수 */}
                      <div className="flex items-center gap-2">
                        <UilUsersAlt className="w-[24px] h-[24px] text-Pri-R flex-shrink-0" />
                        <div className="Title20_R text-[var(--color-N1)]">
                          {room.currentParticipant}/{room.maxParticipant}
                        </div>
                      </div>

                      {/* 카카오 오픈채팅방 링크 */}
                      {room.openchatUrl && (
                        <div className="flex items-center gap-2">
                          <FiLink className="w-[24px] h-[24px] text-Pri-R flex-shrink-0" />
                          <a
                            href={room.openchatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Title20_R text-[var(--color-N1)] underline"
                          >
                            카카오 오픈채팅방 링크
                          </a>
                        </div>
                      )}

                      {/* 설명 */}
                      <div className="flex gap-2 mt-1">
                        <UilSmile className="w-[24px] h-[24px] text-Pri-R flex-shrink-0 mt-1" />
                        <div className="flex-1 p-3 rounded-lg outline outline-1 outline-[var(--color-R13)] bg-transparent">
                          <div className="Subtitle14_R text-[var(--color-N1)] whitespace-pre-line">
                            {room.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 방 삭제 모달 */}
      {showDeleteModal && (
        <Modal
          imageSrc="/img_delete.svg"
          imageAlt="삭제 이미지"
          message="방을 삭제할까요?"
          buttonText="취소하기"
          buttonColor="primary"
          onButtonClick={handleDeleteRoom}
          onClose={() => {
            setShowDeleteModal(false);
            setRoomToDelete(null);
          }}
        />
      )}

      {/* 참가 취소 모달 */}
      {showCancelModal && (
        <Modal
          imageSrc="/img_delete.svg"
          imageAlt="취소 이미지"
          message="방 참가를 취소할까요?"
          buttonText="취소하기"
          buttonColor="primary"
          onButtonClick={handleCancelParticipation}
          onClose={() => {
            setShowCancelModal(false);
            setRoomToCancel(null);
          }}
        />
      )}
    </div>
  );
}
