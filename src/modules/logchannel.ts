import { Channel, Message } from 'discord.js'
import { Client } from '../main'
import { Send, SendError } from '../send'
import Command from '../interfaces/command'
import GuildExtension from '../interfaces/guild.extensions'

export default class LogChannel extends Command {
  constructor() {
    super(
      'logchannel',
      'utility',
      'Change the moderation logging channel',
      '<ChannelID>'
    )
  }

  public async call(msg: Message): Promise<void> {
    super.call(msg)
    const args = await super.getArgs(msg)
    if (args.length > 1) {
      SendError('TOO_MANY_ARGS', msg, this)
      return
    } else if (!msg.member!.hasPermission('ADMINISTRATOR')) {
      SendError('MISSING_PERMS', msg, this)
      return
    }

    let logChannel: Channel | undefined

    // If no args, return the logchannel
    if (args.length < 1 || args[0] == '') {
      try {
        const guild = new GuildExtension(msg.guild!)
        const logChannel = await guild.getLogChannel()
        Send(`The moderation log channel is <#${logChannel.id}>`, msg)
      } catch (error) {
        if (error == 'Not found') {
          Send(
            `No moderation log channel has been set, you can do this by using \`${this.getCommand()}\``,
            msg
          )
        } else {
          console.log(error)
          SendError('CUSTOM', msg, this, error)
        }
      }
      return
    }

    // Set the logchannel
    try {
      logChannel = await Client.channels.cache.get(args[0])
    } catch (error) {
      console.log(error)
      SendError('CUSTOM', msg, this, error)
      return
    }

    if (logChannel) {
      try {
        const guild = new GuildExtension(msg.guild!)
        await guild.setLogChannel(logChannel.id)
      } catch (error) {
        console.log(error)
        SendError('CUSTOM', msg, this, error)
        return
      }

      Send(`Moderation channel log was succesfully set to <#${logChannel.id}>`, msg)
    } else {
      SendError('CUSTOM', msg, this, `⚠️ Channel not found.`)
      return
    }
  }
}
