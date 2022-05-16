import * as repositories from '../framework/repository/inMemory/index.js'
import * as useCases from '../useCase/index.js'
import * as controllers from '../controller/index.js'
export default {
    ...repositories,
    ...useCases,
    ...controllers
}