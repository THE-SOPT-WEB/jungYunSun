import styled from 'styled-components';

function BeerHouse({ beerHouseInfo }) {
  return (
    <BeerHouseWrapper>
      <BeerHouseName href={beerHouseInfo.place_url}>
        {beerHouseInfo.place_name}
      </BeerHouseName>
      <BeerHouseNumberAndOthers>
        <BeerHouseNumber>{beerHouseInfo.phone}</BeerHouseNumber>
        <BeerHouseOthers>{beerHouseInfo.address_name}</BeerHouseOthers>
      </BeerHouseNumberAndOthers>
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
  box-shadow: 3px 3px 5px gray;
`;

const BeerHouseName = styled.a`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BeerHouseNumberAndOthers = styled.main`
  display: flex;
  align-items: center;
`;

const BeerHouseNumber = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  padding: 4px;
  margin-right: 10px;
`;

const BeerHouseOthers = styled.div``;

export default BeerHouse;
