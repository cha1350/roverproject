export default (dependencies) => {
    const {
        mapRepository
    } = dependencies

    const execute = () => {
        return mapRepository.getMap()
    }

    return { execute }
}