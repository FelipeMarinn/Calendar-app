import { types } from "../../types/types"


describe('Types', () => {

    test('Los types deben de ser iguales', () => {

        expect( types ).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventLogout: '[event] clear event',
            eventAddNew: '[event] Add New',
            eventStartAddNew: '[event] Start Add new',
            eventSetActive: '[event] Set Active',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDelected: '[event] Event Delected',
            eventLoaded: '[event] Events loaded',
        
            authCheckingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        
            sistemError: '[backend] Sistem Error',
            
        })

    })
})