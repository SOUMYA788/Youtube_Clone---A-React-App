import { Link } from "react-router-dom"

const LinkWrapper = ({ children, linkTo, className, ...props }) => {
    return linkTo ? (
        <Link to={linkTo} className={`no-underline ${className}`} {...props}>
            {children}
        </Link>
    ) : (
        <div className={`outline-none border-none ${className}`} {...props}>
            {children}
        </div>
    )
}

export default LinkWrapper