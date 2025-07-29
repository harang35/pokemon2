import pokelogo from "./assets/pokemon-logo1.png";
import CustomButton from "./CustomButton";
import Input from "./Input";
import Kor from "./assets/kor.png";
import Usa from "./assets/usa.png";
import { useNavigate } from "react-router-dom";
import PokeGif0 from "./assets/pokegif0.gif";
import PokeGif1 from "./assets/pokegif1.gif";
import PokeGif2 from "./assets/pokegif2.gif";
import PokeGif3 from "./assets/pokegif3.gif";
import PokeGif4 from "./assets/pokegif4.gif";
import PokeGif5 from "./assets/pokegif5.gif";
import PokeGif6 from "./assets/pokegif6.gif";
import PokeGif7 from "./assets/pokegif7.gif";
import { Link } from "react-router-dom";

export default function Header({
  inputRef,
  searchTerm,
  onChange,
  onKeyDown,
  onSearch,
  isKorean,
  toggleLanguage,
  resetSearch,
}) {
  const navigate = useNavigate(); // 추가

  const handleLogoClick = () => {
    navigate("/"); // 메인(홈) 경로로 이동
    resetSearch(); // 상태 초기화
  };

  return (
    <header className="header">
      <img
        src={pokelogo}
        alt="포켓몬 로고"
        className="header-logo"
        onClick={handleLogoClick} // 클릭 이벤트 추가
        style={{ cursor: "pointer" }} // 커서 변경(선택 사항)
      />

      <Link to="/login" className="login-link">
        로그인
      </Link>

      <Link to="/signup" className="signup-link">
        회원가입
      </Link>

      <div className="input-button">
        <Input
          ref={inputRef}
          value={searchTerm}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onSearch={onSearch}
        />
      </div>
      <div className="buttons">
        <CustomButton />
        <button className="language-but" onClick={toggleLanguage}>
          <img
            src={isKorean ? Kor : Usa}
            alt={isKorean ? "한글로 보기" : "영어로 보기"}
          />
        </button>
      </div>
      <div className="pokemon-gif">
        <img src={PokeGif0} alt="피카츄" />
        <img src={PokeGif1} alt="피카츄" />
        <img src={PokeGif2} alt="피카츄" />
        <img src={PokeGif3} alt="피카츄" />
        <img src={PokeGif4} alt="피카츄" />
        <img src={PokeGif5} alt="피카츄" />
        <img src={PokeGif6} alt="피카츄" />
        <img src={PokeGif7} alt="피카츄" />
      </div>
    </header>
  );
}
