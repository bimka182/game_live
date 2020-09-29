import React, {useContext} from "react";
import classes from './LiveEnvironment.module.scss'
import {ContentContext} from "../../context/content/contentContext";
import {LiveEnvironmentCell} from '../LiveEnvironmentCell/LiveEnvironmentCell'

export const LiveEnvironment = () => {
    const {onCellClickHandler, content} = useContext(ContentContext)
    const liveEnvironment = content.liveEnvironment
    const cls = [classes.LiveEnvironment]

    if (content.appstatus === 'init') {
        cls.push(classes.invisible)
    }
    else if (content.appstatus === 'pre_infect') {
        cls.push(classes.inactive)
    }
    else if(content.appstatus === 'live' || content.appstatus === 'finish'){
        cls.push(classes.live)
    }

    const cells = liveEnvironment.map((arrx, x) => {
        return arrx.map((value, y) => {
            return <LiveEnvironmentCell
                key={`${x}_${y}`}
                x={x}
                y={y}
                isinfect={value.toString()}
                onClick={e => {
                    onCellClickHandler(x, y)
                }}
            />
        })
    })

    const styles = {
        gridTemplate: `repeat(${liveEnvironment.length}, 1fr)/repeat(${liveEnvironment.length}, 1fr)`
    }


    return (
        <div
            className={cls.join(' ')}
            style={styles}
        >
            {cells}
        </div>
    )
}