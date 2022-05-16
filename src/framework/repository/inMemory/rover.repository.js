import inMemoryDB from "../../inMemory/index.js"

export default {
    getRover: () => {
        return inMemoryDB.rover
    },
    updateRoverPosition: () => {
        return
    },
    updateRoverDirection: () => {
        return
    },
    updateRover: (rover) => {
        inMemoryDB.rover = { ...rover }
        return rover
    }
}