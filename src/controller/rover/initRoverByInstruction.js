import { actionType, MarsMap, Rover } from "../../entity/index.js"

export default (dependencies) => {
    const {
        roverUseCase,
        mapUseCase
    } = dependencies

    const execute = (moveInstruction) => {

        const mapSize = moveInstruction[0]
        const actions = moveInstruction.slice(1)
        const mapData = new MarsMap({ size: mapSize })
        const updatedMap = mapUseCase.updateMapUseCase(dependencies).execute(mapData)
        const initRoverPosition = new Rover({ direction: 'N', xPos: 0, yPos: 0 })
        const updatedRoverData = roverUseCase.updateRoverUseCase(dependencies).execute(initRoverPosition)
        let moveHistory = [{ action: updatedMap.size, roverData: updatedRoverData }]
        for (const action of actions) {
            const roverAction = roverUseCase.validateRoverAction(dependencies).execute(action)
            switch (roverAction) {
                case actionType.MOVE: {
                    const newRoverData = roverUseCase.moveRoverUseCase(dependencies).execute(action)
                    const isEdge = mapUseCase.detectEdge(dependencies).execute(newRoverData)
                    if (isEdge) {
                        const currentRoverData = roverUseCase.getRoverUseCase(dependencies).execute()
                        moveHistory.push({ action, roverData: currentRoverData })
                    } else {
                        const updatedRoverData = roverUseCase.updateRoverUseCase(dependencies).execute(newRoverData)
                        moveHistory.push({ action, roverData: updatedRoverData })
                    }
                    break
                }
                case actionType.TURN: {
                    const newPos = roverUseCase.turnRoverUseCase(dependencies).execute(action)
                    const currentRoverData = roverUseCase.getRoverUseCase(dependencies).execute()
                    const newRoverData = new Rover({ ...currentRoverData, direction: newPos })
                    const updatedRoverData = roverUseCase.updateRoverUseCase(dependencies).execute(newRoverData)
                    moveHistory.push({ action, roverData: updatedRoverData })
                    break
                }
            }
        }

        return moveHistory
    }

    return { execute }
}