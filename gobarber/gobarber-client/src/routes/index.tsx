import React from "react";
import Route from './Route'

import SignIn from '../pages/SingIn'
import SignUp from '../pages/SingUp'
import Dashboard from '../pages/Dashboard'


import {Switch} from 'react-router-dom'

const Routes: React.FC = () => (

  <Switch>
    <Route path='/' exact component ={SignIn} />
    <Route path='/session/SingUp' exact component ={SignUp}  />
    <Route path='/dashboard' exact component ={Dashboard} isPrivate  />
  </Switch>

)

export default Routes;
