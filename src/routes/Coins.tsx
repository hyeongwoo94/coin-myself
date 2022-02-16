import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { darkTheme, lightTheme } from "../theme";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
max-width:480px;
margin: 0 auto;
padding: 10px;
`;
const Loader = styled.span`
display: block;
text-align: center;
`;
const BouttonMode = styled.button`
display: inline-block;
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.textColor};
border-radius: 2px;
text-align: right;
border:solid 1px ${(props) => props.theme.textColor};
padding: 3px 5px;
position: absolute;
right: 5px;
top: 10px;


&:hover{
  background-color: ${(props)=>props.theme.accentColor};
  color: black;
}
`;
const Header = styled.header`
  position: relative;
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
interface ICoinsProps{
  
}
const Coins = ({}:ICoinsProps) => {
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
  return (
    <Container>
      <Helmet>
        <title>
        모든코인
        </title>
      </Helmet>
    
      <Header>
        <Title>모든 코인</Title>
        <BouttonMode onClick={toggleDarkAtom}>모드변경</BouttonMode>
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
