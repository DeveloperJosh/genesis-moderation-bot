import { Message, MessageEmbed, TextChannel } from 'discord.js'
import GuildExtension from '../interfaces/guild.extensions'
import { Send, SendError } from '../send'
import Command from '../interfaces/command'

export default class DeleteAd extends Command {
  constructor() {
    super('report', 'support', 'Report a bug or a user/ad with this', '<Reason>')
  }

  public async call(msg: Message): Promise<void> {
    super.call(msg)

    const args = await super.getArgs(msg)
    const msgCache = msg

    if (args.length < 1 || args[0] == '') {
      SendError('MISSING_ARGS', msg, this)
      return
    } 

    let logChannel: TextChannel
    try {
      logChannel = await new GuildExtension(msg.guild!).getLogChannel()
    } catch (error) {
      SendError(
        'CUSTOM',
        msg,
        this,
        `⚠️ A problem occured while trying to find the log channel.`
      )
      return
    }

    try {
    const makingreport = await Send('Making The Report', msg)
      makingreport.delete({ timeout: 3000 })
    } catch (error) {
      Send(error, msg)
    }

    const acknowledgeMsg = await Send(
      `✅ Report was successfully sent`,
      msg
    )

    acknowledgeMsg.delete({ timeout: 3000 })
    msg.delete({ timeout: 3000, reason: `${args.slice(1).join(' ')}` })
    const user = msg.mentions.users.first() || msgCache.author

    try {
      ;(logChannel as TextChannel).send(
        new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('⛔ User Report')
          .setDescription(
            `**Author:** <@${msgCache.author.id}>
            **Reported User:** ${user}
            **Reason:** ${args.slice(1).join(' ')}`
          )
          .setTimestamp()
          .setFooter(msgCache.author.username, <string>msgCache.author.avatarURL())
      )
    } catch (error) {
      if (error == "TypeError: Cannot read property 'send' of undefined") {
        SendError(
          'CUSTOM',
          msg,
          this,
          `⚠️ The report was made, but I couldn't find the log channel.`
        )
        return
      } else {
        SendError('ERROR_OCCURED', msg, this)
        return
      }
    }
  }
}
