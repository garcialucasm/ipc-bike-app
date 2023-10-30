import {Client} from 'ts-postgres'

class DatabaseClient { 
  client: Client

  constructor(client: Client) {
    this.client = client
    this.init()
  }

  private init() {
    this.client.connect()
  }

  execute(query: string, params: any[]) : Promise<Iterable> {

    let resultIterator = this.client.query(query, params);
    
    for (let row in resultIterator) {
      row.
    }
    return this.client.query(query, params)
  }
}

/*export default mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});*/