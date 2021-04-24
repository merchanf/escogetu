import { useEffect } from 'react';

export function useMount(callback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}
