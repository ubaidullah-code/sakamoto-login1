import React, { createContext, useReducer } from 'react';
import { reducer, Idreducer } from './Reducer'; // ✅ Import Idreducer

export const GlobalContext = createContext("Initial Value");

let data = {
    user: {},
    isLogin: null
};
let idStored = {
    idUser: ""
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);
    const [stateId, dispatchId] = useReducer(Idreducer, idStored); // ✅ Now Idreducer is recognized

    return (
        <GlobalContext.Provider value={{ state, dispatch, stateId, dispatchId }}>
            {children}
        </GlobalContext.Provider>
    );
}
