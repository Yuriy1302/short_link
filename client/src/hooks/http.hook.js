import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);

    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      //console.log('in hook: ', {method, body, headers: headers})

      const response = await fetch(url, {method, body, headers});
      //console.log('res in http.hook: ', await response.json());
      const data = await response.json();

      

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }

      setLoading(false);
      return data;
    } catch (err) {
      console.log('OOPS!: ', err);
      setLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = () => setError(null);

  return { loading, request, error, clearError};
};
