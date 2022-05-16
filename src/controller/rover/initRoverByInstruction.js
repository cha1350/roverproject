export default (dependencies) => {
    const {
        roverUseCase,
        mapUseCase
    } = dependencies

    if (!roverUseCase) {
        throw new Error('roverController should be in depencies')
    }
    if (!mapUseCase) {
        throw new Error('mapUseCase should be in depencies')
    }

    const execute = () => {
        return
    }

    return { execute }
}