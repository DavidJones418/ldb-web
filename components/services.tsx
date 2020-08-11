import RouteInfo from 'components/route-info';
import ScheduleInfo from 'components/schedule-info';
import { formatDistanceToNow, parseISO } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import castArray from 'lodash/castArray';
import { encodeName } from 'models/station';
import Head from 'next/head';
import useSWR from 'swr';

type OneOrMany<T> = T | T[];

export interface Service {
  serviceID: string;
  origin: { locationName: string };
  destination: OneOrMany<{ locationName: string; via?: string }>;
  operator: string;
  sta?: string;
  eta?: string;
  std?: string;
  etd?: string;
  platform?: string;
  isCancelled?: boolean;
  delayReason?: string;
  cancelReason?: string;
}

function useLiveServices(locationName: string) {
  const { data, error } = useSWR<{
    locationName: string;
    generatedAt: string;
    nrccMessages?: OneOrMany<string>;
    platformAvailable?: boolean;
    trainServices?: OneOrMany<Service>;
  }>(`/api/stations/${encodeName(locationName)}?numRows=20`, {
    refreshInterval: 25000,
  });

  return { services: data, error };
}

function useDistanceToNow(isoDateString?: string) {
  const { data } = useSWR([isoDateString, formatDistanceToNow], {
    fetcher(key) {
      return formatDistanceToNow(parseISO(key), {
        locale: enGB,
        addSuffix: true,
      });
    },
    refreshInterval: 1000,
  });

  return data;
}

function Messages(props: { value: OneOrMany<string> }) {
  return (
    <details className="rounded border focus-within:shadow-outline transition-shadow duration-75">
      <summary className="p-2 cursor-pointer font-marker rounded focus:outline-none">
        Messages
      </summary>
      <ul className="p-2 font-casual space-y-2 border-t">
        {castArray(props.value).map((message, index) => (
          <li key={`${index}-${message}`} className="whitespace-pre-line">
            {message.replace(/<\/?.*?>/g, '')}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Services(props: { locationName: string }): JSX.Element {
  const { services, error } = useLiveServices(props.locationName);
  const distanceToNow = useDistanceToNow(services?.generatedAt);

  if (error?.code === 404) {
    return (
      <div className="font-marker">
        <Head>
          <title>Not Found</title>
        </Head>
        Not Found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <span className="font-marker">
        {distanceToNow ? `Updated ${distanceToNow}` : `Loading...`}
      </span>
      {services?.nrccMessages && <Messages value={services.nrccMessages} />}
      <ul className="flex flex-col">
        {services?.trainServices &&
          castArray(services.trainServices).map((service) => (
            <li
              key={service.serviceID}
              className="py-2 border-t flex items-start space-x-4"
            >
              <ScheduleInfo
                className="w-40"
                {...service}
                platformAvailable={services.platformAvailable}
              />
              <RouteInfo
                className="w-full"
                currentLocationName={props.locationName}
                {...service}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}