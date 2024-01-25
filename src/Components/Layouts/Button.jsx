import React from 'react'

const Button = ({ type = "button", className = "", children, ...props }) => {
    return (
        <button type={type} className={`outline-none ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button