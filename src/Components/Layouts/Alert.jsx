/**
 * @typedef {object} CustomAlertProps
 * @property {string} alertType - type of alert, possilbe values are - success, warn, danger
 * @property {string} alertMessage - message will be shown in alert.
 */

/**
 * CustomAlert can display possible alerts in your app
 * @param {CustomAlertProps} props - the component props
 * @returns {JSX.Element} The rendered component
 */

import { Alert as MaterialAlert } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppContextData } from '../../Context/AppContext';
import { updateAppData } from '../../Reducers/AppReducer';

export function Alert() {

    const [{ accountDeleteError, logOutError }, dispatch] = useAppContextData();

    const errorsList = [
        {
            error:accountDeleteError,
            dispatchType:"setAccountDeleteError",
            dispatchKey:"accountDeleteError",
            dispatchValue:null
        },
        {
            error:logOutError,
            dispatchType:"setLogOutError",
            dispatchKey:"logOutError",
            dispatchValue:null
        }
    ]

    useEffect(() => {
        if (!accountDeleteError && !logOutError) {
            updateAppData(dispatch, "setShowAlert", "showAlert", false);
        }
    }, [accountDeleteError, logOutError, dispatch])


    return (
        <>
            {
                errorsList.map(({error, dispatchType, dispatchKey, dispatchValue}, indx) => {
                    return (
                        error && <MaterialAlert severity="error" onClose={() => { updateAppData(dispatch, dispatchType, dispatchKey, dispatchValue) }} key={`error_${indx}`}>
                            {error}
                        </MaterialAlert>
                    )
                })
            }
        </>
    )
}
