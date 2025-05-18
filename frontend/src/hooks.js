import { useState, useEffect, useCallback } from 'react';

import { baseUrl } from './config';

const mkUrl = (endpoint) => `${baseUrl}/${endpoint}`;

export function useFetch(url, options = {}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(mkUrl(url), options);
      if (!resp.ok) setError(`Error: ${resp.statusText}`);
      const parsed = await resp.json();
      setData(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
}

export function useDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch(mkUrl(url), {
        method: 'DELETE',
        ...options,
      });
      if (!resp.ok) setError(`Error: ${resp.statusText}`);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteData, loading, error };
}

export function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch(mkUrl(url), {
        method: 'POST',
        ...options,
      });
      if (!resp.ok) setError(`Error: ${resp.statusText}`);
      const data = await resp.json();
      return data;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, error };
}
