import { Message, MessageEmbed } from 'discord.js'
import Command from '../interfaces/command'
import { Send } from '../send'

export default class Botinfo extends Command {
  constructor() {
    super('botinfo', 'utility', 'This the botinfo command it will give you info about the bot', '')
  }

  public async call(msg: Message): Promise<void> {
    super.call(msg)

    const commandsEmbed = new MessageEmbed()
      .setColor('#F7CF48')
      .setTitle(':information_source: Botinfo')
      .addField('Maker:', '♡𝔹𝕝𝕦𝕖♡#1270')
      .addField('Info', 'This is a Mod Bot That is made to help out the mods with the as')
      .setTimestamp()
      .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡#1270')

    Send(commandsEmbed, msg)
  }
}