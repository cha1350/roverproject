export default (dependencies) => {
    const {
        mapRepository
    } = dependencies

    if (!mapRepository) {
        throw new Error('mapRepository should be in depencies')
    }

    const execute = (mapData) => {
        return mapRepository.updateMap(mapData)
    }

    return { execute }
}