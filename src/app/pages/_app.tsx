import type { AppProps } from 'next/app';
import { UserProvider } from '@/context/user-context';
import '../styles/globals.css'; // Make sure to adjust the path to your global styles

function BarkApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default BarkApp;
