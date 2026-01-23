import { useRef, useState } from 'react';
import logo from '../assets/images/logo_red.svg';
import { UilCalendar, UilClockThree } from '@iconscout/react-unicons';
import CreateModal from '../components/CreateModal';

export default function CreateRoomPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [context, setContext] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const isActivated = Boolean(
    title.trim() && location.trim() && date.trim() && time.trim() && context.trim(),
  );

  const handleClick = () => {
    console.log('done');
    setIsOpen(true);
  };

  return (
    <>
      <div className="w-full h-full relative bg-[var(--color-B)]">
        <div className="w-[329px] h-fit left-[23px] top-[116px] absolute inline-flex flex-col justify-start items-start gap-6">
          <div
            data-property-1="Default"
            className="self-stretch flex flex-col justify-start items-start gap-2"
          >
            <div className="self-stretch justify-center text-[var(--color-N3)] Subtitle16_SB">
              방제목
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
        </div>
        <img src={logo} className="left-[24px] top-[53px] absolute justify-center" />

        <button
          disabled={!isActivated || loading}
          onClick={handleClick}
          className={[
            'w-[327px] p-2.5 left-[24px] top-[632px] absolute rounded-[10px] flex justify-center',
            !isActivated || loading
              ? 'bg-[var(--color-N14)] text-[var(--color-B)]'
              : 'bg-[var(--color-R9)] text-[var(--color-N1)]',
          ].join(' ')}
        >
          <div className="Subtitle16_SB">{loading ? '생성중...' : '작성 완료'}</div>
        </button>
      </div>

      {isOpen && <CreateModal />}
    </>
  );
}
