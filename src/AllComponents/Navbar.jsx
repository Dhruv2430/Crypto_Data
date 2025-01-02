import App from '@/App';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CoinContext } from '@/ContextAPI/Coincontext';
import React, { useContext } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Navbar = () => {

    const {user,isSignedIn,isLoaded} = useUser()

    if(isSignedIn){
        return <Navigate to={'/'}/>
    }

    const { setCurrency } = useContext(CoinContext);

    const HandleCurrency = (e) => {
        switch (e.target.value) {
            case "usd":
                setCurrency({ Name: "usd", symbol: "$" });
                break;
            case "eur":
                setCurrency({ Name: "eur", symbol: "€" });
                break;
            case "inr":
                setCurrency({ Name: "inr", symbol: "₹" });
                break;
            default:
                setCurrency({ Name: "usd", symbol: "$" });
                break;
        }
    };

    return (
        <>
            <div className='shadow-sm flex items-center justify-between p-5'>
                <NavLink to={"/"}>
                <h1 className='text-[25px]'>CoinGecko</h1>
                </NavLink>
                <ul className='flex gap-10'>
                <NavLink to={"/"}>
                    <li>Home</li>
                    </NavLink>
                    <li>Features</li>
                    <li>Pricing</li>
                </ul>
                <div className='flex gap-5'>
                    <Select onValueChange={HandleCurrency}> 
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="inr">INR</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                        </SelectContent>
                    </Select>

                    <Link to={'/auth'}>
                    <Button>Sign up</Button>
                    </Link>
                 
                </div>
            </div>
        </>
    );
};

export default Navbar;
