import { DiscordAPIError, Message, MessageEmbed, TextChannel } from 'discord.js'
import GuildExtension from '../interfaces/guild.extensions'
import { Send, SendError } from '../send'
import Command from '../interfaces/command'

export default class DeleteAd extends Command {
  constructor() {
    super('delad', 'moderation', 'Delete an advertisement', '<MessageID> <Reason>')
  }

  public async call(msg: Message): Promise<void> {
    super.call(msg)

    const args = await super.getArgs(msg)
    const msgCache = msg

    let msgToRemove: Message

    if (args.length < 2 || args[0] == '') {
      SendError('MISSING_ARGS', msg, this)
      return
    } else if (!msg.member?.hasPermission('MANAGE_MESSAGES')) {
      SendError('MISSING_PERMS', msg, this)
      return
    }

    try {
      msgToRemove = await msg.channel.messages.fetch(args[0])
    } catch (error) {
      if (error instanceof DiscordAPIError) {
        if (error.message.startsWith('Invalid Form Body'))
          SendError('CUSTOM', msg, this, `⚠️ Invalid message ID. \`${args[0]}\``)
        else if (error.message.startsWith('Unknown Message'))
          SendError('CUSTOM', msg, this, `⚠️ Message not found. \`${args[0]}\``)
        else {
          SendError('ERROR_OCCURED', msg, this)
        }
      } else {
        SendError('ERROR_OCCURED', msg, this)
      }
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
      msgToRemove.delete()
    } catch (error) {
      Send(error, msg)
    }

    const acknowledgeMsg = await Send(
      `✅ Message **\`${args[0]}\`** was successfully removed.`,
      msg
    )

    acknowledgeMsg.delete({ timeout: 3000 })
    msg.delete({ timeout: 3000, reason: `${args.slice(1).join(' ')}` })

    try {
      ;(logChannel as TextChannel).send(
        new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('⛔ Advertisement Deleted')
          .setDescription(
            `**Author:** <@${msgToRemove.author.id}>
            **Channel:** <#${msgToRemove.channel.id}>
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
          `⚠️ The message was removed, but I couldn't find the log channel.`
        )
        return
      } else {
        SendError('ERROR_OCCURED', msg, this)
        return
      }
    }
  }
}
