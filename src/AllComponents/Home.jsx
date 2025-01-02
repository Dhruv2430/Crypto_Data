import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { CoinContext } from '@/ContextAPI/Coincontext';
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { coins, Currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [inptDisplay, setInptDisplay] = useState('');

    const handleInput = (e) => {
        setInptDisplay(e.target.value);
        if (e.target.value === "") {
            setDisplayCoin(coins);
        }
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        const filteredCoins = await coins.filter((item) =>
            item.name.toLowerCase().includes(inptDisplay.toLowerCase())
        );
        setDisplayCoin(filteredCoins);
    };

    useEffect(() => {
        setDisplayCoin(coins);
    }, [coins]);

    return (
        <>
            <div className='flex flex-col items-center mt-16'>
                <h1 className='text-7xl'>Largest</h1>
                <h1 className='text-7xl mt-1'>Crypto MarketPlace</h1>
                <p className='mt-6 text-lg'>Welcome to the world's largest cryptocurrency marketplace</p>
            </div>

            <div className='flex items-center justify-center mt-11 gap-5 p-3'>
                <form className='flex gap-5' onSubmit={searchHandler}>
                    <Input
                        className="w-96"
                        placeholder='Enter Crypto Name'
                        onChange={handleInput}
                        value={inptDisplay}
                        list='coinlist'
                    />
                    <datalist id='coinlist'>
                        {coins.map((item, index) => (
                            <option key={index} value={item.name} />
                        ))}
                    </datalist>

                    <Button variant='default' type='submit'>Search</Button>
                </form>
            </div>

            <div className="w-[900px] mx-auto p-6 bg-white">
                <div className="grid grid-cols-6 gap-4 mb-4 text-gray-700 font-medium">
                    <div>#</div>
                    <div>Coin</div>
                    <div>Image</div>
                    <div>Price</div>
                    <div>24H Change</div>
                    <div>Market Cap</div>
                </div>
                <div>
                    {displayCoin.slice(0, 10).map((item, index) => (
                        <Link to={`/coin/${item.id}`} key={item.id}>
                            <div className="grid grid-cols-6 gap-4 py-2 border-t hover:bg-gray-100">
                                <div className="text-gray-700">{item.market_cap_rank}</div>
                                <div className="text-gray-700">{item.name}</div>
                                <div>
                                    <img src={item.image} alt={item.name} className="w-12 h-12" />
                                </div>
                                <div className="text-gray-700">{Currency.symbol}{item.current_price.toFixed(2)}</div>
                                <div className="text-gray-700">{item.price_change_percentage_24h.toFixed(2)}%</div>
                                <div className="text-gray-700">{Currency.symbol}{item.market_cap.toLocaleString()}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
