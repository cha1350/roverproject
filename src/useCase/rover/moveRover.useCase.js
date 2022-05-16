export default (dependencies) => {
    const {
        roverRepository
    } = dependencies



    const execute = () => {
        const currentRoverData = roverRepository.getRover()
        let roverMove = { axis: 'xPos', move: 0 }
        switch (currentRoverData.direction) {
            case 'N':
                roverMove = { axis: 'yPos', move: 1 }
                break
            case 'E':
                roverMove = { axis: 'xPos', move: 1 }
                break
            case 'S':
                roverMove = { axis: 'yPos', move: -1 }
                break
            case 'W':
                roverMove = { axis: 'xPos', move: -1 }
                break
        }
        const newRoverData = {
            ...currentRoverData,
            [roverMove.axis]: currentRoverData[roverMove.axis] + roverMove.move
        }
        return newRoverData
    }

    return { execute }
}