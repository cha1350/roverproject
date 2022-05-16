export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    if (!roverRepository) {
        throw new Error('roverRepository should be in depencies')
    }

    const execute = (action) => {
        const currentRoverData = roverRepository.getRover()
        let roverMove = { axis: 'xPos', move: 0 }
        if (action == 'F') {
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
                default:
                    roverMove = { axis: 'xPos', move: 0 }
                    break
            }
        }
        const newRoverData = {
            ...currentRoverData,
            [roverMove.axis]: currentRoverData[roverMove.axis] + roverMove.move
        }
        return newRoverData
    }

    return { execute }
}