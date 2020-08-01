import Head from 'next/head';
import StationSearch from 'components/station-search';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Unofficial National Rail Live Departure Boards</title>
      </Head>

      <main className="p-4 m-auto container">
        <h1 className="text-4xl text-center">
          Unofficial National Rail Live Departure Boards
        </h1>

        <StationSearch />
      </main>
    </div>
  );
}
