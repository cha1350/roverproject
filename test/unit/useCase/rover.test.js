import { rover } from '../../../src/useCase/index.js'
import { actionType } from '../../../src/entity/index.js'
import { jest } from '@jest/globals'
import { ValidationError } from '../../../src/framework/common/response.js'
const {
    getRoverUseCase,
    moveRoverUseCase,
    turnRoverUseCase,
    updateRoverUseCase,
    validateRoverAction,
} = rover

describe('Rover use cases', () => {
    let mock = { direction: 'N', xPos: 0, yPos: 0 }
    const mockRoverRepo = {
        updateRover: jest.fn((rover) => {
            mock = rover
            return rover
        }),
        getRover: jest.fn(() => mock),
    }

    const dependencies = {
        roverRepository: mockRoverRepo,
    }

    describe('Update new rover position and direction', () => {
        test('New rover data should be updated and returned', () => {
            const testRoverData = {
                direction: 'N',
                xPos: 0,
                yPos: 0,
            }

            const updatededRover =
                updateRoverUseCase(dependencies).execute(testRoverData)
            expect(updatededRover).toBeDefined()
            expect(updatededRover).toEqual(testRoverData)

            const call = mockRoverRepo.updateRover.mock.calls[0]
            expect(call).toBeDefined()
        })
    })

    describe('Get rover use case', () => {
        test('Current rolver data should be returned', () => {
            const roverData = getRoverUseCase(dependencies).execute()
            expect(roverData).toBeDefined()
            expect(roverData.direction).toBeDefined()
            expect(roverData.xPos).toBeDefined()
            expect(roverData.yPos).toBeDefined()

            const call = mockRoverRepo.getRover.mock.calls[0]
            expect(call).toBeDefined()
        })
    })

    describe('Get new position from move action', () => {
        test('New position should be as {xPos: 0, yPos: 1} when current direction is N and {xPos:0, yPos:0}', () => {
            const action = 'F'
            mock = {
                direction: 'N',
                xPos: 0,
                yPos: 0,
            }
            const newPos = moveRoverUseCase(dependencies).execute(action)
            expect(newPos).toBeDefined()
            expect(newPos.xPos).toEqual(0)
            expect(newPos.yPos).toEqual(1)
            expect(newPos.direction).toEqual('N')

            const call = mockRoverRepo.getRover.mock.calls[0]
            expect(call).toBeDefined()
        })
        test('New position should be as {xPos: 1, yPos: 0} when current direction is E and {xPos:0, yPos:0}', () => {
            const action = 'F'
            mock = {
                direction: 'E',
                xPos: 0,
                yPos: 0,
            }
            const newPos = moveRoverUseCase(dependencies).execute(action)
            expect(newPos).toBeDefined()
            expect(newPos.xPos).toEqual(1)
            expect(newPos.yPos).toEqual(0)
            expect(newPos.direction).toEqual('E')

            const call = mockRoverRepo.getRover.mock.calls[0]
            expect(call).toBeDefined()
        })
        test('New position should be as {xPos: 1, yPos: 0} when current direction is S and {xPos:1, yPos:1}', () => {
            const action = 'F'
            mock = {
                direction: 'S',
                xPos: 1,
                yPos: 1,
            }
            const newPos = moveRoverUseCase(dependencies).execute(action)
            expect(newPos).toBeDefined()
            expect(newPos.xPos).toEqual(1)
            expect(newPos.yPos).toEqual(0)
            expect(newPos.direction).toEqual('S')

            const call = mockRoverRepo.getRover.mock.calls[0]
            expect(call).toBeDefined()
        })
        test('New position should be as {xPos: 0, yPos: 1} when current direction is W and {xPos:1, yPos:1}', () => {
            const action = 'F'
            mock = {
                direction: 'W',
                xPos: 1,
                yPos: 1,
            }
            const newPos = moveRoverUseCase(dependencies).execute(action)
            expect(newPos).toBeDefined()
            expect(newPos.xPos).toEqual(0)
            expect(newPos.yPos).toEqual(1)
            expect(newPos.direction).toEqual('W')

            const call = mockRoverRepo.getRover.mock.calls[0]
            expect(call).toBeDefined()
        })
    })

    describe('Get new Direction from turn action', () => {
        test('New direction should be in N->E->S->W->N format when turn action is \'R\'', () => {
            const action = 'R'
            const directionForTurnRFormat = ['N', 'E', 'S', 'W', 'N']
            for (let i = 0; i < 4; i++) {
                mock = {
                    direction: directionForTurnRFormat[i],
                    xPos: 0,
                    yPos: 0
                }
                const newDi = turnRoverUseCase(dependencies).execute(action)
                expect(newDi).toBeDefined()
                expect(newDi).toEqual(directionForTurnRFormat[i + 1])
            }
        })

        test('New direction should be in N->W->S->E->N format when turn action is \'L\'', () => {
            const action = 'L'
            const directionForTurnRFormat = ['N', 'W', 'S', 'E', 'N']
            for (let i = 0; i < 4; i++) {
                mock = {
                    direction: directionForTurnRFormat[i],
                    xPos: 0,
                    yPos: 0
                }
                const newDi = turnRoverUseCase(dependencies).execute(action)
                expect(newDi).toBeDefined()
                expect(newDi).toEqual(directionForTurnRFormat[i + 1])
            }
        })
    })

    describe('Validate and classify action type', () => {
        test('Action \'F\' should classified as move action', () => {
            const action = 'F'
            const roverAction = validateRoverAction(dependencies).execute(action)
            expect(roverAction).toBeDefined()
            expect(roverAction).toEqual(actionType.MOVE)
        })

        test('Action \'L\' and \'R\' should classified as turn action', () => {
            const actions = ['L', 'R']
            for (const action of actions) {
                const roverAction = validateRoverAction(dependencies).execute(action)
                expect(roverAction).toBeDefined()
                expect(roverAction).toEqual(actionType.TURN)
            }
        })

        test('Should return validation error when action is not in (F, R, L)', () => {
            const action = 'C'
            try {
                validateRoverAction(dependencies).execute(action)
                expect(true).toBe(false)
            } catch (err) {
                expect(err.validationErrors).toEqual(new ValidationError({ field: "action", msg: `This '${action}' action is wrong action type!` }))
            }
        })
    })
})
