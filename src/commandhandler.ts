import * as fs from 'fs'
import path from 'path'
import Command from './interfaces/command'

export default class CommandHandler {
  public files: Map<string, Command> = new Map()

  constructor() {}

  async build() {
    const files = fs.readdirSync(path.join(__dirname, './modules'))
    for (const file of files) {
      if (!file.includes('.map')) {
        const cmd = await require(path.join(__dirname, './modules/' + file)).default

        const commandInitialized = new cmd()

        if (!commandInitialized.commandName) {
          console.log(
            '\x1b[37m\x1b[41m❰Command-Handler❱\x1b[44m\x1b[30m An error occured, please clear build/modules and recompile.\x1b[0m'
          )
          return
        }

        this.files.set(
          commandInitialized.commandName.toLowerCase(),
          commandInitialized
        )
      }
    }
  }
}
