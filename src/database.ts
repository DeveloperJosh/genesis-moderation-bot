import * as mysql from 'mysql'

export class Database {
  public static self: Database

  private host: string
  private user: string
  private password: string
  private database: string

  public con: mysql.Connection

  constructor(host: string, user: string, password: string, database: string) {
    Database.self = this

    this.host = host
    this.user = user
    this.password = password
    this.database = database

    this.con = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    })
  }

  public query(query: string, values: Array<any>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.con.query(query, values, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }
}
