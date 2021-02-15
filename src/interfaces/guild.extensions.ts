import { Guild, TextChannel } from 'discord.js'
import { Database } from '../database'

export default class GuildExtension {
  public base: Guild

  constructor(base: Guild) {
    this.base = base
  }

  public async getLogChannel(): Promise<TextChannel> {
    return new Promise(async (resolve, reject) => {
      const serverID = this.base.id

      let res: any

      try {
        res = await Database.self.query('SELECT * FROM servers WHERE id=?', [
          serverID,
        ])
      } catch (error) {
        reject(error)
      }

      if (!res[0]) {
        console.log('here')
        reject('Not found')
      } else {
        console.log(res)
        const logChannel = this.base.client.channels.cache.get(res[0].logchannel)
        resolve(<TextChannel>logChannel)
      }
    })
  }

  public async setLogChannel(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const serverID = this.base.id
      let res: any

      // See if there already is an entry for this guild
      try {
        console.log('0', this)
        res = await this.getLogChannel()
        console.log('1', res)
      } catch (error) {
        console.log('2', error)
        // If there isn't one, insert a new one
        if (error == 'Not found' || !res) {
          try {
            await Database.self.query(
              'INSERT INTO servers (id, logchannel) VALUES ?',
              [[[serverID, id]]]
            )

            resolve()
          } catch (error) {
            console.log(error)
            reject(error)
          }
        } else {
          console.log(error)
          reject(error)
        }
      }

      try {
        console.log('3')
        const resh = await Database.self.query(
          'UPDATE servers SET logchannel=? WHERE id=?',
          [id, serverID]
        )
        console.log('4', resh)

        resolve()
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}
