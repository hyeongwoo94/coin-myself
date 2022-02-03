import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrcice } from "./api";

interface PriceProps {
  coinId: string;
}
interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  price_usd: number;
  price_btc: number;
  volume_24h_usd: number;
  market_cap_usd: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  last_updated: number;
}
const LoadingText = styled.div`
text-align:center;
font-size: 2rem;
`;
const Cantainer = styled.div``;
const PriceVeiw = styled.ul`
  border: solid 2px ${(props) => props.theme.textColor};
  border-radius: 10px;
  background-color: #111;
`;
const PriceItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  font-size:1.2rem;
  border-bottom: solid 1px ${(props => props.theme.textColor)};
  color:${(props) => props.theme.textColor};
  &:hover{
    color: ${(props) => props.theme.accentColor};
  }
  `;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<IPrice>(["price", coinId], () =>
    fetchCoinPrcice(coinId),{
      refetchInterval: 100,
    }
  );
  return (
    <div>
      {isLoading ? (
        <LoadingText>가격 측정중</LoadingText>
      ) : (
        <Cantainer>
          <PriceVeiw>
            <PriceItem><span>개당 가격 (USD)</span>{data?.price_usd}</PriceItem>
            <PriceItem><span>개당 가격 (BTC)</span>{data?.price_btc}</PriceItem>
            <PriceItem><span>마지막 업데이트</span>{data?.last_updated}</PriceItem>
            <PriceItem><span>24시간 거래량</span>{data?.volume_24h_usd}</PriceItem>
            <PriceItem><span>총 공급량</span>{data?.max_supply}</PriceItem>
            <PriceItem><span>한시간 전 변동률(%)</span>{data?.percent_change_1h} %</PriceItem>
            <PriceItem><span>24시간 전 변동률(%)</span>{data?.percent_change_24h} %</PriceItem>
            <PriceItem><span>일주일 전 변동률(%)</span>{data?.percent_change_7d} %</PriceItem>
          </PriceVeiw>
        </Cantainer>
      )}
    </div>
  );
};

export default Price;
