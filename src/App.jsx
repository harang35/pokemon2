import "./App.css";
import Header from "./Header";
import Pokecard from "./Pokecard";
import { ThemeProvider, ThemeContext } from "./ThemeProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";

function App() {
  const { theme } = useContext(ThemeContext);
  const [pokemons, setPokemons] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isKorean, setIsKorean] = useState(false); // 한글/영문 전환 - 기본값은 영어(false)
  const inputRef = useRef();

  // 포켓몬 데이터 패치 (한글 포함)
  const fetchPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await res.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        // 기본 포켓몬 데이터 가져오기
        const pokeDetail = await fetch(pokemon.url).then((res) => res.json());

        // species에서 한글 이름, 설명 가져오기
        const species = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokeDetail.id}`
        ).then((res) => res.json());

        // 한글 이름 찾기
        const koreanNameObj = species.names.find(
          (n) => n.language.name === "ko"
        );
        const koreanName = koreanNameObj ? koreanNameObj.name : pokeDetail.name;

        // 한글 설명 찾기
        const koreanDescObj = species.flavor_text_entries.find(
          (f) => f.language.name === "ko"
        );
        const koreanDesc = koreanDescObj ? koreanDescObj.flavor_text : "";

        // 타입 한글명도 추가로 패치
        const typesWithKorean = await Promise.all(
          pokeDetail.types.map(async (t) => {
            const typeData = await fetch(t.type.url).then((res) => res.json());
            const koType = typeData.names.find((n) => n.language.name === "ko");
            return koType ? koType.name : t.type.name;
          })
        );

        // 한국어 특성(Abilities) 추가
        const abilitiesWithKorean = await Promise.all(
          pokeDetail.abilities.map(async (a) => {
            const abilityData = await fetch(a.ability.url).then((res) =>
              res.json()
            );
            const koAbility = abilityData.names.find(
              (n) => n.language.name === "ko"
            );
            return koAbility ? koAbility.name : a.ability.name;
          })
        );

        return {
          ...pokeDetail,
          koreanName,
          koreanDesc,
          koreanTypes: typesWithKorean,
          koreanAbilities: abilitiesWithKorean,
        };
      })
    );

    setPokemons(detailedPokemons);
    setSearchUser(detailedPokemons);
  };

  useEffect(() => {
    fetchPokemons();
    // eslint-disable-next-line
  }, []);

  // 실시간 검색
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 통합된 검색 함수 - Enter 키와 버튼 클릭 모두 이 함수 사용
  const handleSearch = () => {
    const keyword = searchTerm.trim().toLowerCase();
    if (keyword === "") {
      setSearchUser(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        (isKorean ? pokemon.koreanName : pokemon.name)
          .toLowerCase()
          .includes(keyword)
      );
      setSearchUser(filtered.length > 0 ? filtered : null);
    }
  };

  // Enter 키 이벤트 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 한글/영문 전환 버튼
  const toggleLanguage = () => setIsKorean((prev) => !prev);

  // 검색 상태 초기화 함수 추가
  const resetSearch = () => {
    setSearchTerm("");
    setSearchUser(pokemons); // 모든 포켓몬 다시 표시
  };

  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <Header
          inputRef={inputRef}
          searchTerm={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSearch={handleSearch}
          isKorean={isKorean}
          toggleLanguage={toggleLanguage}
          resetSearch={resetSearch}
        />

        <Routes>
          <Route
            path="/"
            element={
              <main className="main-grid">
                {searchUser === null ? (
                  <div className="search-no-result">존재하지 않습니다 ^^;</div>
                ) : (
                  searchUser.map((pokemon) => (
                    <Pokecard
                      key={pokemon.id}
                      data={pokemon}
                      isKorean={isKorean}
                    />
                  ))
                )}
              </main>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
