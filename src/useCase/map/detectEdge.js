export default (dependencies) => {
    const {
        mapRepository,
    } = dependencies

    

    const execute = (movedRoverData) => {
        const { xPos, yPos } = movedRoverData
        const currentMapData = mapRepository.getMap()
        const mapSize = currentMapData.size
        if ((xPos > mapSize || yPos > mapSize) || (xPos < 0 || yPos < 0)) {
            return true
        } else {
            return false
        }
    }

    return { execute }
}