import { Rover } from "../../../src/entity/rover.js"
import { roverRepository } from "../../../src/framework/repository/inMemory/index.js"

describe('Rover repository', () => {
    test('New direction and position should be updated and returned', () => {
        const testRover = new Rover({
            direction: "N",
            xPos: 1,
            yPos: 1
        })

        const updatedRover = roverRepository.updateRover(testRover)
        expect(updatedRover).toBeDefined();
        expect(updatedRover.direction).toEqual(testRover.direction)
        expect(updatedRover.xPos).toEqual(testRover.xPos)
        expect(updatedRover.yPos).toEqual(testRover.yPos)

        const returnedRover = roverRepository.getRover()
        expect(returnedRover).toEqual(updatedRover)
    })
})