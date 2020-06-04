import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <div className='App'>
      <Switch>
        {/* <Route path='/sign-in' exact component={SignIn} />
        <Route path='/home' exact component={Home} /> */}
        <Route path='/' exact component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
