import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin } from 'react-icons/fi';
import { UilClockThree, UilUsersAlt, UilSmile } from '@iconscout/react-unicons';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

interface Room {
  id: number;
  level: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipant: number;
  currentParticipant: number;
  description: string;
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
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

interface ApiResponse {
  success: boolean;
  code: string;
  message: string;
  data: ApiRoom;
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

// 레벨에 따른 배지 SVG 선택
const getBadgeSrc = (level: string): string => {
  if (level === '초급') return '/Badge_01.svg';
  if (level === '중급') return '/Badge_02.svg';
  if (level === '고급') return '/Badge_03.svg';
  return '/Badge_01.svg';
};

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [joining, setJoining] = useState(false); // 참가 중 상태
  const [joinError, setJoinError] = useState<string | null>(null); // 참가 에러 상태

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://43.202.168.163.nip.io/api/rooms/${id}`, {
          credentials: 'include', // 세션 쿠키 포함
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.success && data.data) {
          const apiRoom = data.data;
          setRoom({
            id: apiRoom.id,
            level: convertLevel(apiRoom.level),
            title: apiRoom.title,
            date: formatDate(apiRoom.eventDate),
            time: formatTime(apiRoom.eventTime),
            location: apiRoom.place,
            maxParticipant: apiRoom.maxParticipant,
            currentParticipant: apiRoom.currentParticipant,
            description: apiRoom.description,
          });
        } else {
          throw new Error(data.message || 'Failed to fetch room');
        }
      } catch (err) {
        console.error('Error fetching room:', err);
        // Mock 데이터 사용
        setRoom({
          id: Number(id),
          level: '중급',
          title: '누구든 함께해 환영방!',
          date: '2026.01.29',
          time: 'PM 10:00 ~ 12:00',
          location: '여의도 한강공원',
          maxParticipant: 15,
          currentParticipant: 6,
          description: '모두들 같이 모여서 같이 흑백팀전해요~\n저도 처음이라 재밌게 놀았으면해요',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  if (loading || !room) {
    return (
      <div className="w-full h-full bg-B flex items-center justify-center">
        <div className="text-stone-50">로딩 중...</div>
      </div>
    );
  }

  // 날짜 파싱
  const [year, month, day] = room.date.split('.');

  // 시간 파싱 (PM 10:00 ~ 12:00 형식에서 시작 시간만 추출)
  const timeMatch = room.time.match(/(AM|PM)\s+(\d+):(\d+)/);
  const period = timeMatch?.[1] || '';
  const startHour = timeMatch?.[2] || '';
  const startMin = timeMatch?.[3] || '';

  return (
    <div className="w-full min-h-dvh bg-B flex flex-col relative overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src="/img_circle.svg"
        alt="배경"
        className="absolute top-0 left-0 w-full object-cover object-top z-0"
      />

      {/* 헤더 */}
      <header className="relative z-10 w-full px-6 pt-12 pb-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-white"
          aria-label="뒤로가기"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-lg font-semibold">{room.title}</h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 flex-1 px-6 pb-6 flex flex-col items-center overflow-y-auto">
        {/* 배지 그래픽 */}
        <div className="w-64 h-64 mt-8 mb-4 flex-shrink-0">
          <img
            src={getBadgeSrc(room.level)}
            alt={`${room.level} 배지`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* 레벨 태그 */}
        <div className="mb-6 flex-shrink-0">
          <div className="w-[100.5px] h-[33px] p-[15px] mt-[36px] bg-[var(--color-R9)] rounded-[15px] flex justify-center items-center gap-[15px]">
            <div className="Title20_R text-[var(--color-N1)]">{room.level}</div>
          </div>
        </div>

        {/* 방 정보 */}
        <div className="w-full max-w-sm space-y-3 mb-6 flex-shrink-0">
          {/* 날짜 */}
          <div className="flex items-center gap-3">
            <FiCalendar className="w-5 h-5 text-Pri-R flex-shrink-0" />
            <div className="Subtitle14_R text-[var(--color-N1)]">
              {year}.{month}.{day}
            </div>
          </div>

          {/* 시간 */}
          <div className="flex items-center gap-3">
            <UilClockThree className="w-5 h-5 text-Pri-R flex-shrink-0" />
            <div className="Subtitle14_R text-[var(--color-N1)]">
              {period} {startHour}:{startMin}
            </div>
          </div>

          {/* 위치 */}
          <div className="flex items-center gap-3">
            <FiMapPin className="w-5 h-5 text-Pri-R flex-shrink-0" />
            <div className="Subtitle14_R text-[var(--color-N1)]">{room.location}</div>
          </div>

          {/* 참가자 수 */}
          <div className="flex items-center gap-3">
            <UilUsersAlt className="w-5 h-5 text-Pri-R flex-shrink-0" />
            <div className="Subtitle14_R text-[var(--color-N1)]">
              {room.currentParticipant}/{room.maxParticipant}
            </div>
          </div>

          {/* 설명 */}
          <div className="flex gap-3">
            <UilSmile className="w-5 h-5 text-Pri-R flex-shrink-0" />
            <div className="flex-1 p-4 rounded-lg outline outline-1 outline-[var(--color-R13)] bg-transparent">
              <div className="Body14_R text-[var(--color-N1)] whitespace-pre-line">
                {room.description}
              </div>
            </div>
          </div>
        </div>

        {/* 참가하기 버튼 */}
        <button
          type="button"
          disabled={joining}
          className="w-[327px] p-[10px] bg-[var(--color-R9)] rounded-[10px] flex items-center justify-center gap-[10px] shadow-[0_0_14px_0_rgba(255,0,0,0.30)] mt-auto mb-6 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={async () => {
            if (!id || joining) return;

            try {
              setJoining(true);
              setJoinError(null);

              const response = await fetch(`https://43.202.168.163.nip.io/api/rooms/${id}/join`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include', // 세션 쿠키 포함
              });

              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              
              if (data.success) {
                // 참가 성공 - 모달 표시
                setShowModal(true);
                // 참가자 수 업데이트 (옵션)
                if (room) {
                  setRoom({
                    ...room,
                    currentParticipant: room.currentParticipant + 1,
                  });
                }
              } else {
                throw new Error(data.message || '방 참가에 실패했습니다.');
              }
            } catch (err) {
              console.error('Error joining room:', err);
              setJoinError(err instanceof Error ? err.message : '방 참가에 실패했습니다.');
            } finally {
              setJoining(false);
            }
          }}
        >
          <span className="Subtitle16_SB text-[var(--color-B)]">
            {joining ? '참가 중...' : '참가하기'}
          </span>
        </button>

        {/* 참가 에러 메시지 */}
        {joinError && (
          <div className="w-full max-w-sm mb-4 text-center">
            <div className="text-[var(--color-R6)] text-sm">{joinError}</div>
          </div>
        )}
      </main>

      {/* 모달 */}
      {showModal && (
        <Modal
          imageSrc="/img_complete.svg"
          imageAlt="완료 이미지"
          message="방 참여가 완료되었어요!"
          buttonText="확인"
          onClose={() => {
            setShowModal(false);
            navigate('/search');
          }}
        />
      )}
    </div>
  );
}
