export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    

    const execute = (roverData) => {
        return roverRepository.updateRover(roverData)
    }

    return { execute }
}