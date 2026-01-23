import { useState } from 'react';
import logo from '../assets/images/BLACKOUT.png';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg.png';
import { sessionLogin } from '../apis/auth';

export default function Login() {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActivated = Boolean(nickname.trim() && pw.trim());

  const handleClick = async () => {
    if (!isActivated || loading) return;

    try {
      setLoading(true);
      setError(null);

      await sessionLogin({
        nickname,
        password: pw,
      });

      // ✅ 로그인 성공
      navigate('/');
    } catch (e) {
      setError('닉네임 또는 비밀번호가 올바르지 않아요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-[375px] h-[812px] relative bg-[var(--color-B)] overflow-hidden">
        <img src={bg} className="top-0 -z-1" />

        <img src={logo} className="w-[333px] left-[21px] top-[96px] absolute justify-center" />

        {/* 입력 영역 */}
        <div className="w-[329px] left-[21px] top-[206px] absolute inline-flex flex-col gap-6">
          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <div className="text-[var(--color-N1)] Subtitle16_SB">닉네임</div>
            <input
              value={nickname}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="2~7자리이내로 입력해주세요"
              className="text-[var(--color-N1)] h-11 p-2.5 rounded-[10px] outline outline-1 outline-[var(--color-R14)]
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <div className="text-[var(--color-N1)] Subtitle16_SB">비밀번호</div>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="숫자 6자리를 입력해주세요"
              className="text-[var(--color-N1)] h-11 p-2.5 rounded-[10px] outline outline-1 outline-[var(--color-R14)]
              placeholder:text-[var(--color-N13)] placeholder:Subtitle16_SB"
            />
          </div>

          {/* 에러 메시지 */}
          {error && <div className="text-[var(--color-R6)] text-sm">{error}</div>}
        </div>

        {/* 버튼 */}
        <button
          disabled={!isActivated || loading}
          onClick={handleClick}
          className={[
            'w-[327px] p-2.5 left-[24px] top-[695px] absolute rounded-[10px] flex justify-center',
            !isActivated || loading
              ? 'bg-[var(--color-N14)] text-[var(--color-B)]'
              : 'bg-[var(--color-R9)] text-[var(--color-N1)]',
          ].join(' ')}
        >
          <div className="Subtitle16_SB">{loading ? '로그인 중...' : '완료하기'}</div>
        </button>
      </div>
    </>
  );
}
