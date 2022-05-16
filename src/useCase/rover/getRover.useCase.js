export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    if (!roverRepository) {
        throw new Error('roverRepository should be in depencies')
    }

    const execute = () => {
        return roverRepository.getRover()
    }

    return { execute }
}