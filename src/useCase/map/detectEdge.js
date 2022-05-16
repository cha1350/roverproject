export default (dependencies) => {
    const {
        mapRepository,
    } = dependencies

    if (!mapRepository) {
        throw new Error('mapRepository should be in depencies')
    }

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