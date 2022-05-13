import styled from 'styled-components';

function BeerHouse({ beerHouseInfo }) {
  return (
    <BeerHouseWrapper>
      <BeerHouseName>{beerHouseInfo.place_name}</BeerHouseName>
      <BeerHouseNumberAndAddress>
        <BeerHouseNumber>{beerHouseInfo.phone}</BeerHouseNumber>
        <BeerHouseAddress>{beerHouseInfo.address_name}</BeerHouseAddress>
      </BeerHouseNumberAndAddress>
    </BeerHouseWrapper>
  );
}

const BeerHouseWrapper = styled.article`
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const BeerHouseName = styled.header`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BeerHouseNumberAndAddress = styled.main`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const BeerHouseNumber = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  padding: 4px;
`;

const BeerHouseAddress = styled.div``;

export default BeerHouse;
