import inMemoryDB from "../../inMemory/index.js"

export default {
    getRover: () => {
        return inMemoryDB.rover
    },
    updateRover: (rover) => {
        inMemoryDB.rover = { ...rover }
        return rover
    }
}