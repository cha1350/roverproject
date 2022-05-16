import dependencies from "./config/dependency.js"
import cli from "./framework/cli/index.js"

export const main = {
    start: async () => {
        console.log('You have a mission to discover mars with rover! 🚀 🚀 🚀')
        console.log('Please put your move instruction in /storage path.')
        await cli(dependencies).execute()
    }
}