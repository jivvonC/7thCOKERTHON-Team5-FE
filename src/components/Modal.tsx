import { UilMultiply } from '@iconscout/react-unicons';

interface ModalProps {
  imageSrc: string;
  imageAlt?: string;
  message: string;
  buttonText: string;
  buttonColor?: 'primary' | 'black';
  onButtonClick?: () => void;
  onClose?: () => void;
}

export default function Modal({
  imageSrc,
  imageAlt = '모달 이미지',
  message,
  buttonText,
  buttonColor = 'black',
  onButtonClick,
  onClose,
}: ModalProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[327px] h-[340px] relative bg-stone-50 rounded-[10px] overflow-hidden pb-[18px]">
        {/* X 아이콘 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 z-10"
          aria-label="닫기"
        >
          <UilMultiply className="w-6 h-6" />
        </button>

        {/* 이미지 */}
        <img
          className="w-[165px] h-[165px] left-1/2 top-[30px] absolute transform -translate-x-1/2"
          src={imageSrc}
          alt={imageAlt}
        />

        {/* 멘트 */}
        <div className="w-80 p-2.5 left-0 top-[206px] absolute inline-flex justify-center items-center gap-2.5">
          <div className="justify-center Title24_EB text-[var(--color-R11)]">
            {message}
          </div>
        </div>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={handleButtonClick}
          className={`w-[313px] p-[10px] left-1/2 transform -translate-x-1/2 top-[278px] absolute rounded-[10px] flex justify-center items-center gap-[10px] ${
            buttonColor === 'primary' ? 'bg-[var(--color-Pri-R)]' : 'bg-[var(--color-B)]'
          }`}
        >
          <div className="justify-center text-stone-50 text-base font-semibold font-['Pretendard'] leading-6">
            {buttonText}
          </div>
        </button>
      </div>
    </div>
  );
}
