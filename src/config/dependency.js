import repositories from '../framework/repository/inMemory/index.js'
import useCases from '../useCase/index.js'
import controllers from '../controller/index.js'
export default {
    ...repositories,
    ...useCases,
    ...controllers
}