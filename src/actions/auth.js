import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"
import Swal from 'sweetalert2'
import { eventLogout } from "./events"


export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' )
        const body = await resp.json()
        
        if ( body.ok ) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = (  name, email, password ) => {
    return async( dispatch ) => {
        
        const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST' )
        const body = await resp.json()
        
        if ( body.ok ) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}

export const startChecking = () => {
    return async( dispatch ) => {

        try {
            const resp = await fetchConToken( 'auth/renew' )
            const body = await resp.json()
    
            if ( body.ok ) {
                localStorage.setItem('token', body.token)
                localStorage.setItem('token-init-date', new Date().getTime())
                
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }) )
            } else {
                dispatch( checkingFinish() )
            }
        }  catch (err) {
            console.log('Error:', err )
            dispatch( sistemError() )
        }

    }
}

const sistemError = () => ({ type: types.sistemError })
 
const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear()
        dispatch( logout() )
        dispatch( eventLogout() )

    }
}

const logout = () => ({ type: types.authLogout })


