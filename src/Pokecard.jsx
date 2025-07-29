import React, { useState } from "react";
import { Modal } from "./Modal";

// 한글/영어 지원 버전으로 통합
export default function Pokecard({ data, isKorean }) {
  const [showModal, setShowModal] = useState(false);

  if (!data) return null; // 데이터가 없을 때 안전하게 처리

  // 번호 3자리로 맞추기
  const num = `No.${data.id.toString().padStart(3, "0")}`;

  // 공식 아트워크 이미지
  const img = data.sprites.other["official-artwork"].front_default;

  // 언어에 따른 이름 설정
  const name = isKorean
    ? data.koreanName
    : data.name.charAt(0).toUpperCase() + data.name.slice(1);

  return (
    <>
      <div
        className="pokecard"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <img className="pokeimg" src={img} alt={name} />
        <span className="pokename">{name}</span>
        <p className="pokenum">{num}</p>
      </div>

      {showModal && (
        <Modal
          data={data}
          isKorean={isKorean}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
