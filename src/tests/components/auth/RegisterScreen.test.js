import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Swal from 'sweetalert2'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { RegisterScreen } from '../../../components/auth/RegisterScreen'
import { startRegister } from '../../../actions/auth'


jest.mock('../../../actions/auth', () => ({
    startRegister: jest.fn()
}))
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore( middlewares )

const initState = {}
const store = mockStore( initState )
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
)


describe('RegisterScreen', ()=> {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('se debe de renderizar correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    })

    test('No hay registro si las contraseñas son diferentes', ()=> {
        
        wrapper.find('input[name="password1"]').simulate('change', {
            target: {
                name: 'password1',
                value: '000125'
            }
        })
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( startRegister ).not.toHaveBeenCalled()
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden', 'error')
        
    })

    test('Registro con contraseñas iguales', () => {

        wrapper.find('input[name="password1"]').simulate('change', {
            target: {
                name: 'password1',
                value: '123456'
            }
        })
        wrapper.find('input[name="password2"]').simulate('change', {
            target: {
                name: 'password2',
                value: '123456'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( Swal.fire ).not.toHaveBeenCalled()
        expect( startRegister ).toHaveBeenCalledWith('Andres', 'andres@gmail.com', '123456')
    })

})