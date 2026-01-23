import confirm from '../assets/images/confirm.png';
import { useNavigate } from 'react-router-dom';

export default function CreateModal() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* 모달 박스 */}
      <div className="relative w-[327px] rounded-[10px] bg-#131313/50 overflow-hidden bg-[var(--color-N1)]">
        <img src={confirm} className="w-[152px] h-[146px] mx-auto mt-10" />

        <div className="mt-6 text-center Title24_EB text-[var(--color-R11)]">
          방 생성이 완료되었어요!
        </div>

        <button
          onClick={() => navigate('/myroom')}
          className="w-[313px] mx-auto my-6 block rounded-[10px] bg-[var(--color-B)] p-2.5"
        >
          <div className="text-[var(--color-N1)] text-base font-semibold leading-6">확인</div>
        </button>
      </div>
    </div>
  );
}
