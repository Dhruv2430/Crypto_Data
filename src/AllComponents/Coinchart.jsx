import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '@/ContextAPI/Coincontext';
import Chart from 'react-google-charts';

const Coinchart = () => {
  const { coinID } = useParams();
  const { Currency } = useContext(CoinContext);
  const [chart, setChart] = useState(null);
  const [ChartData, setChartData] = useState([["Date", "Prices"]]);

  
  const handleApichart = () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-1QHm2TLLemyhhfNnbykX9rUi' },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${Currency.Name.toLowerCase()}&days=10`, options)
      .then((res) => res.json())
      .then((res) => {
        setChart(res); 
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleApichart(); 
  }, [coinID, Currency.Name]);

  useEffect(() => {
    if (chart && chart.prices) {
   
      const datacopy = [["Date", "Prices"]];
      chart.prices.forEach((item) => {
        datacopy.push([new Date(item[0]).toLocaleDateString(), item[1]]);
      });
      setChartData(datacopy); 
    }
  }, [chart]); 

  return (
    <div className="chart-container">
      {chart ? (
        <Chart 
          chartType="LineChart"
          data={ChartData}
          height="300px"
          width="500px"
          legendToggle
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Coinchart;
