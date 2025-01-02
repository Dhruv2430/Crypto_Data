import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '@/ContextAPI/Coincontext';
import Navbar from './Navbar';
import Footer from './Footer';
import Coinchart from './Coinchart';

const CoinData = () => {
  const { coinID } = useParams();  
  const { Currency } = useContext(CoinContext); 
  const [coinData, setCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-1QHm2TLLemyhhfNnbykX9rUi',
      },
    };

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    if (coinID) {
      fetchCoinData();
    }
  }, [coinID, Currency]);  

  
  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
   <>
   
    <Navbar/>

    <div className="coin-data-container max-w-4xl mx-auto px-4 py-8  h-screen flex flex-col items-center justify-center">
  
  <Coinchart/>

  {coinData?.image?.large && (
    <img
      src={coinData.image.large}
      alt={coinData.name}
      className="w-24 h-24 object-contain mb-6"
    />
  )}

  <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">{coinData?.name}</h1>

  <p className="text-xl text-center text-gray-700 mb-2">
    <span className="font-semibold">Symbol:</span> {coinData?.symbol?.toUpperCase()}
  </p>

  <p className="text-xl text-center text-gray-700 mb-2">
    <span className="font-semibold">Market Cap Rank:</span> {coinData?.market_cap_rank || 'N/A'}
  </p>

  <p className="text-xl text-center text-gray-700 mb-6">
    <span className="font-semibold">Current Price ({Currency.Name}):</span>{' '}
    {coinData?.market_data?.current_price[Currency.Name.toLowerCase()]
      ? `${Currency.symbol}${coinData.market_data.current_price[Currency.Name.toLowerCase()]}`
      : 'N/A'}
  </p>

  <p className="text-lg text-center text-gray-700">
    {coinData?.description?.en?.slice(0, 400) || 'No description available.'}
  </p> 
</div>



    <Footer/>
    </>
  );
};

export default CoinData;
