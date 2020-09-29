import React, {useReducer, useEffect, useCallback} from "react";
import {ContentContext} from './contentContext'
import {
    ENV_CELL_CLICK_HANDLER,
    SIZE_INPUT_CHANGE_HANDLER,
    MAIN_BUTTON_INIT_HANDLER,
    MAIN_BUTTON_PRE_INFECT_HANDLER,
    MAIN_BUTTON_INFECT_HANDLER, MAIN_BUTTON_LIVE_HANDLER
} from "../types";
import {contentReducer} from "./contentReducer";

// Начальное состояние приложения
const contentStore = {
    appstatus: 'init',
    headertext: `Введите размер игрового поля от 10 до 100 и нажмите "Начать"`,
    sizeinput: {
        value: '',
        type: 'text',
        label: 'Размер поля',
        errorMessage: 'Введите правильный номер',
        valid: false,
        touched: false,
        validation: {
            required: true,
            validnumberinterval: true
        }
    },
    mainbuttontext: `Начать`,
    liveEnvironment: [],
    liveEnvironmentCash: []
}


export const ContentState = ({children}) => {
    //Определяем состояние и фуннкцию редюсер
    //Для дальгейшего использования в ContentContext
    const [content, dispatch] = useReducer(contentReducer, contentStore, store => store)

    // Блок обработки событий элементов приложения
    // Все вызываются функцию dispatch с различными типами

    // Обработчик инпута "Размер поля"
    const sizeInputChangeHandler = useCallback((value) => {

        //Валидация заданная в конфиге для инпута content.sizeinput.validation
        const validation = content.sizeinput.validation
        let valid = false;

        if (validation.required) {
            valid = value.length > 0
        }
        if (validation.validnumberinterval && valid) {
            valid = Number(value) >= 10 && Number(value) <= 100
        }
        //Измение состояние инпута с результатами проверки и значением
        dispatch({
            type: SIZE_INPUT_CHANGE_HANDLER,
            paiload: {
                value,
                valid,
                touched: true
            }
        })
    }, [content.sizeinput.validation])

    //Обработчик клика на ячейку игрового поля, при заселении жизни
    const onCellClickHandler = useCallback((x, y) => {
        dispatch({
            type: ENV_CELL_CLICK_HANDLER,
            paiload: {
                x, y
            }
        })
    }, [])

    //Обработчик кнопки. Запускает эволюцию
    const infectMainButtonHandler = useCallback(() => {
        dispatch({
            type: MAIN_BUTTON_INFECT_HANDLER
        })
    }, [])

    //добавляет эффект, проверяющий если состояние приложение live
    // запускает следующий шаг жизни
    useEffect(() => {
        if (content.appstatus === 'live') {
            setTimeout(() => dispatch({
                type: MAIN_BUTTON_LIVE_HANDLER
            }), 800)
        }
    })

    //Обработчик событий для кнопки приложения
    //Меняет логику в зависимости от статуса приложения
    const mainButtonHandler = useCallback(() => {
            switch (content.appstatus) {
                case 'init':
                    dispatch({
                        type: MAIN_BUTTON_INIT_HANDLER
                    })
                    break
                case 'pre_infect':
                    dispatch({
                        type: MAIN_BUTTON_PRE_INFECT_HANDLER
                    })
                    break
                case 'infect':
                    infectMainButtonHandler()
                    break
                default:
                    return
            }
        },
        [content.appstatus, infectMainButtonHandler])

    return (
        <ContentContext.Provider value={{
            mainButtonHandler,
            onCellClickHandler,
            sizeInputChangeHandler,
            content,
        }}>
            {children}
        </ContentContext.Provider>
    )
}