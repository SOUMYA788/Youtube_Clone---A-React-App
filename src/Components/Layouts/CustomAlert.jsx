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

import { CloseRounded } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export function CustomAlert({ alertType, alertMessage }) {
    const alertSuccess = alertType.toLowerCase() === "success" ? "green" : null
    const alertWarn = alertType.toLowerCase() === "warn" ? "yellow" : null
    const alertDanger = alertType.toLowerCase() === "danger" ? "red" : null
    const alertBackground = alertSuccess || alertWarn || alertDanger;
    return (
        <Box sx={{ width: "100%", padding: "5px", background: alertBackground, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between" }}>
            <Typography component="p" variant='p'>{alertMessage}</Typography>
            <CloseRounded sx={{cursor:"pointer"}}/>
        </Box>
    )
}
