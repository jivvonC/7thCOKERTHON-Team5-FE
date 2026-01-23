import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { UilClockThree } from '@iconscout/react-unicons';

interface RoomCardProps {
  id: number;
  level: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export default function RoomCard({
  id,
  level,
  title,
  date,
  time,
  location,
}: RoomCardProps) {
  const navigate = useNavigate();
  // 날짜 파싱 (2026.01.29 형식)
  const [year, month, day] = date.split('.');

  // 시간 파싱 (PM 10:00 ~ 12:00 형식 또는 PM 6:00 형식)
  const timeMatchWithRange = time.match(/(AM|PM)\s+(\d+):(\d+)\s+~\s+(\d+):(\d+)/);
  const timeMatchSingle = time.match(/(AM|PM)\s+(\d+):(\d+)/);
  
  const period = timeMatchWithRange?.[1] || timeMatchSingle?.[1] || '';
  const startHour = timeMatchWithRange?.[2] || timeMatchSingle?.[2] || '';
  const startMin = timeMatchWithRange?.[3] || timeMatchSingle?.[3] || '';
  const endHour = timeMatchWithRange?.[4] || '';
  const endMin = timeMatchWithRange?.[5] || '';

  // 레벨에 따른 배지 SVG 선택
  const getBadgeSrc = () => {
    if (level === '초급') return '/Badge_01.svg';
    if (level === '중급') return '/Badge_02.svg';
    if (level === '고급') return '/Badge_03.svg';
    return '/Badge_01.svg'; // 기본값
  };

  return (
    <div
      className="w-80 h-36 py-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[var(--color-R14)] inline-flex justify-start items-center gap-1 cursor-pointer"
      onClick={() => navigate(`/room/${id}`)}
    >
      {/* 배지 아이콘 영역 */}
      <div className="w-32 h-32 relative flex-shrink-0">
        <img
          src={getBadgeSrc()}
          alt={`${level} 배지`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* 방 정보 영역 */}
      <div className="w-40 inline-flex flex-col justify-start items-start gap-2">
        {/* 레벨 태그 */}
        <div className="inline-flex justify-start items-start gap-2">
          <div className="w-16 h-5 p-2.5 bg-[var(--color-R9)] rounded-[10px] flex justify-center items-center gap-[10px]">
            <div className="justify-start Subtitle14_R text-[var(--color-N1)]">
              {level}
            </div>
          </div>
        </div>

        {/* 방 정보 */}
        <div className="self-stretch flex flex-col justify-center items-start gap-1">
          {/* 제목 */}
          <div className="self-stretch justify-start Subtitle14_EB text-[var(--color-N1)]">
            {title}
          </div>

          {/* 날짜 */}
          <div className="self-stretch inline-flex justify-start items-center gap-[3px]">
            <FiCalendar className="w-4 h-4 text-Pri-R" />
            <div className="flex justify-start items-center">
              <div className="flex justify-start items-center">
                <div className="justify-start Navi_R text-[var(--color-N1)]">
                  {year}.
                </div>
                <div className="justify-start Navi_R text-[var(--color-N1)]">
                  {month}.
                </div>
                <div className="justify-start Navi_R text-[var(--color-N1)]">
                  {day}
                </div>
              </div>
            </div>
          </div>

          {/* 시간 */}
          <div className="self-stretch inline-flex justify-start items-center gap-[3px]">
            <UilClockThree className="w-4 h-4 text-Pri-R" />
            <div className="flex justify-start items-center">
              <div className="flex justify-start items-center">
                <div className="flex justify-start items-center gap-1">
                  <div className="justify-start Navi_R text-[var(--color-N1)]">
                    {period}
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="flex justify-start items-center">
                      <div className="flex justify-start items-center">
                        <div className="justify-start Navi_R text-[var(--color-N1)]">
                          {startHour}
                        </div>
                        <div className="justify-start Navi_R text-[var(--color-N1)]">
                          :
                        </div>
                      </div>
                      <div className="justify-start Navi_R text-[var(--color-N1)]">
                        {startMin}
                      </div>
                    </div>
                    {endHour && endMin && (
                      <>
                        <div className="justify-start Navi_R text-[var(--color-N1)]">
                          ~
                        </div>
                        <div className="flex justify-start items-center">
                          <div className="flex justify-start items-center">
                            <div className="flex justify-start items-center">
                              <div className="justify-start Navi_R text-[var(--color-N1)]">
                                {endHour}
                              </div>
                              <div className="justify-start Navi_R text-[var(--color-N1)]">
                                :
                              </div>
                            </div>
                            <div className="justify-start Navi_R text-[var(--color-N1)]">
                              {endMin}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 위치 */}
          <div className="inline-flex justify-center items-center gap-[3px]">
            <FiMapPin className="w-4 h-4 text-Pri-R" />
            <div className="flex justify-start items-center">
              <div className="flex justify-start items-center">
                <div className="justify-start Navi_R text-[var(--color-N1)]">
                  {location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
