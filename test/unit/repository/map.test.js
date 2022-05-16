import { MarsMap } from "../../../src/entity/map.js"
import { mapRepository } from "../../../src/framework/repository/inMemory/index.js"

describe('Rover repository', () => {
    test('New direction and position should be updated and returned', () => {
        const testMarsMap = new MarsMap({
            size: 24
        })

        const updatedMarsMap = mapRepository.updateMap(testMarsMap)
        expect(updatedMarsMap).toBeDefined();
        expect(updatedMarsMap.size).toEqual(testMarsMap.size)

        const returnedMarsMap = mapRepository.getMap()
        expect(returnedMarsMap).toEqual(updatedMarsMap)
    })
})