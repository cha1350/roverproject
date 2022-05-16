import repositories from '../framework/repository/inMemory/index.js'
import useCases from '../useCase/index.js'
export default {
    ...repositories,
    ...useCases
}