import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [link, setLink] = useState();

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}`}
        );
        history.push(`/detail/${data.link._id}`);
        // console.log('data from generate: ', data);
      } catch (err) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            onChange={(event) => setLink(event.target.value)}
            onKeyPress={pressHandler} // Обработка события нажатия клавиши Enter
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
      
    </div>
  );
};
