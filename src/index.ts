import { createClient, createCommands } from '@yuudachi/framework';

const client = createClient({
    intents:[],
    partials:[]
})
createCommands()

// probably command and event handling here
//
//
//

await client.login()
