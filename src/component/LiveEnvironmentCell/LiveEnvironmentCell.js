import React from "react";
import classes from './LiveEnvironmentCell.module.scss'

export const LiveEnvironmentCell = ({x, y, onClick, isinfect}) => {

    const cls = [classes.LiveEnvironmentCell]
    if (Number(isinfect) === 1) {
        cls.push(classes.infect)
    } else {
        cls.push(classes.live)
    }

    return (
        <div
            className={cls.join(' ')}
            onClick={onClick}
            datax={x}
            datay={y}
            isinfect={isinfect}
          >
        </div>
    )
}