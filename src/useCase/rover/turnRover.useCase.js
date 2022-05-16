export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    if (!roverRepository) {
        throw new Error('roverRepository should be in depencies')
    }

    const execute = (action) => {
        const currentRoverData = roverRepository.getRover()
        console.log(currentRoverData)
        const turnDirectionConfig = {
            L: {
                N: 'W',
                E: 'N',
                S: 'E',
                W: 'S'
            },
            R: {
                N: 'E',
                E: 'S',
                S: 'W',
                W: 'N'
            }
        }
        const newDirection = turnDirectionConfig[action][currentRoverData.direction]
        return newDirection
    }

    return { execute }
}