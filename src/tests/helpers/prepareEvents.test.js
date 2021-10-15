import moment from "moment"
import { prepareEvents } from "../../helpers/prepareEvents"


describe('prepareEvents', () =>{

    test('debe retornar una el nombre de usuario y fecha', () => {

        const user = [ {name: 'usuario1'}, {name: 'usuario2', start: 1000} ]
        const prepare = prepareEvents(user)

        expect( prepare[1].name ).toBe('usuario2')
        expect( prepare[1].start ).toEqual( moment(1000).toDate() )
    })
})