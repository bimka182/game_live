import React, {useContext} from "react";
import classes from './Header.module.scss'
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import {ContentContext} from "../../context/content/contentContext";


export const Header = () => {
    const {mainButtonHandler, sizeInputChangeHandler, content} = useContext(ContentContext)
    return (
        <div className={classes.Header}>
            <h1> {content.headertext}</h1>
            <nav>
                {
                    content.appstatus === 'init'
                        ?
                        <Input
                            type={'text'}
                            value={content.sizeinput.value}
                            label={content.sizeinput.label}
                            onChange={sizeInputChangeHandler}
                            valid={content.sizeinput.valid}
                            touched={content.sizeinput.touched}
                            shouldValidate={!!content.sizeinput.validation}
                            errorMessage={content.sizeinput.errorMessage}
                        />
                        : null
                }
                {
                    content.appstatus !== 'live' && content.appstatus !== 'finish'
                    ?
                    <Button
                        type={'success'}
                        disabled={!content.sizeinput.valid || content.appstatus === 'live'}
                        onClick={mainButtonHandler}>
                        {content.mainbuttontext}
                    </Button>
                    : null
                }
            </nav>
        </div>
    )
}