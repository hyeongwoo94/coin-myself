import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Container = styled.div`
max-width:480px;
margin: 0 auto;
padding: 10px;
`;
const Loader = styled.span`
display: block;
text-align: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;
const Title = styled.h1`
  font-size: 2.5em;
`;
const CoinsList = styled.ul`
  
  margin: 0 auto;
  display: grid;
  grid-template-columns: 32% 32% 32% ;
  justify-content: center;
  align-items: center;
  grid-gap: 2%;
  grid-row-gap: 0.5%;
  
`;
const Coin = styled.li`
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 10px;
  text-align: center;
  display: center;
  transition: color 2s ease-in;
  &:hover {
    background-color: #222;
    border-color: ${(props) => props.theme.accentColor};
    
    a{
    color: ${(props) => props.theme.accentColor};
  }
  }
  a {
    display: block;
    transition: color 0.2s ease-in;
    color:${(props) => props.theme.textColor};
  }
`;
const Img =styled.img`
display:inline-block;
width:3em;
margin:2em;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] =useState(true);
  // useEffect(()=>{
  //   (async()=> {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins")
  //     const json = await response.json();
  //     setCoins(json.slice(0,100));
  //     setLoading(false);
  //   })();
  // },[])
  return (
    <Container>
      <Helmet>
        <title>
        모든코인
        </title>
      </Helmet>
      <Header>
        <Title>모든 코인</Title>
      </Header>
      {isLoading ? <Loader>데이터 받아오는 중...</Loader> : <CoinsList>
        {data?.slice(0,100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={{
              pathname : `/${coin.id}`,
              state: { name:coin.name}
            }}> <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                /> </Link>
          </Coin>
        ))}
      </CoinsList>}
    </Container>
  );
};
export default Coins;
