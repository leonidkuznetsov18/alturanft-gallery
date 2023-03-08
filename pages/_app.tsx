import { useState } from 'react';

import type { AppProps } from 'next/app';
import '../styles/index.css';
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from '@tanstack/react-query';

export default function MyApp({ Component, pageProps }: AppProps) {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
