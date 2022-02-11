import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const LoadingText = styled.div`
text-align:center;
font-size: 2rem;
`;

interface IHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
  isDark:boolean;

}

  
const Chart = ({ coinId, isDark }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),{
      refetchInterval: 1000,
    }
  );
  return (
    <div>
      {isLoading ? (
        <LoadingText>차트 생성중</LoadingText>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
              })),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "light" :"dark"
            },
            chart: {
              type: "candlestick",
              height: 900,
              background: "transparent",
              foreColor: "white" ,
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
