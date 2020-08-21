// Icons from https://heroicons.dev/

import clsx from 'clsx';
import useStationSuggestions from 'hooks/use-station-suggestions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const inputId = 'search-box-input'; // Assumes that this component is only rendered once per page.

function selectNext<T>(x: T | undefined, xs: T[]): T | undefined {
  return xs[xs.indexOf(x as T) + 1] || xs[0];
}
function selectPrevious<T>(x: T | undefined, xs: T[]): T | undefined {
  return xs[xs.indexOf(x as T) - 1] || xs[xs.length - 1];
}

export default function SearchBox(props: {
  className?: string;
  label: string;
  initialValue: string;
  href: string;
  asPathFn: (value: string) => string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState(props.initialValue);
  const suggestions = useStationSuggestions(searchTerm);
  const [selected, setSelected] = useState<string | undefined>(suggestions[0]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!selected || !suggestions.includes(selected)) {
      setSelected(suggestions[0]);
    }
  }, [selected, suggestions]);

  return (
    <div
      className={props.className}
      onFocus={() => setShowSuggestions(true)}
      onBlur={(event) => {
        setShowSuggestions(
          event.currentTarget.contains(event.relatedTarget as Node | null)
        );
      }}
    >
      <div className="relative">
        <form
          className="relative border-2 focus-within:border-blue-600 rounded-lg p-2 bg-white"
          onSubmit={(event) => {
            if (selected) {
              router.push(props.href, props.asPathFn(selected));
            }
            event.preventDefault();
          }}
        >
          <label
            className="absolute inset-y-0 flex items-center opacity-50"
            htmlFor={inputRef.current?.id}
          >
            <svg
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span className="sr-only">{props.label}</span>
          </label>
          <input
            className="appearance-none w-full px-8 text-2xl font-casual focus:outline-none"
            ref={inputRef}
            id={inputId}
            value={searchTerm}
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            placeholder={props.label}
            onChange={(event) => {
              props.onChange?.(event);
              setSearchTerm(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                setSelected((s) => selectNext(s, suggestions));
                event.preventDefault();
              } else if (event.key === 'ArrowUp') {
                setSelected((s) => selectPrevious(s, suggestions));
                event.preventDefault();
              }
            }}
          />
        </form>
        {searchTerm !== '' && (
          <button
            className={clsx(
              'absolute z-10 inset-y-0 right-0 m-2 px-1 group flex items-center justify-center bg-white hover:text-red-600 focus:outline-none focus:text-red-600'
            )}
            onClick={(event) => {
              event.preventDefault();
              setSearchTerm('');
              inputRef.current?.focus();
            }}
          >
            <span className="hidden group-hover:block group-focus:block">
              clear
            </span>
            <svg width={20} height={20} fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        )}

        <ul
          className="absolute z-10 inset-x-0 mt-2 py-2 rounded-lg border bg-white shadow"
          hidden={!showSuggestions || suggestions.length === 0}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className={clsx('px-2 flex', {
                'bg-blue-600 text-white': selected === suggestion,
              })}
              onMouseEnter={() => {
                setSelected(suggestion);
              }}
              onFocus={() => {
                setSelected(suggestion);
              }}
            >
              <div className="flex pl-2 py-2 opacity-50">
                <svg
                  width={24}
                  height={24}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <Link href={props.href} as={props.asPathFn(suggestion)}>
                <a className="w-full pl-2 focus:outline-none flex items-center">
                  <span>{suggestion}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
