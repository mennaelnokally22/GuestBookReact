import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';

import { setAuth } from './Redux/Actions/auth';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import SentPage from './Pages/SentPage';

function App({ dispatch }) {
  const token = localStorage.getItem('token');
  if (token) {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setAuth({ token, ...user }));
  }
  return (
    <div className='App'>
      <Switch>
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/home' exact component={Home} />
        <Route path='/sent' exact component={SentPage} />
        <Route path='/' exact component={SignUp} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default connect()(App);
