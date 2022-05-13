import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BeerHouse from './BeerHouse';

const getLocation = (errHandler) => {
  if ('geolocation' in navigator) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude: y, longitude: x },
          } = position;
          resolve({ x, y });
        },
        (e) => {
          alert('HTTPS 연결을 확인해주세요.');
          errHandler && errHandler();
        }
      );
    });
  }

  return { x: 126.8350976, y: 37.617664 };
};

async function 위치가져오기() {
  const result = await getLocation();
  const { x, y } = result;
  return { x, y };
}

async function 내근처맥주집가져오기() {
  const currentLocation = await 위치가져오기();
  const result = await axios.get(
    'https://dapi.kakao.com/v2/local/search/keyword',
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
      },
      params: {
        x: currentLocation.x,
        y: currentLocation.y,
        radius: 1000,
        query: '맥주',
      },
    }
  );
  return result.data.documents;
}

function MainPage() {
  const [nearBeerHouses, setNearBeerHouses] = useState([]);
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);

  async function handleButtonClick() {
    const receivedNearBeerHouse = await 내근처맥주집가져오기();
    checkboxIsChecked
      ? setNearBeerHouses(receivedNearBeerHouse)
      : setNearBeerHouses([]);
  }

  function handleCheckboxChange(e) {
    setCheckboxIsChecked(e.target.checked);
  }

  return (
    <MainWrapper>
      <Title>우리 동네 맥주집</Title>
      <LocationSection>
        <AutoSearch>
          <CurrentLocation>지역 기반으로 검색할게요</CurrentLocation>
          <CheckBox
            type="checkbox"
            checked={checkboxIsChecked}
            onChange={handleCheckboxChange}
          />
        </AutoSearch>
        <ManualSearch>
          <SearchingArea>우리 동네는 여기에요</SearchingArea>
          <InputArea type="text" placeholder="지역을 입력해주세요." />
        </ManualSearch>
        <SearchButton onClick={handleButtonClick}>검색하기</SearchButton>
      </LocationSection>
      <SearchResult>
        {nearBeerHouses.map((nearBeerHouse) => {
          return (
            <BeerHouse
              beerHouseInfo={nearBeerHouse}
              key={nearBeerHouse.place_name}
            />
          );
        })}
      </SearchResult>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  background-color: gray;
  width: 370px; // 임시로 iPhone 12 Pro 기준으로 지정함.
  height: 824px; // 모바일에서 100vw 쓰는 법?ㅠㅠㅠ
  margin: 10px;
  border: 3px solid black;
  border-radius: 20px;
`;

const Title = styled.header`
  font-size: 2rem;
  font-weight: bold;
  padding: 25px 0;
`;

const LocationSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
`;

const CurrentLocation = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 3px;
`;

const AutoSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: block;
`;

const ManualSearch = styled.div`
  margin-bottom: 20px;
`;

const SearchingArea = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputArea = styled.input`
  display: block;
`;

const SearchButton = styled.button`
  width: 120px;
  font-size: 1.2rem;
  padding: 10px;
  border: 2px solid black;
  border-radius: 20px;
`;

const SearchResult = styled.section`
  padding: 20px;
`;

export default MainPage;
