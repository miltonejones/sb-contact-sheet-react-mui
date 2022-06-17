import React from 'react';
/**
 * * exposes clipboard copy method to components
 * @returns copy method and copied state
 */
 export default function useClipboard() {
  const [copied, setCopied] = React.useState(false);
  const copy = (datum) => {
    navigator.clipboard
      // * save data to clipboard
      .writeText(datum)
      .then(() => {
        // * add clipboard data to copied state
        setCopied(datum);
        // * clear copied state after pause for various coolness
        setTimeout(() => setCopied(false), 299);
      })
      .catch(console.warn);
  };
  // return method and state
  return { copy, copied };
}
