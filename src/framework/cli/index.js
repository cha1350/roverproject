import * as readline from 'readline'
import fs from 'fs'
import path from 'path';
const rl = readline.createInterface(process.stdin, process.stdout);

export default (dependencies) => {
    const {
        roverController
    } = dependencies

    if (!roverController) {
        throw new Error('roverController should be in depencies')
    }
    const execute = () => {
        return new Promise((resolve) => {
            rl.question('Fill in your file name: ', async (fileName) => {
                const filePath = path.resolve('storage', fileName)
                try {
                    if (fs.existsSync(filePath)) {
                        const fileData = fs.readFileSync(filePath, 'utf8')
                        const lines = fileData.split('\n')
                        const actionHistories = roverController.initRoverByInstruction(dependencies).execute(lines)
                        for (const actionHistory of actionHistories) {
                            console.log(actionHistory.action,
                                '  |  ',
                                `${actionHistory.roverData.direction}:${actionHistory.roverData.xPos},${actionHistory.roverData.yPos}`)
                        }
                        await execute()
                    } else {
                        console.log("I can't found file name or directory please try again.")
                        await execute()
                    }
                } catch (err) {
                    console.error(err.validationErrors.msg)
                    await execute()
                }

                resolve()
            });
        })
    }

    return { execute }
}