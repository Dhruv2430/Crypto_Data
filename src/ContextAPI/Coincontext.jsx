import React, { createContext, useState, useEffect } from 'react';

const CoinContext = createContext();

const CoinProvider = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [Currency, setCurrency] = useState({
        Name: "USD",
        symbol: "$"
    });

    const fetchAllCoins = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-1QHm2TLLemyhhfNnbykX9rUi' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency.Name}`, options)
            .then(res => res.json())
            .then(res => setCoins(res))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAllCoins();
    }, [Currency]);

    return (
        <CoinContext.Provider value={{ coins, Currency, setCurrency }}>
            {children}
        </CoinContext.Provider>
    );
};

export { CoinContext, CoinProvider };
