import { map } from '../../../src/useCase/index.js'
import { jest } from '@jest/globals'

const {
    detectEdge,
    getMapUseCase,
    updateMapUseCase
} = map

describe('Map use cases', () => {
    let mock = { size: 1 }
    const mockMapRepo = {
        updateMap: jest.fn((map) => {
            mock = map
            return map
        }),
        getMap: jest.fn(() => mock)
    }

    const dependencies = {
        mapRepository: mockMapRepo,
    }

    describe('Update new map size', () => {
        test('New map size should be updated and returned', () => {
            const testMapData = {
                size: 4
            }
            const updatedMap = updateMapUseCase(dependencies).execute(testMapData)
            expect(updatedMap).toBeDefined()
            expect(updatedMap.size).toEqual(testMapData.size)

            const call = mockMapRepo.updateMap.mock.calls[0]
            expect(call).toBeDefined()
        })
    })

    describe('Get map use case', () => {
        test('Current map data should be returned', () => {
            const mapData = getMapUseCase(dependencies).execute()
            expect(mapData).toBeDefined()
            expect(mapData.size).toBeDefined()

            const call = mockMapRepo.getMap.mock.calls[0]
            expect(call).toBeDefined()
        })
    })

    describe('Detect edge of map by map size', () => {
        test('Should returned true when rover is on the edge of map size', () => {
            mock = {
                size: 4
            }
            const movedRoverData = {
                direction: "N",
                xPos: 5,
                yPos: 4
            }
            const isEdge = detectEdge(dependencies).execute(movedRoverData)
            expect(isEdge).toBeDefined()
            expect(isEdge).toEqual(true)

            const mapCall = mockMapRepo.getMap.mock.calls[0]
            expect(mapCall).toBeDefined()
        })

        test('Should returned false when rover isn\'t on the edge of map size', () => {
            mock = {
                size: 4
            }
            const movedRoverData = {
                direction: "N",
                xPos: 1,
                yPos: 1
            }
            const isEdge = detectEdge(dependencies).execute(movedRoverData)
            expect(isEdge).toBeDefined()
            expect(isEdge).toEqual(false)

            const mapCall = mockMapRepo.getMap.mock.calls[0]
            expect(mapCall).toBeDefined()
        })
    })
})