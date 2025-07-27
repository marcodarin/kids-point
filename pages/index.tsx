import Head from 'next/head';
import AuthWrapper from '../components/AuthWrapper';
import KidsPointsTracker from '../components/KidsPointsTracker';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kids Points Tracker - Gestisci i punti dei tuoi bambini</title>
        <meta name="description" content="Webapp per tracciare i punti comportamentali dei bambini" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kids Points" />
      </Head>
      
      <AuthWrapper>
        <KidsPointsTracker />
      </AuthWrapper>
    </>
  );
} 