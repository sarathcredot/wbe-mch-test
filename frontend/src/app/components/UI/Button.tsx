

import React from 'react'

function Button({
    children,
    classname,
    onClick
}: { children: React.ReactNode, classname: string, onClick?: () => void }) {
    return (

        <button className={classname} onClick={onClick}>
            {children}
        </button>

    )
}

export default Button