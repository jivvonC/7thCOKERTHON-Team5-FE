import { useRef, useState } from 'react';
import logo from '../assets/images/logo_red.svg';
import { UilCalendar, UilClockThree } from '@iconscout/react-unicons';
import CreateModal from '../components/CreateModal';
export type LevelOption = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export default function CreateRoomPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [context, setContext] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [url, setUrl] = useState('');
  const [maxppl, setMaxPpl] = useState(0);
  const [level, setLevel] = useState<LevelOption>('BEGINNER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const isActivated = Boolean(
    title.trim() && location.trim() && date.trim() && time.trim() && context.trim() && level,
  );

  const LEVEL_OPTIONS: {
    label: string;
    value: LevelOption;
  }[] = [
    { label: '초급', value: 'BEGINNER' },
    { label: '중급', value: 'INTERMEDIATE' },
    { label: '상급', value: 'ADVANCED' },
  ];

  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://43.202.168.163.nip.io/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          place: location,
          eventDate: date,
          eventTime: `${time}:00`, // HH:mm:ss 형태 맞추기
          description: context,
          maxParticipant: maxppl,
          openchatUrl: url,
          level: level,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('방 생성 실패');
      }

      const data = await response.json();
      console.log('방 생성 성공', data);

      setIsOpen(true); // 성공 시 모달 오픈
    } catch (err) {
      console.log(error);
      setError('방 생성에 실패했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-fill relative bg-[var(--color-B)]">
        <div className="w-[329px] h-fit left-[23px] top-[116px] absolute inline-flex flex-col justify-start items-start gap-6">
          <div
            data-property-1="Default"
            className="self-stretch flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              방 제목
            </div>
            <input
              placeholder="EX) 홍대 흑백팀전 모집합니다!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="text-[var(--color-N1)] self-stretch h-11 p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[var(--color-R14)] inline-flex justify-start items-center gap-2.5
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            ></input>
          </div>
          <div
            data-property-1="Default"
            className="w-[329px] flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              장소
            </div>
            <input
              placeholder="EX) 홍대입구역 9번출구"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="text-[var(--color-N1)] self-stretch h-11 p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[var(--color-R14)] inline-flex justify-start items-center gap-2.5
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            ></input>
          </div>
          <div
            data-property-1="Default"
            className="w-[329px] flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              날짜
            </div>
            <input
              type="date"
              value={date}
              ref={inputRef}
              onChange={(e) => setDate(e.target.value)}
              placeholder="연도-월-일"
              className={`h-11 w-full rounded-[10px] p-2.5 bg-transparent text-[var(--color-N1)]
             outline outline-1 outline-[var(--color-R14)]
             ${date ? 'text-[var(--color-N1)]' : 'text-[var(--color-N13)]'}
              `}
            />

            <UilCalendar
              className="text-[var(--color-N13)] absolute right-3 top-[240px]"
              onClick={() => inputRef.current?.showPicker()}
            />
          </div>
          <div
            data-property-1="Default"
            className="w-[329px] flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              시간
            </div>
            <input
              type="time"
              ref={inputTimeRef}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`h-11 w-full rounded-[10px] p-2.5 bg-transparent text-[var(--color-N3)]
             outline outline-1 outline-[var(--color-R14)]
             ${time ? 'text-[var(--color-N1)]' : 'text-[var(--color-N13)]'}
              `}
            />
            <UilClockThree
              className="text-[var(--color-N13)] absolute right-3 top-[342px]"
              onClick={() => inputTimeRef.current?.showPicker()}
            />
          </div>
          <div
            data-property-1="Default"
            className="w-[329px] flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              방 설명
            </div>
            <input
              placeholder="규칙, 준비물, 주의사항 등 자유롭게 적어주세요"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              type="text"
              className="text-[var(--color-N1)] self-stretch h-11 p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[var(--color-R14)] inline-flex justify-start items-center gap-2.5
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            ></input>
          </div>
          <div
            data-property-1="Default"
            className="self-stretch flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              오픈채팅 링크
            </div>
            <input
              placeholder="오픈채팅 URL을 입력해주세요"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="text-[var(--color-N1)] self-stretch h-11 p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[var(--color-R14)] inline-flex justify-start items-center gap-2.5
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            ></input>
          </div>
          <div
            data-property-1="Default"
            className="self-stretch flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              최대 인원 수
            </div>
            <input
              placeholder="EX) 20"
              value={maxppl}
              onChange={(e) => setMaxPpl(Number(e.target.value))}
              type="text"
              className="text-[var(--color-N1)] self-stretch h-11 p-2.5 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[var(--color-R14)] inline-flex justify-start items-center gap-2.5
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            ></input>
          </div>
          <div
            data-property-1="coice"
            className="size- inline-flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              난이도
            </div>
            <div className="w-[329px] py-2.5 rounded-[10px] inline-flex justify-start items-center gap-5">
              {LEVEL_OPTIONS.map((option) => {
                const isSelected = level === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLevel(option.value)}
                    className={[
                      'w-[77px] h-8 p-[15px] rounded-[15px] outline outline-1 outline-offset-[-1px] flex justify-center items-center',
                      isSelected
                        ? 'bg-[var(--color-R6)] outline-[var(--color-R14)]'
                        : 'bg-[var(--color-N10)] outline-[var(--color-N12)]',
                    ].join(' ')}
                  >
                    <span className="Subtitle16_R text-[var(--color-N1)]">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            disabled={!isActivated || loading}
            onClick={handleClick}
            className={[
              'w-[327px] p-2.5 relative rounded-[10px] flex justify-center',
              !isActivated || loading
                ? 'bg-[var(--color-N14)] text-[var(--color-B)]'
                : 'bg-[var(--color-R9)] text-[var(--color-N1)]',
            ].join(' ')}
          >
            <div className="Subtitle16_SB">{loading ? '생성중...' : '작성 완료'}</div>
          </button>
        </div>

        <img src={logo} className="left-[24px] top-[53px] absolute justify-center" />
      </div>

      {isOpen && <CreateModal />}
      {/* {error && (
        <div className="text-[var(--color-R11)] text-sm absolute top-[600px] left-[24px]">
          {error}
        </div>
      )} */}
    </>
  );
}
