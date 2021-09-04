import React from "react";

import SignIn from '../pages/SingIn'
import SignUp from '../pages/SingUp'

import {Switch,Route} from 'react-router-dom'

const Routes: React.FC = () => (

  <Switch>
    <Route path='/' exact component ={SignIn}/>
    <Route path='/session/SingUp' exact component ={SignUp}/>

  </Switch>

)

export default Routes;
