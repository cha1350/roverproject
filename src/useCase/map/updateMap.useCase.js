export default (dependencies) => {
    const {
        mapRepository
    } = dependencies

    

    const execute = (mapData) => {
        return mapRepository.updateMap(mapData)
    }

    return { execute }
}