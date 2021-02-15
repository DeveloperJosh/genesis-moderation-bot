import { Message, MessageEmbed } from 'discord.js'
import Command from '../interfaces/command'
import { Commands, Prefix } from '../main'
import { Send } from '../send'

export default class Help extends Command {
  constructor() {
    super('help', 'utility', 'Shows the help menu', '')
  }

  public async call(msg: Message): Promise<void> {
    super.call(msg)

    let embedDescription = ''

    for (const c of Commands.files) {
      const command = c[1]
      const { commandName, description, category } = command
      const fname = Prefix + commandName
      embedDescription += `**${fname}:**\n${description}\nCategory: ${category}\n\`${command.getCommand()}\`\n\n`
    }

    const commandsEmbed = new MessageEmbed()
      .setColor('#F7CF48')
      .setTitle('ℹ️ Commands')
      .setDescription(embedDescription)
      .setTimestamp()
      .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡#1270')

    Send(commandsEmbed, msg)
  }
}
