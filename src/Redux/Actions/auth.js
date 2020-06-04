import axios from 'axios';

const setAuth = (userData) => ({
  type: 'SET_AUTH',
  userData,
});

const signUp = (user) => {
  return async (dispatch) => {
    const data = await axios.post('http://localhost:3000/user/register', user);
    return data;
  };
};

const signIn = (userData) => {
  return async (dispatch) => {
    console.log('here');
    const data = await axios.post('http://localhost:3000/user/login', userData);
    console.log(data);
    delete data.data.user.password;
    delete data.data.user.__v;
    dispatch(setAuth({ token: data.data.token, ...data.data.user }));
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    localStorage.setItem('expired', '0');
    return data;
  };
};

export { signIn, setAuth, signUp };
