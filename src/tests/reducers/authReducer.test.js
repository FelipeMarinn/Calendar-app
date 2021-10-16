import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"


const initState = {
    checking: true,
    error: false
}

describe('authReducer', () => {

    test('debe de retornar el estado por defecto', ()=> {

        const state = authReducer( initState, {} )
        expect( state ).toEqual( initState )

    })

    test('debe de autenticar el usuario', ()=> {

        const action = {
            type: types.authLogin,
            payload: {
                uid: '12345ds',
                name: 'juan'
            }
        }
        const state = authReducer( initState, action )

        expect( state ).toEqual({
            ...initState,
            checking: false,
            uid: '12345ds',
            name: 'juan'
        })
    })

    test('debe de cambiar checking a false', ()=> {

        const action = { type: types.authLogout }
        const state = authReducer( initState, action )

        expect( state ).toEqual({ checking: false, error: false })
    })

    test('error debe de ser true y checking false', ()=> {

        const action = { type: types.sistemError }
        const state = authReducer( initState, action )

        expect( state ).toEqual({ ...state, checking: false, error: true })
    })

})