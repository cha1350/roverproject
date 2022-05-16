import inMemoryDB from "../../inMemory/index.js"


export default {
    getMap: () => {
        return inMemoryDB.map
    },
    updateMap: (map) => {
        inMemoryDB.map = { ...map }
        return map
    }
}