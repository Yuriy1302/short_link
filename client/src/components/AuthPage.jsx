import React, { useState, useContext } from 'react';

import { useHttp } from '../hooks/http.hook';

import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const {request, loading, /* error */} = useHttp(); // error вывести потом в toast
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      // toast
      console.log('data: ', data);
    } catch(err) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      // toast
      //console.log('data: ', data);
      auth.login(data.token, data.userId);
    } catch(err) {}
  }

  return (
    <div>
      <div className="row">
        <div className="col s6 offset-s3">
          <h1>Сократи ссылку</h1>
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Авторизация</span>
              <div>

                <div className="input-field">
                  <input
                    placeholder="Введите email"
                    id="email"
                    type="text"
                    name="email"
                    className="yellow-input"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите пароль"
                    id="password"
                    type="password"
                    name="password"
                    className="yellow-input"
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">Пароль</label>
                </div>

              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: '10px' }}
                disabled={loading}
                onClick={loginHandler}
              >Войти</button>
              <button
                className="btn grey lighten-1 black-text"
                disabled={loading}
                onClick={registerHandler}
              >Регистрация</button>
            </div>
          </div>
            </div>
      </div>
    </div>
  );
};