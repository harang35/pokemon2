import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

// 라이트모드 & 다크모드 전환 버튼
export default function CustomButton() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        console.log("클릭");
        changeTheme();
        console.log("현재 테마:", theme); // light 또는 dark 모드인지 보여준다
      }}
      className="button"
    >
      <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} size="lg" />
    </button>
  );
}
