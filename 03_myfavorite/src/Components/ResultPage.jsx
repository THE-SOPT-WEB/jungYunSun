import styled from 'styled-components';
import Card from './Card';
import crown from '../img/crown.png';
import GamePage from './GamePage';

function ResultPage({ initGame, winner }) {
  const handleRestartButtonClick = () => {
    initGame();
  }

  return (
    <Wrapper>
      <WinnerIs>대망의 우승자는...!</WinnerIs>
      <CardWrapper>
        <Card name={winner.name} src={winner.src} />
        <Crown src={crown} />
        <ButtonContainer>
          <RestartButton onClick={handleRestartButtonClick}>다시하기</RestartButton>
          <ShareButton>공유하기</ShareButton>
        </ButtonContainer>
      </CardWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b09e99;
`;

const WinnerIs = styled.h1`
  font-size: 3rem;
  text-shadow: 2px 2px 4px gray;
  color: #fee9e1;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 70vh;
  height: 70vh;
`;

const Crown = styled.img`
  position: absolute;
  width: 20vh;
  z-index: 1;
  top: 1vh;
  left: 10vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const RestartButton = styled.button`
  width: 150px;
  height: 70px;
  margin: 10px;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 1.3rem;
  background-color: #feb1b7;
  text-shadow: 2px 2px 4px gray;
  color: #fee9e1;
  cursor: pointer;
`;
const ShareButton = styled.button`
  width: 150px;
  height: 70px;
  margin: 10px;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 1.3rem;
  text-shadow: 2px 2px 4px gray;
  color: white;
  background-color: #a7d676;
  cursor: pointer;
`;

export default ResultPage;
