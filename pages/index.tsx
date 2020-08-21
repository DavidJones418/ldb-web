import clsx from 'clsx';
import ErrorBoundary from 'components/error-boundary';
import PoweredByNationalRailEnquiries from 'components/logos/powered-by-national-rail-enquiries';
import SearchBox from 'components/search-box';
import { encodeName } from 'models/station';
import Head from 'next/head';
import React, { useState } from 'react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-2">
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main
        className={clsx('flex flex-col justify-center', {
          'm-auto': searchTerm === '',
        })}
      >
        <h1
          className={clsx('text-4xl text-center font-marker pb-4', {
            hidden: searchTerm !== '',
          })}
        >
          Unofficial National Rail Live Departure Boards
        </h1>

        <div className="flex flex-col justify-center items-center">
          <ErrorBoundary>
            <SearchBox
              label="Station Name"
              initialValue=""
              href="/stations/[name]"
              asPathFn={(value) => `/stations/${encodeName(value)}`}
              onChange={(event) => {
                setSearchTerm(event.currentTarget.value);
              }}
            />
          </ErrorBoundary>
        </div>
      </main>

      <footer>
        <PoweredByNationalRailEnquiries />
      </footer>
    </div>
  );
}
