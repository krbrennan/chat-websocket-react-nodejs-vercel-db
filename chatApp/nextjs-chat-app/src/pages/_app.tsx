import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// stylesheet
import "../styles/global.css";



function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);


    // const handleLoginToggle= () => {
    //     setIsLoggedIn(!isLoggedIn);
    // }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} />
            <Component {...pageProps} setIsLoggedIn={ setIsLoggedIn } />
        </>
    );
}

// onLoginToggle={handleLoginToggle}

export default MyApp;

/**
 * This is the main entry point for the Next.js application.
 *
 * The `MyApp` component is the top-level component that wraps the entire app.
 * It receives the `Component` and `pageProps` props from Next.js, which are:
 *
 * - `Component`: The component that is being rendered on this particular page.
 *   This is determined by the Next.js routing system.
 * - `pageProps`: An object containing the props that were passed to the page
 *   component by the Next.js server.
 *
 * The `MyApp` component simply renders the `Component` with the `pageProps`
 * passed as props.
 *
 * The `export default MyApp` statement makes this component available to other
 * parts of the app.
 */
