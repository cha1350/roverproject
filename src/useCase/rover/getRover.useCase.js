export default (dependencies) => {
    const {
        roverRepository
    } = dependencies

    

    const execute = () => {
        return roverRepository.getRover()
    }

    return { execute }
}