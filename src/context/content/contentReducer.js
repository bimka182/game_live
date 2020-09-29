import {
    ENV_CELL_CLICK_HANDLER,
    MAIN_BUTTON_INFECT_HANDLER,
    MAIN_BUTTON_INIT_HANDLER, MAIN_BUTTON_LIVE_HANDLER,
    MAIN_BUTTON_PRE_INFECT_HANDLER,
    SIZE_INPUT_CHANGE_HANDLER
} from '../types'
import {evolution} from './evolution'
import {isDeadCheck} from './isDeadCheck';

const handlers = {
    // Изменяем состояние input
    [SIZE_INPUT_CHANGE_HANDLER]: (state, action) => {
        return {
            ...state,
            sizeinput: {
                ...state.sizeinput,
                ...action.paiload
            }
        }
    },
    // Изменяем состояние ячейки игрового поля, на противоположное
    [ENV_CELL_CLICK_HANDLER]: (state, action) => {
        const liveEnvironment = [...state.liveEnvironment]
        const liveEnvironmentrow = [...liveEnvironment[action.paiload.x]]

        liveEnvironmentrow[action.paiload.y] === 0 ?
            liveEnvironmentrow[action.paiload.y] = 1 :
            liveEnvironmentrow[action.paiload.y] = 0

        liveEnvironment[action.paiload.x] = liveEnvironmentrow

        return {
            ...state,
            liveEnvironment
        }
    },
    //Меняем состояние приложения на следующее,
    //Создаем начальное создание игрового поля в зависимости от размера(state.sizeinput.value)
    [MAIN_BUTTON_INIT_HANDLER]: (state, action) => {
        return {
            ...state,
            appstatus: 'pre_infect',
            headertext: `Площадка для развития создана. Для начала заселения нажмите "Старт заражения"`,
            mainbuttontext: 'Старт заражения',
            liveEnvironment: new Array(Number(state.sizeinput.value))
                .fill(0)
                .map(x => new Array(Number(state.sizeinput.value))
                    .fill(0))
        }
    },
    //Меняем состояние приложения на следующее
    [MAIN_BUTTON_PRE_INFECT_HANDLER]: (state, action) => {
        return {
            ...state,
            appstatus: 'infect',
            headertext: `Выберите клетки, на которые хотите поселить начальную жизнь и нажмите "Эволюция"`,
            mainbuttontext: 'Эволюция'
        }
    },
    // Меняем состояние приложения на следующее(на live если игра не окончена и на finish если игра завершена),
    // получение следудщего этапа развития жизни
    // Проверка на окончание игры
    // Сохранение в кеш фазы развития, если игра не закончена
    [MAIN_BUTTON_INFECT_HANDLER]: (state, action) => {
        let appstatus = 'live'
        let headertext = 'Наблюдайте за развитием'
        // Разворачиваем кеш
        const liveEnvironmentCash = [...state.liveEnvironmentCash]
        // Добавляем начальное состояние в кеш
        liveEnvironmentCash.push([...state.liveEnvironment])
        return {
            ...state,
            appstatus,
            headertext,
            liveEnvironmentCash
        }
    },
    [MAIN_BUTTON_LIVE_HANDLER]: (state, action) => {
        let appstatus = 'live'
        let headertext = 'Наблюдайте за развитием'
        // Разворачиваем кеш
        const liveEnvironmentCash = [...state.liveEnvironmentCash]
        // Возвращаем следующий шаг развития
        let liveEnvironment = evolution([...state.liveEnvironment])

        // Проверяем на завершение игры
        const isDeadResult = isDeadCheck(state, liveEnvironment)
        if (isDeadResult.finish) {
            appstatus = 'finish'
            console.log(liveEnvironmentCash, liveEnvironment)
            if (isDeadResult.finishreason === 'existstep') {
                headertext = `Конец игры.
                Эта фигура встречалась в шаге: ${isDeadResult.existenvstep + 1}.
                Длина жизни ${liveEnvironmentCash.length}`
            } else {
                headertext = 'Конец игры. Жизнь погибла'
            }
        } else {
            liveEnvironmentCash.push(liveEnvironment)
        }
        return {
            ...state,
            appstatus,
            headertext,
            liveEnvironment,
            liveEnvironmentCash
        }
    },
    //для случая если в reducer не будет найден подходящий action.type
    DEFAULT: state => state
}

export const contentReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
