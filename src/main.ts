import { Client } from 'discord.js'
import dotenv from 'dotenv'
import * as config from './config.json'
const prefix = config.prefix
export { prefix as Prefix }

import CommandHandler from './commandhandler'
import { Database } from './database'

dotenv.config()

const client = new Client()
export { client as Client }

const commands = new CommandHandler()
export { commands as Commands }
commands.build()

new Database(
  "sql5.freesqldatabase.com",
  "sql5393014",
  "wGRWblHEh4",
  "sql5393014"
)

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)
  client.user?.setPresence({
    status: 'online',
    activity: {
      name: `your ads | ${prefix}help`,
      type: 'WATCHING',
    },
  })
})

client.on('message', msg => {
  if (!msg.guild) return
  if (msg.author.bot) return
  if (msg.content.startsWith(prefix)) {
    const command = msg.content.slice(prefix.length).split(' ')[0]
    if (commands.files.has(command)) commands.files.get(command)!.call(msg)
  }

})

client.login(config.token)
