import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Coin from './AllComponents/Coin';
import { CoinProvider } from './ContextAPI/Coincontext';
import Home from './AllComponents/Home';
import Auth from './Auth/Auth';
import { ClerkProvider } from '@clerk/clerk-react';



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY



if (!PUBLISHABLE_KEY) {
  console.error("Clerk: Publishable key is missing. Please check your environment variables.");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/coin/:coinID",
    element: <Coin />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinProvider>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <RouterProvider router={router} />
     </ClerkProvider>    
    </CoinProvider>
  </StrictMode>
);
