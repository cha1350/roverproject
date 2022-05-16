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

    const mockRoverRepo = {
        getRover: jest.fn(() => { return { direction: 'N', xPos: 4, yPos: 4 } })
    }

    const dependencies = {
        mapRepository: mockMapRepo,
        roverRepository: mockRoverRepo
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
            const isEdge = detectEdge(dependencies).execute()
            expect(isEdge).toBeDefined()
            expect(isEdge).toEqual(true)

            const mapCall = mockMapRepo.getMap.mock.calls[0]
            expect(mapCall).toBeDefined()
            const roverCall = mockRoverRepo.getRover.mock.calls[0]
            expect(roverCall).toBeDefined()
        })

        test('Should returned false when rover isn\'t on the edge of map size', () => {
            const isEdge = detectEdge(dependencies).execute()
            expect(isEdge).toBeDefined()
            expect(isEdge).toEqual(true)

            const mapCall = mockMapRepo.getMap.mock.calls[0]
            expect(mapCall).toBeDefined()
            const roverCall = mockRoverRepo.getRover.mock.calls[0]
            expect(roverCall).toBeDefined()
        })
    })
})