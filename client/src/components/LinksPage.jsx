import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from './Loader';
import { LinksList } from './LinksList';

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const {token} = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request(
        '/api/link',
        'GET',
        null,
        { Authorization: `Bearer ${token}`}
      );
      // console.log('fetched Links: ', fetched);
      setLinks(fetched);
    } catch (err) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <>
        { !loading && <LinksList links={links} /> }
      </>
    </div>
  );
};
