import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/BLACKOUT.png';
import bg from '../assets/images/bg.png';

export default function Splash() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <>
      <div className="w-[375px] h-[812px] relative bg-[var(--color-B)] overflow-hidden">
        <img src={bg} className="top-0 -z-1" />
        <img src={logo} className="w-[333px] left-[21px] top-[273px] absolute justify-center"></img>
        <button
          data-property-1="Default"
          onClick={handleClick}
          className="w-[327px] p-2.5 left-[24px] top-[695px] absolute bg-neutral-900 rounded-[10px] shadow-[0px_0px_14px_0px_rgba(255,0,0,0.30)] inline-flex justify-center items-center gap-2.5"
        >
          <div className="justify-center  text-[var(--color-N1)] Subtitle16_SB leading-6">
            로그인
          </div>
        </button>
      </div>
    </>
  );
}
