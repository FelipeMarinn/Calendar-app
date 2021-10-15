import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'
import { startLogin, startRegister, startChecking, startLogout } from '../../actions/auth'
import { types } from '../../types/types'
import * as fetchModule from '../../helpers/fetch'


Storage.prototype.setItem = jest.fn() // mock del localStorage

jest.mock('sweetalert2',() => ({ // mock del Swal
    fire: jest.fn() // mock funcion fire de Swal
}))

const middlewares = [thunk]
const mockStore = configureStore( middlewares )

const initState = {}
let store = mockStore( initState )

describe('acciones de auth', () => {

    beforeEach(() => {
        store = mockStore( initState )
        jest.clearAllMocks()
    })

    test('startLogin correcto', async() => {

        await store.dispatch( startLogin('test@gmail.com', '123456') )
        const actions = store.getActions()

        expect( actions[0] ).toMatchObject({
            type: types.authLogin,
            payload: {
                uid: '616718e56d78bd26b74cbbf8',
                name: expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))

        // token = localStorage.setItem.mock.calls[0][1]
    })

    test('startLogin incorrecto', async() => {

        await store.dispatch( startLogin('test@gmail.com', 'contraseñaErronea') )
        let actions = store.getActions()

        expect( actions ).toEqual([])
        expect( Swal.fire ).toHaveBeenCalledWith( 'Error', 'Password incorrecto', 'error')

        await store.dispatch( startLogin('mailIncorrecto@gmail.com', '123456') )
        actions = store.getActions()

        expect( Swal.fire ).toHaveBeenCalledWith( 'Error', 'No existe un usuario con ese email', 'error')
    })

    test('startRegister correcto', async() => {

        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return  {
                    ok: true,
                    uid: '123',
                    name: 'test3',
                    token: 'ABC123ABC123'
                }
            }
        }))

        await store.dispatch( startRegister('test2@gmail.com', '123456', 'test') )
        const actions = store.getActions()

        expect( actions[0] ).toMatchObject({
            type: types.authLogin, 
            payload: { 
                uid: '123', 
                name: 'test3' 
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token','ABC123ABC123')
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))
      
    })

    test('startChecking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return  {
                    ok: true,
                    uid: '123',
                    name: 'test3',
                    token: 'ABC123ABC123'
                }
            }
        }))

        await store.dispatch( startChecking() )
        const actions = store.getActions()

        expect( actions[0] ).toMatchObject({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'test3'
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123')
      
    })

    test('startLogout es correcto', async() => {

        Storage.prototype.clear = jest.fn()

        await store.dispatch( startLogout() )
        const actions = store.getActions()

        expect( actions[0] ).toEqual({ type: types.authLogout })
        expect( actions[1] ).toEqual({ type: types.eventLogout })
   
        expect( localStorage.clear ).toHaveBeenCalled()

    })
    
})