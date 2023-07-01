import React, { createContext, useContext, useReducer } from 'react'
import { appData, appDataUpdator } from '../Reducers/AppReducer';

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    return (
        <AppContext.Provider value={useReducer(appDataUpdator, appData)}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContextData = () => useContext(AppContext)

