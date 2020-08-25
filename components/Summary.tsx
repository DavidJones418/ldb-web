import { useToggleButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';
import { useToggleState } from '@react-stately/toggle';
import { ToggleProps } from '@react-types/checkbox';
import clsx from 'clsx';
import useDistanceToNow from 'hooks/useDistanceToNow';
import { useRef } from 'react';

export default function Summary(
  props: ToggleProps & {
    label: string;
    generatedAt: string | undefined;
    messages: string[];
  }
) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleState = useToggleState(props);
  const toggleButton = useToggleButton(props, toggleState, buttonRef);

  const distanceToNow = useDistanceToNow(props.generatedAt);

  return (
    <div className="relative">
      <div className="pr-8">
        <span className="inline-block font-extrabold">{props.label}</span>{' '}
        <span className="inline-block text-gray-700 text-sm">
          {distanceToNow && <>(updated {distanceToNow})</>}
        </span>
      </div>

      <FocusRing focusRingClass="shadow-outline">
        <button
          className={clsx(
            'absolute top-0 right-0 -my-2 p-2 rounded-full cursor-pointer select-none focus:outline-none',
            {
              'text-blue-700': toggleButton.isPressed,
              'text-blue-500': toggleState.isSelected,
            }
          )}
          hidden={props.messages.length === 0}
          title="Information"
          aria-label="Information"
          ref={buttonRef}
          {...toggleButton.buttonProps}
        >
          <svg
            className="w-5 h-5 m-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </FocusRing>

      <ul className="text-gray-700 text-sm" hidden={!toggleState.isSelected}>
        {props.messages.map((message, index) => (
          <li key={index} className="mt-2 whitespace-pre-line">
            {message
              .replace(/<\/?.*?>/g, '')
              .replace(
                / More (?:information|details) can be found in Latest Travel News\.?/i,
                ''
              )
              .trim()}
          </li>
        ))}
      </ul>
    </div>
  );
}
