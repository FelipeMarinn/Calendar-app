import { fetchConToken, fetchSinToken } from "../../helpers/fetch"


describe('helper Fetch', () => {

    let token = ''

    test('fetchSinToken debe de funcionar', async() => {

        const resp = await fetchSinToken('auth', {email: 'test@gmail.com', password: '123456'}, 'POST')
        expect( resp instanceof Response ).toBe( true ) // Instancia de response = se igual tipo response
         
        const body = await resp.json()
        expect( body.ok ).toBe( true )

        token = body.token
    })

    test('fetchConToken debe de funcionar', async() => {

        localStorage.setItem('token', token)

        const resp = await fetchConToken('events', {}, 'GET')
        const body = await resp.json()

        expect( body.ok ).toBe( true )
        expect( typeof body.events ).toBe( 'object' )
      
    })

})