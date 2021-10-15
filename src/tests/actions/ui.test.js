import { uiCloseModal, uiOpenModal } from "../../actions/ui"
import { types } from "../../types/types"


describe('acciones de ui', () => {

    test('deben de funcionar', () => {

        expect( uiOpenModal() ).toEqual({
            type: types.uiOpenModal
        })

        expect( uiCloseModal() ).toEqual({
            type: types.uiCloseModal
        })

    })
})