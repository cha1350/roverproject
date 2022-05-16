export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    

    const execute = (action) => {
        const currentRoverData = roverRepository.getRover()
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