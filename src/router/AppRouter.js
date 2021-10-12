import React, { useEffect } from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { ErrorScreen } from '../components/ui/ErrorScreen';


export const AppRouter = () => {

    const dispatch = useDispatch()
    const { checking, uid, error } = useSelector(state => state.auth)

    useEffect(() => {
        
      dispatch( startChecking() )

    }, [ dispatch ])


    if ( checking ) {

        return <h5> Espere ... </h5>

    } else if ( error ) {
      return (

        <ErrorScreen />

      ) 
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                      exact 
                      path='/login' 
                      component={ LoginScreen }
                      isAutenticated={ !!uid }/>

                    <PublicRoute
                      exact 
                      path='/register' 
                      component={ RegisterScreen }
                      isAutenticated={ !!uid }/>

                    <PrivateRoute 
                      exact 
                      path='/' 
                      component={ CalendarScreen }
                      isAutenticated={ !!uid }/>

                    <Redirect to='/'/>
                
                </Switch>
            </div>
        </Router>
    )
}
