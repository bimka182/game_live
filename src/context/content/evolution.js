// Функция получает текущее состояние игрового поля и в фукции forEach меняет его в зависимости от правил игры
export const evolution = (liveEnvironment) => {
    const prevEvolutionState = liveEnvironment.map(el => [...el])
    let currentEvolutionState = prevEvolutionState.map(el => [...el])

    prevEvolutionState.forEach((el, x) => {
        el.forEach((_, y) => {
            evolutionCell(prevEvolutionState, currentEvolutionState, x, y)
        })
    })

    return currentEvolutionState
}
//Функция эволюции ичейки игрового поля
function evolutionCell(prevEvolutionState, currentEvolutionState, indexX, indexY) {
    let currentvalue = prevEvolutionState[indexX][indexY]
    let siblingsIndexes = [];
    let siblingsValuesAccumulator = [];
    siblingsIndexes.push(
        [indexX - 1, indexY - 1],
        [indexX - 1, indexY],
        [indexX - 1, indexY + 1],
        [indexX, indexY - 1],
        [indexX, indexY + 1],
        [indexX + 1, indexY - 1],
        [indexX + 1, indexY],
        [indexX + 1, indexY + 1]
    )

    siblingsIndexes = siblingsIndexes.filter(el => {
        if (el[0] >= 0 && el[0] < currentEvolutionState.length && el[1] >= 0 && el[1] < currentEvolutionState.length) {
            return true
        } else {
            return false
        }

    })
    //
    siblingsValuesAccumulator = siblingsIndexes.map(el => {
        return prevEvolutionState[el[0]][el[1]]
    }).reduce((accum, value) => {
            return accum + value
        }
        , 0
    )
    // Правила развития
    if (currentvalue === 0 && siblingsValuesAccumulator === 3) {
        currentEvolutionState[indexX][indexY] = 1
    } else {
        if (siblingsValuesAccumulator !== 2 && siblingsValuesAccumulator !== 3) {
            currentEvolutionState[indexX][indexY] = 0
        }
    }
}