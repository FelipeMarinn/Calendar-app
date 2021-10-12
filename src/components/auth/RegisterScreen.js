import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { startRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'


export const RegisterScreen = () => {
    
    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm({
        name: 'Andres',
        email: 'andres@gmail.com',
        password1: '123456',
        password2: '123456'
    });

    const { name, email, password1, password2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()    
        
        if ( password1 !== password2 ) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
        }
        
        dispatch( startRegister( name, email, password1 ) )
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 text-center m-auto login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='name'
                                value={ name }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='email'
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='password1'
                                value={ password1 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='password2'
                                value={ password2 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                    <Link to='/login' className='text-white'> Sign in </Link>
                </div>
            </div>
        </div>
    )
}
