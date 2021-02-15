import { Message } from 'discord.js'
import Command from './interfaces/command'

export type MSGError =
  | 'ERROR_OCCURED'
  | 'MISSING_ARGS'
  | 'TOO_MANY_ARGS'
  | 'MISSING_PERMS'
  | 'CUSTOM'

export default class MSGSend {
  public static send(content: any, msg: Message): Promise<Message> {
    return new Promise(async (resolve, _reject) => {
      resolve(await msg.channel.send(content))
    })
  }

  public static async sendError(
    error: MSGError,
    msg: Message,
    caller: Command,
    custom?: string
  ): Promise<Message> {
    return new Promise(async (resolve, _reject) => {
      if (!custom) custom = ''
      switch (error) {
        case 'ERROR_OCCURED':
          resolve(
            Send(`⚠️ An error occured. \`${(await caller.getArgs(msg))[0]}\``, msg)
          )
          break

        case 'MISSING_ARGS':
          resolve(Send(`⚠️ Missing arguments. \`${caller.getCommand()}\``, msg))
          break

        case 'TOO_MANY_ARGS':
          resolve(Send(`⚠️ Too many arguments. \`${caller.getCommand()}\``, msg))
          break

        case 'MISSING_PERMS':
          resolve(Send(`⚠️ You don't have permission to use this command.`, msg))
          break

        case 'CUSTOM':
          resolve(Send(custom, msg))
          break

        default:
          resolve(SendError('ERROR_OCCURED', msg, caller))
          break
      }
    })
  }
}

const Send = MSGSend.send
const SendError = MSGSend.sendError
export { Send, SendError }
