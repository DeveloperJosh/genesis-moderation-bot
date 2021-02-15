import { Message } from 'discord.js'
import { Prefix } from '../main'

type Category = 'moderation' | 'utility' | 'support'

export default class Command {
  public commandName: string
  public category: Category
  public description: string
  public args: string

  constructor(
    commandName: string,
    category: Category,
    description: string,
    args: string
  ) {
    this.commandName = commandName
    this.category = category
    this.description = description
    this.args = args
  }

  public async call(_msg: Message): Promise<void> {}

  public getCommand(): string {
    return `${Prefix}${this.commandName}${this.args ? ` ${this.args}` : ''}`
  }

  public async getArgs(msg: Message): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          msg.content
            .slice(Prefix.length + this.commandName.length)
            .trim()
            .split(' ')
        )
      } catch (error) {
        reject(error)
      }
    })
  }
}
