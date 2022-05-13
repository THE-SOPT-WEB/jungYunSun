import styled from 'styled-components';

function handleButtonClick() {}

function MainPage() {
  return (
    <MainWrapper>
      <Title>우리 동네 맥주집</Title>
      <LocationSection>
        <AutoSearch>
          <CurrentLocation>지역 기반으로 검색할게요</CurrentLocation>
          <CheckBox type="checkbox" />
        </AutoSearch>
        <ManualSearch>
          <div>우리 동네는 여기에요</div>
          <input type="text" placeholder="지역을 입력해주세요."></input>
          <button onClick={handleButtonClick}>검색하기</button>
        </ManualSearch>
        <SearchResult></SearchResult>
      </LocationSection>
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

const ManualSearch = styled.div``;

const SearchResult = styled.section``;

export default MainPage;
