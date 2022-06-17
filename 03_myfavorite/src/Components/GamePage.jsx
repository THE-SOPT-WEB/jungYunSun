import { React, useEffect, useState } from 'react';
import Card from './Card';
import ResultPage from './ResultPage';
import 네오 from '../img/네오.jpg';
import 라이언 from '../img/라이언.jpg';
import 무지 from '../img/무지.jpg';
import 어피치 from '../img/어피치.jpg';
import 제이지 from '../img/제이지.jpg';
import 춘식이 from '../img/춘식이.jpg';
import 튜브 from '../img/튜브.jpg';
import 프로도 from '../img/프로도.jpg';
import vs from '../img/vs.png';
import styled from 'styled-components';

const gameInfo = [
  { name: '네오', src: 네오 },
  { name: '라이언', src: 라이언 },
  { name: '무지', src: 무지 },
  { name: '어피치', src: 어피치 },
  { name: '제이지', src: 제이지 },
  { name: '춘식이', src: 춘식이 },
  { name: '튜브', src: 튜브 },
  { name: '프로도', src: 프로도 },
];

function GamePage() {
  const [leftCharacters, setLeftCharacters] = useState(gameInfo);
  const [winnersInfo, setWinnersInfo] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState(4);
  const [finalWinner, setFinalWinner] = useState({});
  const [roundWinner, setRoundWinner] = useState(null);
  const [isFinal, setIsFinal] = useState(false);

  const goToNextRound = (friend) => {
    if (rounds === 1) {
      setFinalWinner(friend);
      setIsFinal(true);
    }
    setLeftCharacters(leftCharacters.slice(2));
    setWinnersInfo((prev) => [...prev, friend]);
    setCurrentRound((prev) => prev + 1);
    setRoundWinner(null);
  }

  const handleCardClick = (friend) => {
    setRoundWinner(friend);
    setTimeout(() => goToNextRound(friend), 500);
  }

  useEffect(() => {
    if (leftCharacters.length === 0) {
      setLeftCharacters(winnersInfo);
      setWinnersInfo([]);
      setCurrentRound(1);
      setRounds((prev) => prev / 2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftCharacters]);

  const initGame = () => {
    setLeftCharacters(gameInfo.sort(() => (Math.random() - 0.5)));
    setWinnersInfo([]);
    setCurrentRound(1);
    setRounds(4);
    setFinalWinner({});
  }

  if (rounds === 0.5) {
    return <ResultPage initGame={initGame} finalWinner={finalWinner} isFinal={isFinal} />;
  }

  return (
    <GameWrapper>
      <WorldcupName>최고 귀여운 카카오프렌즈 월드컵</WorldcupName>
      <RoundName>
        Round: {currentRound}/{rounds}
      </RoundName>
      <CardWrapper>
        {leftCharacters.map((friend, index) => {
          if (index < 2) {
            return (
              <Card
                key={friend.name}
                name={friend.name}
                src={friend.src}
                onClick={() => {
                  handleCardClick(friend);
                }}
                roundWinner={roundWinner}
              />
            );
          }
          return null;
        })}
        <VS src={vs} roundWinner={roundWinner}/>
      </CardWrapper>
    </GameWrapper>
  );
}

export default GamePage;

const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b09e99;
`;

const WorldcupName = styled.h1`
  font-size: 3rem;
  text-shadow: 2px 2px 4px gray;
  margin-bottom: 0;
  color: #fee9e1;
`;

const RoundName = styled.h2`
  font-size: 2rem;
  text-shadow: 2px 2px 4px gray;
  color: #fad4c0;
`;

const CardWrapper = styled.div`
  display: flex;
  position: relative;
`;

const VS = styled.img`
  width: ${props => props.roundWinner? '0' : '30vh'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
