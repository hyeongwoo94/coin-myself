import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 10px;
`;
const Loader = styled.span`
  display: block;
  text-align: center;
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
const List = styled.div`
  text-align: right;
  margin: 10px auto;
  a {
    color: ${(props) => props.theme.textColor};
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const View = styled.div`
  border: solid 3px ${(props) => props.theme.textColor};
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgColor};
`;
const ViewItem = styled.ul`
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const ViewText = styled.li`
  text-align: center;
`;
const ViewP = styled.p`
  margin-top: 10px;
  font-size: 1.5em;
`;
const Description = styled.div`
  margin: 15px auto;
  padding: 0 10px;
  line-height: 30px;
`;
const Tabs = styled.div`
  margin-top: 20px;
  direction: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  border: solid 3px ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  width: 100%;
  text-align: center;
  display: inline-block;
  color: ${(props) => props.theme.textColor};
  font-size: 1.25rem;
  line-height: 30px;
  margin-bottom: 20px;
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const BouttonMode = styled.button`
  display: inline-block;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 2px;
  text-align: right;
  border: solid 1px ${(props) => props.theme.textColor};
  padding: 3px 5px;
  position: absolute;
  right: 5px;
  top: 10px;

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: black;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface ICoinProps {}
const Coin = ({}: ICoinProps) => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceInfo>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : loading
            ? "데이터 받아오는 중..."
            : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : loading
            ? "데이터 받아오는 중..."
            : infoData?.name}
        </Title>
        <BouttonMode onClick={toggleDarkAtom}>모드변경</BouttonMode>
      </Header>
      <List>
        <Link to="/">뒤로가기</Link>
      </List>
      {loading ? (
        <Loader>데이터 받아오는 중...</Loader>
      ) : (
        <>
          <View>
            <ViewItem>
              <ViewText>
                가격 <ViewP>{tickersData?.quotes.USD.price.toFixed(2)}</ViewP>
              </ViewText>
              <ViewText>
                순위 <ViewP>{infoData?.rank}</ViewP>
              </ViewText>
              <ViewText>
                심볼 <ViewP>{infoData?.symbol}</ViewP>
              </ViewText>
            </ViewItem>
          </View>
          <Description>{infoData?.description}</Description>
          <View>
            <ViewItem>
              <ViewText>
                첫 시장 가격 <ViewP>{tickersData?.first_data_at}</ViewP>
              </ViewText>
              <ViewText>
                마지막 업데이트 날짜 <ViewP>{tickersData?.last_updated}</ViewP>
              </ViewText>
            </ViewItem>
          </View>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>차트</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>가격</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};
export default Coin;
