import { roverController } from '../../../src/controller/index.js'
import { actionType } from '../../../src/entity/rover.js'
import { jest } from '@jest/globals'

const { initRoverByInstruction } = roverController

describe('Rover controller', () => {
    let mockMap = { size: 1 }
    let mockRover = { direction: 'N', xPos: 0, yPos: 0 }
    const mockMapUseCase = {
        getMapUseCase: jest.fn(() => { return { execute: () => mockMap } }),
        updateMapUseCase: jest.fn(() => {
            return {
                execute: (map) => {
                    mockMap = map
                    return map
                }
            }
        }),
        detectEdge: jest.fn(() => {
            return {
                execute: () => {
                    if (
                        mockRover.xPos > mockMap.size ||
                        mockRover.yPos > mockMap.size ||
                        mockRover.xPos < 0 ||
                        mockRover.yPos < 0
                    ) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }),
    }
    const mockRoverUseCase = {
        getRoverUseCase: jest.fn(() => { return { execute: () => mockRover } }),
        updateRoverUseCase: jest.fn(() => {
            return {
                execute: (rover) => {
                    mockRover = rover
                    return rover
                }
            }
        }),
        validateRoverAction: jest.fn(() => {
            return {
                execute: (action) => {
                    if (action === 'F') {
                        return actionType.MOVE
                    } else {
                        return actionType.TURN
                    }
                }
            }
        }),
        turnRoverUseCase: jest.fn(() => {
            return { execute: () => 'N' }
        }),
        moveRoverUseCase: jest.fn(() => {
            return {
                execute: () => {
                    return {
                        ...mockRover,
                        yPos: mockRover.yPos + 1,
                    }
                }
            }
        }),
    }

    const dependencies = {
        mapUseCase: mockMapUseCase,
        roverUseCase: mockRoverUseCase,
    }
    describe('Init rover by instruction', () => {
        // const instructionMove = [24, 'F', 'R', 'F', 'L', 'F', 'R', 'F', 'L', 'F', 'F', 'F', 'F']
        test('Rover moving history should be defined and return as array of object', () => {
            const instructionMove = [
                24, 'F', 'R', 'F', 'L', 'F', 'R', 'F', 'L', 'F', 'F', 'F', 'F',
            ]
            const moveHistory =
                initRoverByInstruction(dependencies).execute(instructionMove)
            expect(moveHistory).toBeDefined()
            expect(moveHistory[0].roverData).toEqual({ direction: 'N', xPos: 0, yPos: 0 })
            expect(moveHistory[0].action).toEqual(24)

            // expect(mockMapUseCase.getMapUseCase.mock.calls[0]).toBeDefined()
            expect(mockMapUseCase.updateMapUseCase.mock.calls[0]).toBeDefined()
            expect(mockMapUseCase.detectEdge.mock.calls[0]).toBeDefined()

            expect(mockRoverUseCase.getRoverUseCase.mock.calls[0]).toBeDefined()
            expect(mockRoverUseCase.updateRoverUseCase.mock.calls[0]).toBeDefined()
            expect(mockRoverUseCase.validateRoverAction.mock.calls[0]).toBeDefined()
            expect(mockRoverUseCase.turnRoverUseCase.mock.calls[0]).toBeDefined()
            expect(mockRoverUseCase.moveRoverUseCase.mock.calls[0]).toBeDefined()
        })

        test('If rover reaching the edge it must maintain the direction and position', () => {
            const instructionMove = [1, 'F', 'F']
            mockRover = { direction: 'N', xPos: 0, yPos: 0 }
            mockMap = { size: 1 }
            const moveHistory =
                initRoverByInstruction(dependencies).execute(instructionMove)
            expect(moveHistory).toBeDefined
            expect(moveHistory[0].roverData).toEqual({ direction: 'N', xPos: 0, yPos: 0 })
            expect(moveHistory[0].action).toEqual(1)
            expect(moveHistory[1].roverData).toEqual({
                ...mockRover,
                xPos: 0,
                yPos: 1,
            })
            expect(moveHistory[1].action).toEqual('F')
            expect(moveHistory[1].roverData).toEqual({
                ...mockRover,
                xPos: 0,
                yPos: 1,
            })
            expect(moveHistory[1].action).toEqual('F')
        })
    })
})
