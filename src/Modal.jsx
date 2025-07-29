import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

// 포켓몬 카드 팝업으로 세부정보 보기
export function Modal({ data, isKorean, onClose }) {
  const { theme } = useContext(ThemeContext); // 테마 받아오기

  if (!data) return null;
  const img = data.sprites.other["official-artwork"].front_default;

  // 언어에 따른 이름 설정
  const name = isKorean
    ? data.koreanName
    : data.name.charAt(0).toUpperCase() + data.name.slice(1);

  const num = `No.${data.id.toString().padStart(3, "0")}`;
  const height = `${data.height / 10} m`; // decimeter → meter
  const weight = `${data.weight / 10} kg`; // hectogram → kg

  // 언어에 따른 능력과 타입 설정
  const abilities =
    isKorean && data.koreanAbilities
      ? data.koreanAbilities.join(", ")
      : data.abilities.map((a) => a.ability.name).join(", ");

  const types = isKorean
    ? data.koreanTypes?.join(", ") || ""
    : data.types.map((t) => t.type.name).join(", ");

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}
          w-[800px] h-[450px] rounded-lg shadow-lg flex relative gap-7
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`
            absolute top-3 right-5
            ${
              theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-black"
            }
            text-3xl font-bold
          `}
          onClick={onClose}
        >
          X
        </button>

        {/* 왼쪽: 이미지 */}
        <div className="flex items-center justify-center w-[400px] h-full pl-3">
          <img
            className="w-[395px] h-[395px] object-contain"
            src={img}
            alt={name}
          />
        </div>

        {/* 오른쪽: 텍스트 정보 */}
        <div
          className="flex-1 flex flex-col justify-center p5 pr-5"
          style={{ width: "100%", maxWidth: "380px" }}
        >
          <h2
            className={`text-4xl font-bold mb-2 ${
              theme === "dark" ? "text-blue-300" : "text-blue-900"
            }`}
          >
            {name}
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-400"
            } mb-4 pb-3 text-xl`}
          >
            {num}
          </p>
          <div
            className="text-me space-y-1 leading-loose"
            style={{ overflowWrap: "break-word", wordBreak: "keep-all" }}
          >
            <p>
              <b>{isKorean ? "타입:" : "Types:"}</b> {types}
            </p>
            <p>
              <b>{isKorean ? "키:" : "Height:"}</b> {height}
            </p>
            <p>
              <b>{isKorean ? "몸무게:" : "Weight:"}</b> {weight}
            </p>
            <p>
              <b>{isKorean ? "특성:" : "Abilities:"}</b> {abilities}
            </p>
            {isKorean && data.koreanDesc && (
              <p>
                <b>설명:</b> {data.koreanDesc}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
