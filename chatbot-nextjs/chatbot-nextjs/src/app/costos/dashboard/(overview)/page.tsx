'use client';

import dynamic from 'next/dynamic';

const PlataformaCambiosPage = dynamic(() => import('./PlataformaCambios'), {
  ssr: false,
});

export default function Page() {
  return <PlataformaCambiosPage />;
}
