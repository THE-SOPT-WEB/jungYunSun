import styled from 'styled-components';

function Card({ name, src, onClick }) {
  return (
    <CardWrapper onClick={onClick}>
      <CardImage src={src} alt={name} />
      <CardName>{name}</CardName>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 70vh;
  height: 70vh;
  display: inline-block;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CardName = styled.div`
  width: 100%;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  color: white;
  position: absolute;
  z-index: 1;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Card;
