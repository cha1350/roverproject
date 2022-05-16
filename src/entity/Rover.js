export const Rover = class Rover {
    constructor({
        direction = "N",
        xPos = 1,
        yPos = 1
    } = {}) {
        this.direction = direction
        this.xPos = xPos
        this.yPos = yPos
    }
}