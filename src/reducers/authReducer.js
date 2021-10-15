import { types } from "../types/types";

const initialState = {
    checking: true,
    error: false
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
         
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }  
            
        case types.authLogout:
            return {
                ...state,
                checking: false
            }      
       
        case types.sistemError:
            return {
                ...state,
                error: true,
                checking: false
            }        
        default:
            return state;
    }
}