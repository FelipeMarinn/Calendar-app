import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';


export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm({
        email: 'daniel@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues

    const handleLogin = (e) => {
        e.preventDefault()      
        dispatch( startLogin( email, password ) )
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 m-auto text-center login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                    <Link to='/register' > or register </Link>
                </div>
            </div>
        </div>
    )
}