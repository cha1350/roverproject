import { actionType } from "../../entity"
import { ResponseError, ValidationError } from "../../framework/common/response"

export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    if (!roverRepository) {
        throw new Error('roverRepository should be in depencies')
    }

    const execute = (action) => {
        const existAction = ['F', 'L', 'R']
        if (existAction.includes(action)) {
            if (action === 'F') {
                return actionType.MOVE
            } else {
                return actionType.TURN
            }
        } else {
            throw new ResponseError({
                msg: 'Validation Errors',
                reason: 'Bad data',
                validationErrors: new ValidationError({ field: "action", msg: `This '${action}' action is wrong action type!` })
            })
        }
    }

    return { execute }
}