import { Message, MessageEmbed } from 'discord.js'
import Command from '../interfaces/command'
import { Send, SendError } from '../send'

export default class Say extends Command {
  constructor() {
    super('say', 'utility', 'Use this to make the bot say stuff', '')
  }

  public async call(msg: Message): Promise<void> {
    super.call(msg)

    const args = await super.getArgs(msg)

    if (args.length < 1 || args[0] == '') {
      SendError('MISSING_ARGS', msg, this)
      return
    } else if (!msg.member?.hasPermission('MANAGE_MESSAGES')) {
      SendError('MISSING_PERMS', msg, this)
      return
    }

const say = args.join(" ");

    const commandsEmbed = new MessageEmbed()
      .setColor('#F7CF48')
      .setTitle(':information_source: Bot said')
      .addField('Words:', say)
      .setFooter('Made By ♡𝔹𝕝𝕦𝕖♡#1270')

    Send(commandsEmbed, msg)
  }
}