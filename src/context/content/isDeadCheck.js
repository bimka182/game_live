export const isDeadCheck = (state, newLiveEnvironment) => {
    // Объект результата, для понимание причины завершения игры
    let result = {
        finish: false,
        finishreason: null,
        existenvstep: null
    }
    //1) Игра прекращается, если
    // на поле не останется ни одной «живой» клетки
    if (fullEnvironmentDead(newLiveEnvironment)) {
        result.finish = true
        result.finishreason = 'fulldead'
        return result
    }

    //2) конфигурация на очередном шаге в точности (без сдвигов и поворотов)
    // повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
    //3) при очередном шаге ни одна из клеток не меняет своего состояния
    // (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)
    let existenvstep = existEnvironmentStep(state, newLiveEnvironment)

    if (existenvstep.exist) {
        result.finish = true
        result.finishreason = 'existstep'
        result.existenvstep = existenvstep.existstep
        return result
    }

    return result
}

// Функция проверки наличия жизни
const fullEnvironmentDead = newLiveEnvironment => {
    return newLiveEnvironment.every((el) => {
        return el.every(val => val === 0)
    })
}

// Функция проверки на совпадения на одном из шагов развития
const existEnvironmentStep = (state, newLiveEnvironment) => {
    const result = {
        exist: false,
        existstep: null
    }
    state.liveEnvironmentCash.every((prevenv, step) => {

        if (!result.exist) {
            result.exist = prevenv.every((el, x) => {
                return el.every((val, y) => {
                    return val === newLiveEnvironment[x][y]
                })
            })
            result.existstep = step
            return true
        } else {
            return false
        }
    })

    return result
}