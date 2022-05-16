export default (dependencies) => {
    const {
        mapRepository
    } = dependencies

    if (!mapRepository) {
        throw new Error('mapRepository should be in depencies')
    }

    const execute = () => {
        return mapRepository.getMap()
    }

    return { execute }
}