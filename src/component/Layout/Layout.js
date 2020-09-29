import React from "react";
import classes from './Layout.module.scss'

export const Layout = ({children}) => {
    return (
        <div className={classes.Layout}>
            <main>
                {children}
            </main>
        </div>
    )
}